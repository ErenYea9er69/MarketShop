import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { User, Wallet, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default async function DashboardPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            name: true,
            email: true,
            balance: true,
            createdAt: true,
            _count: {
                select: { orders: true }
            }
        }
    })

    const recentOrders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        take: 3,
        include: {
            items: {
                include: { product: true }
            }
        }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">Welcome back, </span>
                <span className="text-primary">{user?.name}</span>
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Key Stats */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium text-muted-foreground">Profile</CardTitle>
                        <User className="w-5 h-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground mb-1">{user?.name}</div>
                        <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
                        <p className="text-xs text-muted-foreground/60 bg-accent/50 px-2 py-1 rounded-full inline-block">
                            Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>

                {/* Wallet Summary */}
                <Card className="bg-gradient-to-br from-card/80 to-primary/5 border-primary/20 backdrop-blur-sm shadow-[0_4px_20px_-4px_rgba(234,179,8,0.1)] hover:shadow-[0_8px_30px_-6px_rgba(234,179,8,0.2)] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium text-muted-foreground">Wallet Balance</CardTitle>
                        <Wallet className="w-5 h-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold text-foreground mb-4 font-mono tracking-tight">
                            {user?.balance?.toFixed(2) || "0.00"} <span className="text-lg text-primary">TND</span>
                        </div>
                        <Link href="/contact">
                            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                                Top Up Balance
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders Preview */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
                    <Link href="/dashboard/orders" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium transition-colors">
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentOrders.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground bg-card/30 border border-dashed border-border rounded-3xl animate-fade-in">
                        No orders yet. Start shopping!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="p-5 rounded-2xl bg-card/50 border border-border/50 flex items-center justify-between hover:border-primary/30 hover:bg-card/80 hover:shadow-lg transition-all duration-300 group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-accent/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        <ShoppingBag className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-foreground font-semibold">Order #{order.id.slice(-6).toUpperCase()}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-foreground font-bold text-lg">{order.total.toFixed(2)} TND</p>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${order.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500" :
                                        order.status === "PENDING" ? "bg-amber-500/10 text-amber-500" :
                                            "bg-red-500/10 text-red-500"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
