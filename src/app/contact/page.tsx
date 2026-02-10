import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { TopUpClient } from "@/components/wallet/TopUpClient"
import { redirect } from "next/navigation"

export default async function TopUpPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const paymentMethods = await prisma.paymentMethod.findMany({
        where: { active: true },
        orderBy: { name: "asc" },
    })

    return <TopUpClient methods={paymentMethods} />
}
