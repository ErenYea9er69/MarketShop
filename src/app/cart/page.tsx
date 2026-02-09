"use client"

import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useCart } from "@/components/providers/CartProvider"
import { useLanguage } from "@/components/providers/LanguageProvider"

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()
    const { t } = useLanguage()

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-12">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
                </div>

                <div className="container w-[75%] max-w-[1400px] mx-auto px-4 relative z-10">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-24 h-24 mx-auto mb-8 rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center">
                            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">{t("cart.empty")}</h1>
                        <p className="text-muted-foreground mb-8">{t("cart.emptySubtitle")}</p>
                        <Link href="/shop">
                            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                                {t("cart.browseShop")}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden pt-32 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container w-[75%] max-w-[1400px] mx-auto px-4 relative z-10">
                <Link href="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t("cart.continueShopping")}
                </Link>

                <h1 className="text-4xl font-bold mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{t("cart.title")}</span>
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="p-6 rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 group hover:border-primary/20 transition-colors"
                            >
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-muted/50 to-card flex items-center justify-center flex-shrink-0 overflow-hidden">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-2xl font-bold text-muted-foreground/30">{item.name.charAt(0)}</span>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg text-foreground truncate">
                                            {t(`products.${item.id}.name`) !== `products.${item.id}.name` ? t(`products.${item.id}.name`) : item.name}
                                        </h3>
                                        <p className="text-primary font-bold text-xl mt-1">{item.price.toFixed(2)} TND</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center hover:border-primary/30 hover:bg-muted transition-colors"
                                        >
                                            <Minus className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <span className="w-8 text-center text-foreground font-medium text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-10 h-10 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center hover:border-primary/30 hover:bg-muted transition-colors"
                                        >
                                            <Plus className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="p-3 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-muted-foreground hover:text-red-500 text-sm transition-colors mt-4"
                        >
                            {t("cart.clearCart")}
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="p-8 rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 sticky top-32 space-y-6">
                            <h2 className="text-xl font-bold">{t("cart.orderSummary")}</h2>

                            <div className="space-y-4">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>{t("cart.subtotal")}</span>
                                    <span>{total.toFixed(2)} TND</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>{t("cart.cashback")}</span>
                                    <span className="text-emerald-500">+{(total * 0.05).toFixed(2)} TND</span>
                                </div>
                                <div className="h-px bg-border/50" />
                                <div className="flex justify-between text-xl font-bold text-foreground">
                                    <span>{t("cart.total")}</span>
                                    <span>{total.toFixed(2)} TND</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block">
                                <Button className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl">
                                    {t("cart.checkout")}
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>

                            <p className="text-xs text-muted-foreground text-center">
                                {t("cart.paymentNote")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
