import { redirect } from "next/navigation"
import Link from "next/link"
import { ProductKeysManager } from "@/components/admin/ProductKeysManager"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { StockInput } from "@/components/admin/StockInput"
import { Checkbox } from "@/components/ui/Checkbox"
import { revalidatePath } from "next/cache"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const [product, categories] = await Promise.all([
        prisma.product.findUnique({
            where: { id },
        }),
        prisma.category.findMany({
            orderBy: { name: "asc" },
        })
    ])

    if (!product) {
        return (
            <div className="py-12 container text-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link href="/admin/products">
                    <Button variant="outline">Back to Products</Button>
                </Link>
            </div>
        )
    }

    async function updateProduct(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const nameAr = formData.get("nameAr") as string
        const nameFr = formData.get("nameFr") as string
        const description = formData.get("description") as string
        const descAr = formData.get("descAr") as string
        const descFr = formData.get("descFr") as string
        const price = parseFloat(formData.get("price") as string)
        const categorySlug = formData.get("category") as string
        const stock = parseInt(formData.get("stock") as string)
        const image = formData.get("image") as string
        const featured = formData.get("featured") === "on"
        const active = formData.get("active") === "on"

        const categoryObj = await prisma.category.findUnique({
            where: { slug: categorySlug }
        })

        await prisma.product.update({
            where: { id },
            data: {
                name,
                nameAr: nameAr || null,
                nameFr: nameFr || null,
                description: description || null,
                descAr: descAr || null,
                descFr: descFr || null,
                price,
                category: categorySlug,
                categoryId: categoryObj?.id,
                stock,
                image: image || null,
                featured,
                active,
            },
        })

        revalidatePath("/admin/products")
        redirect("/admin/products")
    }

    async function deleteProduct() {
        "use server"
        await prisma.product.delete({ where: { id } })
        revalidatePath("/admin/products")
        redirect("/admin/products")
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Link>
                        <form action={deleteProduct}>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Product
                            </Button>
                        </form>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Edit Product</span>
                        </h1>
                        <p className="text-[#a1a1aa] mt-2">Manage product details, pricing, and stock</p>
                    </div>

                    <form action={updateProduct} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Basic Info */}
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name (English)</Label>
                                        <Input id="name" name="name" defaultValue={product.name} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nameAr">Name (Arabic - Optional)</Label>
                                        <Input id="nameAr" name="nameAr" defaultValue={product.nameAr || ""} className="text-right" dir="rtl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nameFr">Name (French - Optional)</Label>
                                        <Input id="nameFr" name="nameFr" defaultValue={product.nameFr || ""} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        {categories.length > 0 ? (
                                            <select
                                                id="category"
                                                name="category"
                                                defaultValue={product.category}
                                                className="w-full rounded-xl bg-[#151515] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308]/50 transition-all"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat.id} value={cat.slug}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <div className="text-sm text-red-500">
                                                No categories found.{" "}
                                                <Link href="/admin/categories/new" className="underline hover:text-red-400">
                                                    Create one first.
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Pricing & Stock */}
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Pricing & Inventory</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price (TND)</Label>
                                        <Input id="price" name="price" type="number" step="0.01" defaultValue={product.price} required />
                                    </div>
                                    <StockInput initialStock={product.stock} />
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Product Image</Label>
                                        <ImageUpload name="image" defaultValue={product.image || ""} />
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="featured" name="featured" defaultChecked={product.featured} />
                                            <Label htmlFor="featured" className="font-normal cursor-pointer">Featured Product</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="active" name="active" defaultChecked={product.active} />
                                            <Label htmlFor="active" className="font-normal cursor-pointer">Active (Visible in shop)</Label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Descriptions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Descriptions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description (English)</Label>
                                    <Textarea id="description" name="description" defaultValue={product.description || ""} rows={3} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descAr">Description (Arabic)</Label>
                                    <Textarea id="descAr" name="descAr" defaultValue={product.descAr || ""} rows={3} className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descFr">Description (French)</Label>
                                    <Textarea id="descFr" name="descFr" defaultValue={product.descFr || ""} rows={3} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4 sticky bottom-6 bg-[#0a0a0a]/80 backdrop-blur-xl p-4 rounded-xl border border-[#262626] shadow-2xl">
                            <Link href="/admin/products">
                                <Button type="button" variant="ghost">Cancel</Button>
                            </Link>
                            <Button type="submit" className="min-w-[150px]" disabled={categories.length === 0}>
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </form>

                    <div className="mt-12 pt-12 border-t border-border/50">
                        <ProductKeysManager productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

