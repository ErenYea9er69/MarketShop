import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle2, XCircle, CreditCard, User, Package, Calendar } from "lucide-react"

interface OrderDetailsPageProps {
    params: Promise<{ id: string }>
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    const { id } = await params

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: true
                }
            }
        }
    })

    if (!order) {
        notFound()
    }

    const statusColors = {
        PENDING: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
        PROCESSING: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        COMPLETED: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        CANCELLED: "text-red-500 bg-red-500/10 border-red-500/20",
    }

    return (
        <div className="space-y-8 animate-slide-up">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/orders"
                    className="p-2 rounded-xl hover:bg-white/5 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-[#fafafa]">Order Details</h1>
                    <p className="text-[#a1a1aa]">View transaction and item details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 overflow-hidden relative">
                        {/* Glossy Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

                        <h2 className="text-xl font-bold text-[#fafafa] mb-6 flex items-center gap-2">
                            <Package className="w-5 h-5 text-[#EAB308]" />
                            Items
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0a0a] border border-[#262626]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[#262626] flex items-center justify-center text-xl">
                                            {item.product.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#fafafa]">{item.product.name}</p>
                                            <p className="text-sm text-[#a1a1aa]">{item.product.category.replace("_", " ")}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-[#fafafa]">{item.price.toFixed(2)} TND</p>
                                        <p className="text-sm text-[#a1a1aa]">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#262626] flex justify-between items-center relative z-10">
                            <span className="text-[#a1a1aa]">Total Amount</span>
                            <span className="text-2xl font-bold text-[#EAB308]">{order.total.toFixed(2)} TND</span>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Customer & Info */}
                <div className="space-y-6">
                    {/* Order Info */}
                    <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

                        <h2 className="text-xl font-bold text-[#fafafa] mb-6 flex items-center gap-2 relative z-10">
                            <Clock className="w-5 h-5 text-[#EAB308]" />
                            Order Info
                        </h2>

                        <div className="space-y-4 relative z-10">
                            <div>
                                <label className="text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">Order ID</label>
                                <p className="text-[#fafafa] font-mono text-sm mt-1">{order.id}</p>
                            </div>
                            <div>
                                <label className="text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">Date</label>
                                <div className="flex items-center gap-2 mt-1 nav-text">
                                    <Calendar className="w-4 h-4 text-[#a1a1aa]" />
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">Status</label>
                                <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status as keyof typeof statusColors]}`}>
                                    {order.status === "COMPLETED" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                    {order.status}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-[#151515] border border-[#262626] rounded-3xl p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />

                        <h2 className="text-xl font-bold text-[#fafafa] mb-6 flex items-center gap-2 relative z-10">
                            <User className="w-5 h-5 text-[#EAB308]" />
                            Customer
                        </h2>

                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] font-bold">
                                    {order.user.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                    <p className="font-medium text-[#fafafa]">{order.user.name || "Unknown"}</p>
                                    <p className="text-sm text-[#a1a1aa]">{order.user.email}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-[#262626]">
                                <label className="text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">Customer ID</label>
                                <p className="text-[#fafafa] font-mono text-xs mt-1 truncate" title={order.userId}>{order.userId}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
