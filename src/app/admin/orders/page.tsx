import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, ShoppingBag, CheckCircle2, Clock, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default async function OrdersPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            },
            _count: {
                select: { items: true }
            }
        }
    })

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Orders</span>
                        </h1>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                All Orders ({orders.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {orders.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-12 h-12 mx-auto text-[#71717a] mb-4" />
                                    <p className="text-[#71717a]">No orders yet</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[#262626]">
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Order ID</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Customer</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Items</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Total</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Status</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.id} className="border-b border-[#262626] hover:bg-[#151515] transition-colors">
                                                    <td className="py-4 px-4">
                                                        <span className="font-mono text-xs text-[#a1a1aa]">#{order.id.slice(-6)}</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div>
                                                            <p className="font-medium text-[#fafafa]">{order.user.name || "Guest"}</p>
                                                            <p className="text-xs text-[#a1a1aa]">{order.user.email}</p>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-[#e4e4e7]">{order._count.items} items</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="font-bold text-[#fafafa]">{order.total.toFixed(2)} TND</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${order.status === "COMPLETED"
                                                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                                : order.status === "PENDING"
                                                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                            }`}>
                                                            {order.status === "COMPLETED" ? <CheckCircle2 className="w-3 h-3" /> :
                                                                order.status === "PENDING" ? <Clock className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                            {order.status}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-[#a1a1aa]">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
