import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
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
        <div className="py-8">
            <div className="container">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">My Wallet</span>
                    </h1>

                    {/* Balance Cards */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Card className="bg-gradient-to-br from-[#22c55e]/10 to-[#06b6d4]/10 border-[#22c55e]/20 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(34,197,94,0.2)] hover:shadow-[0_8px_30px_-6px_rgba(34,197,94,0.3)] transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="p-8 relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Wallet className="w-6 h-6 text-[#22c55e]" />
                                    </div>
                                    <span className="text-muted-foreground font-medium">Available Balance</span>
                                </div>
                                <p className="text-5xl font-bold text-foreground tracking-tight">
                                    {user?.balance?.toFixed(2) || "0.00"} <span className="text-xl text-[#22c55e] font-medium">TND</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-[#a855f7]/10 to-[#ec4899]/10 border-[#a855f7]/20 backdrop-blur-sm shadow-[0_8px_30px_-12px_rgba(168,85,247,0.2)] hover:shadow-[0_8px_30px_-6px_rgba(168,85,247,0.3)] transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="p-8 relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-[#a855f7]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Gift className="w-6 h-6 text-[#a855f7]" />
                                    </div>
                                    <span className="text-muted-foreground font-medium">Cashback Earned</span>
                                </div>
                                <p className="text-5xl font-bold text-foreground tracking-tight">
                                    {user?.cashback?.toFixed(2) || "0.00"} <span className="text-xl text-[#a855f7] font-medium">TND</span>
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                        <Link href="/contact">
                            <Button className="h-12 px-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 duration-200">
                                <Plus className="w-5 h-5 mr-2" />
                                Top Up Balance
                            </Button>
                        </Link>
                        <Link href="/redeem">
                            <Button variant="secondary" className="h-12 px-8 rounded-xl bg-card hover:bg-accent border border-border/50 transition-all hover:scale-105 active:scale-95 duration-200">
                                <Gift className="w-5 h-5 mr-2 text-primary" />
                                Redeem Gift Card
                            </Button>
                        </Link>
                    </div>

                    {/* Transaction History */}
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-xl">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-6">
                            <CardTitle className="flex items-center gap-2 text-xl font-bold text-foreground">
                                <History className="w-5 h-5 text-primary" />
                                Transaction History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {transactions.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground bg-accent/20 rounded-2xl border border-dashed border-border/60">
                                    <History className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                                    <p>No transactions yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {transactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 hover:border-primary/20 hover:bg-accent/30 transition-all duration-300 group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${tx.type === "DEPOSIT" ? "bg-emerald-500/10 text-emerald-500" :
                                                    tx.type === "PURCHASE" ? "bg-red-500/10 text-red-500" :
                                                        tx.type === "CASHBACK" ? "bg-purple-500/10 text-purple-500" :
                                                            "bg-blue-500/10 text-blue-500"
                                                    }`}>
                                                    {getTypeIcon(tx.type)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground text-lg">
                                                        {tx.type === "DEPOSIT" && "Balance Top Up"}
                                                        {tx.type === "PURCHASE" && "Purchase"}
                                                        {tx.type === "CASHBACK" && "Cashback Reward"}
                                                        {tx.type === "GIFT_CARD" && "Gift Card Redeemed"}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {tx.method && <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent/50 mr-2">{tx.method}</span>}
                                                        {new Date(tx.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xl font-bold ${tx.type === "PURCHASE" ? "text-red-500" : "text-emerald-500"}`}>
                                                    {tx.type === "PURCHASE" ? "-" : "+"}
                                                    {tx.amount.toFixed(2)} TND
                                                </p>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full inline-block mt-1 ${getStatusColor(tx.status)}`}>
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
