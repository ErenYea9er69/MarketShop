import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingBag,
    CreditCard,
    TrendingUp,
    Clock,
    CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default async function AdminDashboard() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    // Fetch stats
    const [userCount, productCount, orderCount, pendingTransactions, recentOrders] =
        await Promise.all([
            prisma.user.count(),
            prisma.product.count(),
            prisma.order.count(),
            prisma.transaction.count({ where: { status: "PENDING", type: "DEPOSIT" } }),
            prisma.order.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                include: { user: { select: { name: true, email: true } } },
            }),
        ])

    const stats = [
        { label: "Total Users", value: userCount, icon: Users, color: "#22c55e" },
        { label: "Products", value: productCount, icon: Package, color: "#06b6d4" },
        { label: "Orders", value: orderCount, icon: ShoppingBag, color: "#a855f7" },
        { label: "Pending Top-ups", value: pendingTransactions, icon: Clock, color: "#eab308" },
    ]

    const navItems = [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
        { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
    ]

    return (
        <div className="py-12">
            <div className="container">
                <div className="flex gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <nav className="sticky top-24 space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#151515] transition-colors"
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <h1 className="text-3xl font-bold mb-8">
                            <span className="gradient-text">Admin Dashboard</span>
                        </h1>

                        {/* Stats Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat) => (
                                <Card key={stat.label}>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                                style={{ backgroundColor: `${stat.color}20` }}
                                            >
                                                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                                            </div>
                                            <TrendingUp className="w-4 h-4 text-[#22c55e]" />
                                        </div>
                                        <p className="text-3xl font-bold text-[#fafafa]">{stat.value}</p>
                                        <p className="text-[#71717a] text-sm">{stat.label}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[#eab308]" />
                                        Pending Transaction Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[#a1a1aa] mb-4">
                                        You have <strong className="text-[#eab308]">{pendingTransactions}</strong> pending top-up requests
                                        awaiting approval.
                                    </p>
                                    <Link
                                        href="/admin/transactions"
                                        className="text-[#22c55e] hover:underline text-sm font-medium"
                                    >
                                        Review Transactions →
                                    </Link>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-[#06b6d4]" />
                                        Product Management
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[#a1a1aa] mb-4">
                                        Add new products, manage inventory, and update pricing.
                                    </p>
                                    <Link
                                        href="/admin/products"
                                        className="text-[#22c55e] hover:underline text-sm font-medium"
                                    >
                                        Manage Products →
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Orders */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Orders</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentOrders.length === 0 ? (
                                    <p className="text-[#71717a] text-center py-8">No orders yet</p>
                                ) : (
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-4 rounded-xl bg-[#151515] border border-[#262626]"
                                            >
                                                <div>
                                                    <p className="font-medium text-[#fafafa]">
                                                        {order.user.name || order.user.email}
                                                    </p>
                                                    <p className="text-sm text-[#71717a]">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-[#22c55e]">{order.total.toFixed(2)} TND</p>
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full ${order.status === "COMPLETED"
                                                            ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                                                            : "bg-[rgba(234,179,8,0.15)] text-[#eab308]"
                                                            }`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </div>
    )
}
