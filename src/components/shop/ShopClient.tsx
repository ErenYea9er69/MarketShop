"use client"

import Link from "next/link"
import { Search, Filter, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { SidebarFilter } from "@/components/shop/SidebarFilter"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { type Product } from "@prisma/client"

interface ShopClientProps {
    products: Product[]
    search: string
}

export function ShopClient({ products, search }: ShopClientProps) {
    const { t } = useLanguage()

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container w-[75%] max-w-[1400px] mx-auto px-4 pt-32 pb-12 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6 animate-fade-in">
                        <Sparkles className="w-3 h-3" />
                        <span>{t("shop.title")}</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        {t("shop.title")}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Sidebar Filter */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-8">
                            {/* Search */}
                            <form className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                </div>
                                <Input
                                    type="search"
                                    name="search"
                                    placeholder={t("shop.searchPlaceholder")}
                                    defaultValue={search}
                                    className="pl-10 bg-muted/50 border-transparent focus:bg-background focus:border-primary/50 h-10 rounded-xl transition-all w-full"
                                />
                            </form>

                            <SidebarFilter />
                        </div>
                    </aside>

                    {/* Right Content */}
                    <div className="flex-1">
                        {/* Products Grid */}
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in bg-card/30 rounded-3xl border border-dashed border-border">
                                <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-6">
                                    <Filter className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 mb-2">
                                    {t("shop.noProducts")}
                                </h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {products.map((product: Product) => (
                                    <Link
                                        key={product.id}
                                        href={`/shop/${product.id}`}
                                        className="group relative block"
                                    >
                                        <div className="relative h-full bg-card rounded-[2rem] border border-border overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] group-hover:border-primary/30">
                                            {/* Gradient Hover Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10 p-5 flex flex-col h-full">
                                                {/* Image Area */}
                                                <div className="aspect-[4/3] rounded-2xl bg-muted/40 overflow-hidden mb-5 relative group-hover:shadow-inner transition-all">
                                                    {product.image ? (
                                                        <img
                                                            src={product.image}
                                                            alt={product.nameAr || product.namefr || product.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
                                                            <span className="text-4xl font-bold text-muted-foreground/20 group-hover:text-primary/40 transition-colors">
                                                                {product.name.charAt(0)}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Stock Status Badge */}
                                                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full backdrop-blur-md border ${product.stock > 0
                                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                                                        : "bg-red-500/10 border-red-500/20 text-red-500"
                                                        }`}>
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">
                                                            {product.stock > 0 ? t("product.inStock") : t("product.soldOut")}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 flex flex-col">
                                                    <div className="mb-auto">
                                                        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all">
                                                            {product.name}
                                                        </h3>
                                                        {(product.description || product.descAr || product.descFr) && (
                                                            <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4">
                                                                {product.description || product.descAr || product.descFr}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/50 group-hover:border-primary/10 transition-colors gap-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs text-muted-foreground font-medium">{t("product.totalPrice")}</span>
                                                            <span className="text-xl font-bold text-foreground font-mono">
                                                                {product.price}<span className="text-sm text-muted-foreground ml-1">TND</span>
                                                            </span>
                                                        </div>

                                                        <Button size="icon" className="h-10 w-10 rounded-full bg-secondary/10 hover:bg-primary hover:text-primary-foreground text-secondary-foreground transition-all duration-300 shadow-sm group-hover:scale-105">
                                                            <ShoppingBag className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
