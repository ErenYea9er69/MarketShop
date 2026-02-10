import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { revalidatePath } from "next/cache"

export default async function NewCategoryPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    async function createCategory(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const nameAr = formData.get("nameAr") as string
        const nameFr = formData.get("nameFr") as string

        let slug = formData.get("slug") as string
        if (!slug) {
            slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
        }

        try {
            await prisma.category.create({
                data: {
                    name,
                    nameAr: nameAr || null,
                    nameFr: nameFr || null,
                    slug,
                },
            })
        } catch (error) {
            console.error("Failed to create category:", error)
            // Ideally we'd return an error to the form, but for simplicity we'll just log it.
            // In a real app we'd use useFormState.
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
                            <span className="gradient-text">Add New Category</span>
                        </h1>
                        <p className="text-[#a1a1aa] mt-2">Create a new product category</p>
                    </div>

                    <form action={createCategory} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Category Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name (English)</Label>
                                    <Input id="name" name="name" placeholder="e.g. Gaming" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nameAr">Name (Arabic - Optional)</Label>
                                    <Input id="nameAr" name="nameAr" placeholder="e.g. ألعاب" className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nameFr">Name (French - Optional)</Label>
                                    <Input id="nameFr" name="nameFr" placeholder="e.g. Jeux Vidéo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug (Optional - auto-generated if empty)</Label>
                                    <Input id="slug" name="slug" placeholder="e.g. gaming" />
                                    <p className="text-xs text-[#a1a1aa]">Used in URLs. Must be unique.</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/categories">
                                <Button type="button" variant="ghost">Cancel</Button>
                            </Link>
                            <Button type="submit">
                                <Plus className="w-4 h-4 mr-2" />
                                Create Category
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
