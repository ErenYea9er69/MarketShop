import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { transactionId, userId, amount, action } = await req.json()

    if (!transactionId || !userId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (action === "approve") {
      // Update transaction status and add balance to user
      await prisma.$transaction([
        prisma.transaction.update({
          where: { id: transactionId },
          data: { status: "COMPLETED" },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { balance: { increment: amount } },
        }),
      ])
    } else if (action === "reject") {
      // Just update transaction status
      await prisma.transaction.update({
        where: { id: transactionId },
        data: { status: "REJECTED" },
      })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Transaction update error:", error)
    return NextResponse.json(
      { error: "Failed to update transaction" },
      { status: 500 }
    )
  }
}
