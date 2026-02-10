import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PaymentMethodList } from "@/components/admin/PaymentMethodList"

export default async function AdminSettingsPage() {
    const session = await auth()

    if (session?.user?.role !== "ADMIN") {
        redirect("/")
    }

    const paymentMethods = await prisma.paymentMethod.findMany({
        orderBy: { name: "asc" },
    })

    return (
        <div className="space-y-8 animate-slide-up">
            <div>
                <h1 className="text-3xl font-bold text-[#fafafa]">Settings</h1>
                <p className="text-[#a1a1aa]">Manage system configuration and payment methods</p>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-[#fafafa] mb-4">Payment Methods</h2>
                    <PaymentMethodList methods={paymentMethods} />
                </div>
            </div>
        </div>
    )
}
