import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, Gift, Plus, History } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default async function WalletPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { balance: true, cashback: true },
    })

    const transactions = await prisma.transaction.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 10,
    })

    const getStatusColor = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
            case "PENDING":
                return "bg-[rgba(234,179,8,0.15)] text-[#eab308]"
            case "REJECTED":
                return "bg-[rgba(239,68,68,0.15)] text-[#ef4444]"
            default:
                return "bg-[#151515] text-[#71717a]"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "DEPOSIT":
                return <ArrowDownRight className="w-4 h-4 text-[#22c55e]" />
            case "PURCHASE":
                return <ArrowUpRight className="w-4 h-4 text-[#ef4444]" />
            case "CASHBACK":
                return <Gift className="w-4 h-4 text-[#a855f7]" />
            default:
                return <Clock className="w-4 h-4 text-[#71717a]" />
        }
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">
                        <span className="gradient-text">My Wallet</span>
                    </h1>

                    {/* Balance Cards */}
                    <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <Card className="bg-gradient-to-br from-[#22c55e]/10 to-[#06b6d4]/10 border-[#22c55e]/30">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
                                        <Wallet className="w-6 h-6 text-[#22c55e]" />
                                    </div>
                                    <span className="text-[#a1a1aa]">Balance</span>
                                </div>
                                <p className="text-4xl font-bold text-[#fafafa]">
                                    {user?.balance?.toFixed(2) || "0.00"} <span className="text-lg">TND</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#a855f7]/20 flex items-center justify-center">
                                        <Gift className="w-6 h-6 text-[#a855f7]" />
                                    </div>
                                    <span className="text-[#a1a1aa]">Cashback</span>
                                </div>
                                <p className="text-4xl font-bold text-[#fafafa]">
                                    {user?.cashback?.toFixed(2) || "0.00"} <span className="text-lg">TND</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <Link href="/dashboard/wallet/topup">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Top Up Balance
                            </Button>
                        </Link>
                        <Link href="/redeem">
                            <Button variant="secondary">
                                <Gift className="w-4 h-4" />
                                Redeem Gift Card
                            </Button>
                        </Link>
                    </div>

                    {/* Transaction History */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <History className="w-5 h-5" />
                                Transaction History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {transactions.length === 0 ? (
                                <div className="text-center py-8 text-[#71717a]">
                                    No transactions yet
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {transactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-[#151515] border border-[#262626]"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                                                    {getTypeIcon(tx.type)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#fafafa]">
                                                        {tx.type === "DEPOSIT" && "Balance Top Up"}
                                                        {tx.type === "PURCHASE" && "Purchase"}
                                                        {tx.type === "CASHBACK" && "Cashback Reward"}
                                                        {tx.type === "GIFT_CARD" && "Gift Card Redeemed"}
                                                    </p>
                                                    <p className="text-sm text-[#71717a]">
                                                        {tx.method && `via ${tx.method} • `}
                                                        {new Date(tx.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${tx.type === "PURCHASE" ? "text-[#ef4444]" : "text-[#22c55e]"}`}>
                                                    {tx.type === "PURCHASE" ? "-" : "+"}
                                                    {tx.amount.toFixed(2)} TND
                                                </p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tx.status)}`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
