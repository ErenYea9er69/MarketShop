
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const { items } = await req.json()

        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            )
        }

        // 1. Fetch fresh product data (prices & stock)
        const productIds = items.map((item: any) => item.id)
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, price: true, stock: true, category: true, name: true }
        })

        // 2. Validate Stock and Calculate Total (Server-Side)
        let calculatedTotal = 0
        interface OrderItemData {
            productId: string
            quantity: number
            price: number
            productName: string
        }
        const orderItemsData: OrderItemData[] = []

        for (const item of items) {
            const product = products.find(p => p.id === item.id)
            
            if (!product) {
                return NextResponse.json(
                    { error: `Product not found: ${item.id}` },
                    { status: 400 }
                )
            }

            if (product.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${product.name}. Only ${product.stock} left.` },
                    { status: 400 }
                )
            }

            calculatedTotal += product.price * item.quantity
            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
                productName: product.name // For error messages
            })
        }

        // 3. Get User Balance
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        if (user.balance < calculatedTotal) {
            return NextResponse.json(
                { error: `Insufficient balance. Total: ${calculatedTotal.toFixed(2)} TND, Balance: ${user.balance.toFixed(2)} TND` },
                { status: 400 }
            )
        }

        // 4. Process Transaction (Atomic)
        const result = await prisma.$transaction(async (tx) => {
            // Deduct balance
            const updatedUser = await tx.user.update({
                where: { id: user.id },
                data: {
                    balance: { decrement: calculatedTotal }
                }
            })

            // Prepare Order Items and Assign Keys
            const finalOrderItems = []

            for (const item of orderItemsData) {
                // Fetch available keys for this product
                // @ts-ignore - ProductKey relation might be missing in editor types
                const availableKeys = await tx.productKey.findMany({
                    where: {
                        productId: item.productId,
                        isUsed: false
                    },
                    take: item.quantity
                })

                if (availableKeys.length < item.quantity) {
                    throw new Error(`Stock mismatch for ${item.productName}. Please try again.`)
                }

                // Mark keys as used
                const keyIds = availableKeys.map((k: any) => k.id)
                // @ts-ignore
                await tx.productKey.updateMany({
                    where: { id: { in: keyIds } },
                    data: { isUsed: true }
                })

                // Format delivery data (keys joined by newlines)
                const deliveryData = availableKeys.map((k: any) => k.value).join("\n")

                finalOrderItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    deliveryData: deliveryData
                })

                // Update Product Stock Count
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                })
            }

            // Create Order
            const order = await tx.order.create({
                data: {
                    userId: user.id,
                    total: calculatedTotal,
                    status: "COMPLETED",
                    items: {
                        create: finalOrderItems
                    }
                }
            })

            // Link used keys to order (Optional but good for tracking)
            // This requires a second pass or complicated query, usually okay to skip for MVP 
            // OR we can do it if `ProductKey` has `orderId`.
            // Let's do it properly if we can.
            // Since we know the keys we used, let's update them with orderId.
            // However, keys are per product.
            // We can iterate again or just leave it. 
            // The `deliveryData` snapshot in `OrderItem` is the most important for the user.
            // Updating `orderId` on keys is good for admin tracking.
            // Let's rely on `deliveryData` for now to keep transaction simple/fast.

             // Create Transaction Record (Purchase)
             await tx.transaction.create({
                data: {
                    userId: user.id,
                    type: "PURCHASE",
                    amount: calculatedTotal,
                    status: "COMPLETED",
                    reference: `ORDER-${order.id}`
                }
            })

            return { order, newBalance: updatedUser.balance }
        })

        return NextResponse.json({
            success: true,
            orderId: result.order.id,
            newBalance: result.newBalance
        })

    } catch (error: any) {
        console.error("Checkout error:", error)
        return NextResponse.json(
            { error: error.message || "Failed to process order" },
            { status: 500 }
        )
    }
}
