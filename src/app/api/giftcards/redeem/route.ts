import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Please login to redeem gift cards" }, { status: 401 })
    }

    const { code } = await req.json()

    if (!code) {
      return NextResponse.json({ error: "Gift card code is required" }, { status: 400 })
    }

    // Find the gift card
    const giftCard = await prisma.giftCard.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!giftCard) {
      return NextResponse.json({ error: "Invalid gift card code" }, { status: 404 })
    }

    if (giftCard.used) {
      return NextResponse.json({ error: "This gift card has already been redeemed" }, { status: 400 })
    }

    // Redeem the gift card (update card and user balance in transaction)
    await prisma.$transaction([
      prisma.giftCard.update({
        where: { id: giftCard.id },
        data: {
          used: true,
          usedBy: session.user.id,
          usedAt: new Date(),
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          balance: { increment: giftCard.amount },
        },
      }),
      prisma.transaction.create({
        data: {
          userId: session.user.id,
          type: "GIFT_CARD",
          amount: giftCard.amount,
          status: "COMPLETED",
          reference: `GIFTCARD-${giftCard.code}`,
        },
      }),
    ])

    return NextResponse.json({
      success: true,
      amount: giftCard.amount,
    })
  } catch (error) {
    console.error("Gift card redemption error:", error)
    return NextResponse.json(
      { error: "Failed to redeem gift card" },
      { status: 500 }
    )
  }
}
