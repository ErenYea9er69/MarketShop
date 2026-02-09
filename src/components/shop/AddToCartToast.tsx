"use client"

import { useCart } from "@/components/providers/CartProvider"
import { ShoppingCart, X, Check } from "lucide-react"
import Link from "next/link"

export function AddToCartToast() {
    const { lastAddedItem, clearLastAddedItem, itemCount } = useCart()

    if (!lastAddedItem) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-4 shadow-2xl shadow-black/20 min-w-[320px]">
                <div className="flex items-start gap-4">
                    {/* Success Icon */}
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-emerald-500" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                            {lastAddedItem.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Added to cart
                        </p>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={clearLastAddedItem}
                        className="p-1 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* View Cart Link */}
                <Link
                    href="/cart"
                    className="mt-3 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                >
                    <ShoppingCart className="w-4 h-4" />
                    View Cart ({itemCount})
                </Link>
            </div>
        </div>
    )
}
