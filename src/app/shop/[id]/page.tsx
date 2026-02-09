import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, ShoppingCart, Sparkles, Shield, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { dummyProducts } from "@/lib/dummy-data"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const product = dummyProducts.find((p) => p.id === id)

    if (!product) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-24 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Product Image / Placeholder */}
                    <div className="relative aspect-square rounded-[2.5rem] bg-card border border-border overflow-hidden shadow-2xl group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-card relative z-10">
                                <span className="text-8xl font-bold text-muted-foreground/10 select-none">
                                    {product.name.charAt(0)}
                                </span>
                            </div>
                        )}

                        {/* Badges */}
                        <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                            {product.featured && (
                                <div className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md">
                                    <span className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Featured Product
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                    {product.category.replace("_", " ")}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.stock > 0
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : "bg-red-500/10 text-red-500"
                                    }`}>
                                    {product.stock > 0 ? "In Stock" : "Sold Out"}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                                {product.name}
                            </h1>

                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-card border border-border space-y-6">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium mb-1">Total Price</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold font-mono">{product.price.toFixed(2)}</span>
                                        <span className="text-lg text-muted-foreground">TND</span>
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-14 text-lg gap-2 shadow-lg shadow-primary/20"
                                disabled={product.stock === 0}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                            </Button>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Zap className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Instant Delivery</p>
                                        <p className="text-xs text-muted-foreground">Get your code immediately</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Shield className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Secure Payment</p>
                                        <p className="text-xs text-muted-foreground">100% encrypted transaction</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
