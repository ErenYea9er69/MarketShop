import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, method } = await req.json()

    if (!amount || amount < 5) {
      return NextResponse.json(
        { error: "Minimum top-up amount is 5 TND" },
        { status: 400 }
      )
    }

    if (!method) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      )
    }

    // Create pending transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        type: "DEPOSIT",
        amount,
        method,
        status: "PENDING",
        reference: `TOPUP-${Date.now()}`,
      },
    })

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        method: transaction.method,
        status: transaction.status,
      },
    })
  } catch (error) {
    console.error("Top-up error:", error)
    return NextResponse.json(
      { error: "Failed to create top-up request" },
      { status: 500 }
    )
  }
}
