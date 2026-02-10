"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updatePaymentMethod(id: string, data: {
    displayName: string
    details: string | null
    displayAr: string | null
    displayFr: string | null
    active: boolean
}) {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    try {
        await prisma.paymentMethod.update({
            where: { id },
            data: {
                ...data,
                details: data.details || null,
                displayAr: data.displayAr || null,
                displayFr: data.displayFr || null,
            },
        })

        revalidatePath("/admin/settings")
        return { success: true }
    } catch (error) {
        console.error("Failed to update payment method:", error)
        return { success: false, error: "Failed to update payment method" }
    }
}
