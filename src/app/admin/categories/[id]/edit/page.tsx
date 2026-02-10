import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { revalidatePath } from "next/cache"

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const category = await (prisma as any).category.findUnique({
        where: { id }
    })

    if (!category) {
        return (
            <div className="py-12 container text-center">
                <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                <Link href="/admin/categories">
                    <Button variant="outline">Back to Categories</Button>
                </Link>
            </div>
        )
    }

    async function updateCategory(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const nameAr = formData.get("nameAr") as string
        const nameFr = formData.get("nameFr") as string
        const slug = formData.get("slug") as string

        try {
            await (prisma as any).category.update({
                where: { id },
                data: {
                    name,
                    nameAr: nameAr || null,
                    nameFr: nameFr || null,
                    slug,
                },
            })
        } catch (error) {
            console.error("Failed to update category:", error)
            return
        }

        revalidatePath("/admin/categories")
        redirect("/admin/categories")
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/admin/categories"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Categories
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Edit Category</span>
                        </h1>
                        <p className="text-[#a1a1aa] mt-2">Update category details</p>
                    </div>

                    <form action={updateCategory} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name (English)</Label>
                                    <Input id="name" name="name" defaultValue={category.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nameAr">Name (Arabic - Optional)</Label>
                                    <Input id="nameAr" name="nameAr" defaultValue={category.nameAr || ""} className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nameFr">Name (French - Optional)</Label>
                                    <Input id="nameFr" name="nameFr" defaultValue={category.nameFr || ""} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input id="slug" name="slug" defaultValue={category.slug} required />
                                    <p className="text-xs text-[#a1a1aa]">Used in URLs. Must be unique.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/categories">
                                <Button type="button" variant="ghost">Cancel</Button>
                            </Link>
                            <Button type="submit">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
