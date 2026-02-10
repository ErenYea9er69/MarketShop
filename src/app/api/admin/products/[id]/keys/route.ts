
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET: List keys for a product
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        // @ts-ignore
        const keys = await prisma.productKey.findMany({
            where: { productId: id },
            orderBy: { createdAt: "desc" }
        })

        return NextResponse.json(keys)
    } catch (error) {
        console.error("Failed to fetch product keys:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// POST: Add new keys (bulk support)
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const { keys } = await req.json()

        if (!Array.isArray(keys) || keys.length === 0) {
            return NextResponse.json({ error: "Invalid keys data" }, { status: 400 })
        }

        // Create keys in bulk
        // @ts-ignore
        await prisma.productKey.createMany({
            data: keys.map((key: string) => ({
                productId: id,
                value: key,
                isUsed: false
            }))
        })

        // Update product stock count
        // @ts-ignore
        const totalKeys = await prisma.productKey.count({
            where: {
                productId: id,
                isUsed: false
            }
        })

        await prisma.product.update({
            where: { id },
            data: { stock: totalKeys }
        })

        return NextResponse.json({ success: true, count: keys.length })
    } catch (error) {
        console.error("Failed to add product keys:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

// DELETE: Remove a key
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const keyId = searchParams.get("keyId")

        if (!keyId) {
            return NextResponse.json({ error: "Key ID is required" }, { status: 400 })
        }

        const { id } = await params

        // Delete the key
        // @ts-ignore
        await prisma.productKey.delete({
            where: { id: keyId }
        })

        // Update product stock count
        // @ts-ignore
        const totalKeys = await prisma.productKey.count({
            where: {
                productId: id,
                isUsed: false
            }
        })

        await prisma.product.update({
            where: { id },
            data: { stock: totalKeys }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Failed to delete product key:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
