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

        const { items, total } = await req.json()

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            )
        }

        // 1. Get fresh user data (balance)
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // 2. Validate Balance
        if (user.balance < total) {
            return NextResponse.json(
                { error: "Insufficient balance" },
                { status: 400 }
            )
        }

        // 3. Process Transaction (Atomic)
        // We use a transaction to ensure all db operations succeed or fail together
        const result = await prisma.$transaction(async (tx) => {
            // Deduct balance
            const updatedUser = await tx.user.update({
                where: { id: user.id },
                data: {
                    balance: { decrement: total }
                }
            })

            // Create Order
            const order = await tx.order.create({
                data: {
                    userId: user.id,
                    total: total,
                    status: "COMPLETED", // Instant digital delivery
                    items: {
                        create: items.map((item: any) => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                }
            })

            // Create Transaction Record (Purchase)
            await tx.transaction.create({
                data: {
                    userId: user.id,
                    type: "PURCHASE",
                    amount: total,
                    status: "COMPLETED",
                    reference: `ORDER-${order.id}`
                }
            })
            
            // Add Cashback (Optional - based on schema)
            // If you have a cashback logic, add it here. 
            // For now, we'll keep it simple or strictly follow schema defaults.

            return { order, newBalance: updatedUser.balance }
        })

        return NextResponse.json({
            success: true,
            orderId: result.order.id,
            newBalance: result.newBalance
        })

    } catch (error) {
        console.error("Checkout error:", error)
        return NextResponse.json(
            { error: "Failed to process order" },
            { status: 500 }
        )
    }
}
