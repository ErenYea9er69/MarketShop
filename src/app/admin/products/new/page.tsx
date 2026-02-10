import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Save, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"
import { Checkbox } from "@/components/ui/Checkbox"
import { revalidatePath } from "next/cache"

export default async function NewProductPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    async function createProduct(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const nameAr = formData.get("nameAr") as string
        const nameFr = formData.get("nameFr") as string
        const description = formData.get("description") as string
        const descAr = formData.get("descAr") as string
        const descFr = formData.get("descFr") as string
        const price = parseFloat(formData.get("price") as string)
        const category = formData.get("category") as string
        const stock = parseInt(formData.get("stock") as string)
        const image = formData.get("image") as string
        const featured = formData.get("featured") === "on"
        const active = formData.get("active") === "on"

        await prisma.product.create({
            data: {
                name,
                nameAr: nameAr || null,
                nameFr: nameFr || null,
                description: description || null,
                descAr: descAr || null,
                descFr: descFr || null,
                price,
                category,
                stock,
                image: image || null,
                featured,
                active,
                // Generate a slug-like ID from the name
                id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).substring(2, 7)
            },
        })

        revalidatePath("/admin/products")
        redirect("/admin/products")
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/admin/products"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Add New Product</span>
                        </h1>
                        <p className="text-[#a1a1aa] mt-2">Create a new product listing</p>
                    </div>

                    <form action={createProduct} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Basic Info */}
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name (English)</Label>
                                        <Input id="name" name="name" placeholder="e.g. Netflix Subscription" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nameAr">Name (Arabic - Optional)</Label>
                                        <Input id="nameAr" name="nameAr" placeholder="e.g. اشتراك نتفليكس" className="text-right" dir="rtl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nameFr">Name (French - Optional)</Label>
                                        <Input id="nameFr" name="nameFr" placeholder="e.g. Abonnement Netflix" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <select
                                            id="category"
                                            name="category"
                                            className="w-full rounded-xl bg-[#151515] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308]/50 transition-all"
                                        >
                                            <option value="GIFT_CARDS">Gift Cards</option>
                                            <option value="SUBSCRIPTIONS">Subscriptions</option>
                                            <option value="PRODUCT_KEYS">Product Keys</option>
                                            <option value="TOP_UPS">Top Ups</option>
                                        </select>
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
                                        <Input id="price" name="price" type="number" step="0.01" placeholder="0.00" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock">Stock Quantity</Label>
                                        <Input id="stock" name="stock" type="number" placeholder="0" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image URL</Label>
                                        <Input id="image" name="image" placeholder="/images/products/..." />
                                    </div>
                                    <div className="pt-4 space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="featured" name="featured" />
                                            <Label htmlFor="featured" className="font-normal cursor-pointer">Featured Product</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="active" name="active" defaultChecked />
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
                                    <Textarea id="description" name="description" placeholder="Product details..." rows={3} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descAr">Description (Arabic)</Label>
                                    <Textarea id="descAr" name="descAr" placeholder="تفاصيل المنتج..." rows={3} className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descFr">Description (French)</Label>
                                    <Textarea id="descFr" name="descFr" placeholder="Détails du produit..." rows={3} />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4 sticky bottom-6 bg-[#0a0a0a]/80 backdrop-blur-xl p-4 rounded-xl border border-[#262626] shadow-2xl">
                            <Link href="/admin/products">
                                <Button type="button" variant="ghost">Cancel</Button>
                            </Link>
                            <Button type="submit" className="min-w-[150px]">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Product
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
