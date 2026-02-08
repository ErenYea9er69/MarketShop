import Link from "next/link"
import { Search, Filter } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

const categories = [
    { id: "all", name: "All", nameAr: "الكل", nameFr: "Tout" },
    { id: "GIFT_CARDS", name: "Gift Cards", nameAr: "كروت الهدايا", nameFr: "Cartes Cadeaux" },
    { id: "SUBSCRIPTIONS", name: "Subscriptions", nameAr: "الاشتراكات", nameFr: "Abonnements" },
    { id: "PRODUCT_KEYS", name: "Product Keys", nameAr: "مفاتيح المنتجات", nameFr: "Clés de Produits" },
    { id: "TOP_UPS", name: "Top Ups", nameAr: "التعبئة", nameFr: "Recharges" },
]

interface ShopPageProps {
    searchParams: Promise<{ category?: string; search?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const category = params.category || "all"
    const search = params.search || ""

    // Fetch products from database
    const products = await prisma.product.findMany({
        where: {
            active: true,
            ...(category !== "all" && { category }),
            ...(search && {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                ],
            }),
        },
        orderBy: [
            { featured: "desc" },
            { createdAt: "desc" },
        ],
    })

    return (
        <div className="py-12">
            <div className="container">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Digital Products</span>
                    </h1>
                    <p className="text-[#a1a1aa] max-w-2xl mx-auto">
                        Top subscriptions and digital top-ups — instant delivery, secure payments, and 5% cashback on qualifying orders.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Search */}
                    <form className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a]" />
                            <Input
                                type="search"
                                name="search"
                                placeholder="Search products..."
                                defaultValue={search}
                                className="pl-10"
                            />
                        </div>
                    </form>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/shop${cat.id !== "all" ? `?category=${cat.id}` : ""}`}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.id || (category === "all" && cat.id === "all")
                                    ? "bg-gradient-to-r from-[#22c55e] to-[#06b6d4] text-[#0a0a0a]"
                                    : "bg-[#151515] text-[#a1a1aa] border border-[#262626] hover:border-[#3a3a3a]"
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <Filter className="w-12 h-12 mx-auto text-[#71717a] mb-4" />
                        <h3 className="text-lg font-semibold text-[#fafafa] mb-2">No products found</h3>
                        <p className="text-[#71717a]">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Link key={product.id} href={`/shop/${product.id}`}>
                                <Card className="group cursor-pointer overflow-hidden h-full">
                                    {/* Product Image */}
                                    <div className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#151515] flex items-center justify-center relative overflow-hidden">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <span className="text-2xl font-bold gradient-text">{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        {product.featured && (
                                            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-[#22c55e] text-[#0a0a0a] text-xs font-bold">
                                                Featured
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-[#fafafa] mb-1 group-hover:text-[#22c55e] transition-colors">
                                            {product.name}
                                        </h3>
                                        {product.description && (
                                            <p className="text-[#71717a] text-sm mb-3 line-clamp-2">{product.description}</p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#22c55e] font-bold text-lg">{product.price} TND</span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0
                                                ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                                                : "bg-[rgba(239,68,68,0.15)] text-[#ef4444]"
                                                }`}>
                                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
