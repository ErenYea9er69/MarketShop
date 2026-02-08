"use client"

import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { useCart } from "@/components/providers/CartProvider"

export default function CartPage() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div className="py-20">
                <div className="container">
                    <div className="max-w-md mx-auto text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#151515] flex items-center justify-center">
                            <ShoppingCart className="w-10 h-10 text-[#71717a]" />
                        </div>
                        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                        <p className="text-[#71717a] mb-8">Add some products to get started</p>
                        <Link href="/shop">
                            <Button>
                                Browse Shop
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12">
            <div className="container">
                <h1 className="text-3xl font-bold mb-8">
                    <span className="gradient-text">Shopping Cart</span>
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-4">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#151515] flex items-center justify-center flex-shrink-0">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                                            ) : (
                                                <span className="text-xl font-bold gradient-text">{item.name.charAt(0)}</span>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-[#fafafa] truncate">{item.name}</h3>
                                            <p className="text-[#22c55e] font-bold">{item.price} TND</p>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-lg bg-[#151515] border border-[#262626] flex items-center justify-center hover:border-[#3a3a3a] transition-colors"
                                            >
                                                <Minus className="w-4 h-4 text-[#a1a1aa]" />
                                            </button>
                                            <span className="w-8 text-center text-[#fafafa] font-medium">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-lg bg-[#151515] border border-[#262626] flex items-center justify-center hover:border-[#3a3a3a] transition-colors"
                                            >
                                                <Plus className="w-4 h-4 text-[#a1a1aa]" />
                                            </button>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 rounded-lg hover:bg-[#151515] text-[#71717a] hover:text-[#ef4444] transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <button
                            onClick={clearCart}
                            className="text-[#71717a] hover:text-[#ef4444] text-sm transition-colors"
                        >
                            Clear cart
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between text-[#a1a1aa]">
                                    <span>Subtotal</span>
                                    <span>{total.toFixed(2)} TND</span>
                                </div>
                                <div className="flex justify-between text-[#a1a1aa]">
                                    <span>Cashback (5%)</span>
                                    <span className="text-[#22c55e]">+{(total * 0.05).toFixed(2)} TND</span>
                                </div>
                                <div className="h-px bg-[#262626]" />
                                <div className="flex justify-between text-lg font-bold text-[#fafafa]">
                                    <span>Total</span>
                                    <span>{total.toFixed(2)} TND</span>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full">
                                        Checkout
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>

                                <p className="text-xs text-[#71717a] text-center">
                                    Payment will be deducted from your wallet balance
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
