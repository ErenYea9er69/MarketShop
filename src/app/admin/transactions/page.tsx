import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Check, X, Clock, ArrowLeft, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { TransactionActions } from "./TransactionActions"

export default async function TransactionsPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const transactions = await prisma.transaction.findMany({
        where: { type: "DEPOSIT" },
        orderBy: [{ status: "asc" }, { createdAt: "desc" }],
        include: { user: { select: { id: true, name: true, email: true, balance: true } } },
    })

    const pendingCount = transactions.filter((t) => t.status === "PENDING").length

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Transactions</span>
                        </h1>
                        {pendingCount > 0 && (
                            <span className="px-3 py-1 rounded-full bg-[#eab308]/20 text-[#eab308] text-sm font-medium">
                                {pendingCount} pending
                            </span>
                        )}
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top-up Requests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {transactions.length === 0 ? (
                                <p className="text-[#71717a] text-center py-8">No transactions yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {transactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className={`p-4 rounded-xl border ${tx.status === "PENDING"
                                                    ? "bg-[#eab308]/5 border-[#eab308]/30"
                                                    : "bg-[#151515] border-[#262626]"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center">
                                                        <User className="w-5 h-5 text-[#71717a]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-[#fafafa]">
                                                            {tx.user.name || tx.user.email}
                                                        </p>
                                                        <p className="text-sm text-[#71717a]">
                                                            {tx.method} • {new Date(tx.createdAt).toLocaleString()}
                                                        </p>
                                                        <p className="text-xs text-[#71717a] mt-1">
                                                            Current balance: {tx.user.balance.toFixed(2)} TND
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-[#22c55e]">
                                                        +{tx.amount.toFixed(2)} TND
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {tx.status === "PENDING" ? (
                                                            <TransactionActions transactionId={tx.id} userId={tx.userId} amount={tx.amount} />
                                                        ) : (
                                                            <span
                                                                className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${tx.status === "COMPLETED"
                                                                        ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                                                                        : "bg-[rgba(239,68,68,0.15)] text-[#ef4444]"
                                                                    }`}
                                                            >
                                                                {tx.status === "COMPLETED" ? (
                                                                    <Check className="w-3 h-3" />
                                                                ) : (
                                                                    <X className="w-3 h-3" />
                                                                )}
                                                                {tx.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
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
