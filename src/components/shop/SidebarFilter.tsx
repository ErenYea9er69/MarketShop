"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"

const categories = [
    { id: "all", name: "all" },
    { id: "GIFT_CARDS", name: "GIFT_CARDS" },
    { id: "SUBSCRIPTIONS", name: "SUBSCRIPTIONS" },
    { id: "PRODUCT_KEYS", name: "PRODUCT_KEYS" },
    { id: "TOP_UPS", name: "TOP_UPS" },
]

export function SidebarFilter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { t } = useLanguage()

    // Get initial state from URL or default
    const currentCategory = searchParams.get("category") || "all"
    const initialMaxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 1000

    const [price, setPrice] = useState(initialMaxPrice)

    // Debounce effect to update URL
    useEffect(() => {
        const timer = setTimeout(() => {
            if (price !== initialMaxPrice) {
                const params = new URLSearchParams(searchParams.toString())
                params.set("maxPrice", price.toString())
                router.push(`/shop?${params.toString()}`, { scroll: false })
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [price, router, searchParams, initialMaxPrice])

    // Update local state immediately for smooth sliding
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(e.target.value))
    }

    return (
        <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6 sticky top-32">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">{t("filters.title")}</h3>
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </div>

            {/* Price Filter */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-primary">{t("filters.maxPrice")}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground rotate-180" />
                </div>

                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={price}
                        className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                        onChange={handleSliderChange}
                    />
                    <div className="flex justify-between mt-3 text-sm font-bold font-mono text-foreground/80">
                        <span>0 TND</span>
                        <span>{price} TND</span>
                    </div>
                </div>
            </div>

            <div className="h-px bg-border/50 mb-8" />

            {/* Categories Filter */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-primary">{t("filters.categories")}</span>
                    <ChevronDown className="w-4 h-4 text-muted-foreground rotate-180" />
                </div>

                <div className="space-y-2">
                    {categories.map((cat) => {
                        const isActive = currentCategory === cat.id || (currentCategory === "all" && cat.id === "all")

                        return (
                            <Link
                                key={cat.id}
                                href={`/shop${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
                                className={`
                                    flex items-center justify-between w-full p-2 rounded-lg transition-all duration-200 group
                                    ${isActive
                                        ? "bg-primary/10 text-primary font-medium"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        flex items-center justify-center w-5 h-5 rounded-md border transition-all
                                        ${isActive
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "border-muted-foreground/30 bg-background/50 group-hover:border-primary/50"
                                        }
                                    `}>
                                        {isActive && <Check className="w-3 h-3" />}
                                    </div>
                                    <span className="text-sm">{t(`categories.${cat.name}`)}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
