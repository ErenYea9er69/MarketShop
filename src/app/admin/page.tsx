import { Users, DollarSign, ShoppingBag, Package, CreditCard } from "lucide-react"
import { prisma } from "@/lib/prisma"

async function getStats() {
    const [userCount, orderCount, productCount, totalRevenue] = await Promise.all([
        prisma.user.count(),
        prisma.order.count(),
        prisma.product.count(),
        prisma.transaction.aggregate({
            _sum: {
                amount: true
            },
            where: {
                type: "DEPOSIT",
                status: "COMPLETED"
            }
        })
    ])

    return {
        userCount,
        orderCount,
        productCount,
        totalRevenue: totalRevenue._sum.amount || 0
    }
}

export default async function AdminDashboard() {
    const stats = await getStats()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fafafa] to-[#a1a1aa]">
                    Dashboard Overview
                </h1>
                <div className="text-sm text-[#a1a1aa]">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue"
                    value={`${stats.totalRevenue.toFixed(2)} TND`}
                    icon={<DollarSign className="w-6 h-6 text-[#EAB308]" />}
                    trend="+12.5% from last month"
                />
                <StatsCard
                    title="Total Users"
                    value={stats.userCount.toString()}
                    icon={<Users className="w-6 h-6 text-[#3b82f6]" />}
                    trend="+4 new today"
                />
                <StatsCard
                    title="Total Orders"
                    value={stats.orderCount.toString()}
                    icon={<ShoppingBag className="w-6 h-6 text-[#22c55e]" />}
                    trend="+2.1% from last month"
                />
                <StatsCard
                    title="Active Products"
                    value={stats.productCount.toString()}
                    icon={<Package className="w-6 h-6 text-[#a855f7]" />}
                    trend="In stock"
                />
            </div>

            {/* Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
                    <div className="flex items-center justify-center h-64 text-[#a1a1aa] border border-dashed border-[#262626] rounded-xl">
                        No recent transactions
                    </div>
                </div>
                <div className="bg-[#151515] border border-[#262626] rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                    <div className="flex items-center justify-center h-64 text-[#a1a1aa] border border-dashed border-[#262626] rounded-xl">
                        No recent orders
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatsCard({ title, value, icon, trend }: { title: string; value: string; icon: React.ReactNode; trend: string }) {
    return (
        <div className="bg-[#151515] border border-[#262626] p-6 rounded-2xl hover:border-[#3a3a3a] transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <span className="text-[#a1a1aa] font-medium">{title}</span>
                <div className="p-2 bg-[#262626] rounded-lg group-hover:bg-[#3a3a3a] transition-colors">
                    {icon}
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-3xl font-bold text-[#fafafa]">{value}</h3>
                <p className="text-xs text-[#a1a1aa]">{trend}</p>
            </div>
        </div>
    )
}
