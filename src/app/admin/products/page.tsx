import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { ArrowLeft, Plus, Package, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const categoryLabels: Record<string, string> = {
    GIFT_CARDS: "Gift Cards",
    SUBSCRIPTIONS: "Subscriptions",
    PRODUCT_KEYS: "Product Keys",
    TOP_UPS: "Top Ups",
}

export default async function ProductsPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const products = await prisma.product.findMany({
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-5xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Products</span>
                        </h1>
                        <Link href="/admin/products/new">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Product
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                All Products ({products.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <Package className="w-12 h-12 mx-auto text-[#71717a] mb-4" />
                                    <p className="text-[#71717a] mb-4">No products yet</p>
                                    <Link href="/admin/products/new">
                                        <Button>Add your first product</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[#262626]">
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Product</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Category</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Price</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Stock</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Status</th>
                                                <th className="text-right py-3 px-4 text-[#71717a] font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.id} className="border-b border-[#262626] hover:bg-[#151515]">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center">
                                                                <span className="text-sm font-bold gradient-text">
                                                                    {product.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-[#fafafa]">{product.name}</p>
                                                                {product.featured && (
                                                                    <span className="text-xs text-[#22c55e]">Featured</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-[#a1a1aa] text-sm">
                                                            {categoryLabels[product.category] || product.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="font-bold text-[#22c55e]">{product.price} TND</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className={product.stock > 0 ? "text-[#fafafa]" : "text-[#ef4444]"}>
                                                            {product.stock}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded-full ${product.active
                                                                    ? "bg-[rgba(34,197,94,0.15)] text-[#22c55e]"
                                                                    : "bg-[rgba(239,68,68,0.15)] text-[#ef4444]"
                                                                }`}
                                                        >
                                                            {product.active ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/admin/products/${product.id}/edit`}
                                                                className="p-2 rounded-lg hover:bg-[#262626] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </Link>
                                                            <button className="p-2 rounded-lg hover:bg-[#262626] text-[#a1a1aa] hover:text-[#ef4444] transition-colors">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
