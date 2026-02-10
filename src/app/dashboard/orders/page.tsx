import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ShoppingBag, ArrowRight } from "lucide-react"

export default async function OrdersPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/login")
    }

    const orders = await prisma.order.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            items: {
                include: { product: true }
            }
        }
    })

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-foreground">My Orders</h1>

            {orders.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground bg-card/30 border border-dashed border-border rounded-3xl animate-fade-in">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-lg font-medium text-foreground mb-2">No orders yet</p>
                    <p className="mb-6 max-w-sm mx-auto">You haven't made any purchases yet. Explore our collection to find something you love.</p>
                    <Link href="/shop" className="inline-flex items-center justify-center rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2 shadow-lg shadow-primary/20">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-lg transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-bold text-foreground text-lg">Order #{order.id.slice(-6).toUpperCase()}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider uppercase ${order.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                                            order.status === "PENDING" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                                                "bg-red-500/10 text-red-500 border border-red-500/20"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-foreground">{order.total.toFixed(2)} <span className="text-sm text-primary font-mono">TND</span></p>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-border/50 group-hover:border-primary/10 transition-colors">
                                {order.items.map((item) => (
                                    <div key={item.id}>
                                        <div className="flex items-center justify-between group/item">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center text-xs font-bold text-muted-foreground group-hover/item:text-primary transition-colors">
                                                    {item.quantity}x
                                                </div>
                                                <span className="text-foreground/80 group-hover/item:text-foreground transition-colors">{item.product.name}</span>
                                            </div>
                                            <span className="text-muted-foreground font-medium font-mono">{(item.price * item.quantity).toFixed(2)} TND</span>
                                        </div>
                                        {item.deliveryData && (
                                            <div className="mt-2 text-sm">
                                                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Digital Content ({item.product.category.replace("_", " ")})</p>
                                                <div className="bg-[#1a1a1a] p-3 rounded-lg border border-[#333] font-mono text-[#EAB308] whitespace-pre-wrap select-all">
                                                    {item.deliveryData}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground mt-1">
                                                    * This content is unique to you. Please save it securely.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
