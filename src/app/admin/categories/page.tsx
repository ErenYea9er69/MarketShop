import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Plus, FolderTree, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { revalidatePath } from "next/cache"

export default async function CategoriesPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { products: true }
            }
        }
    })

    async function deleteCategory(id: string) {
        "use server"
        await prisma.category.delete({
            where: { id }
        })
        revalidatePath("/admin/categories")
    }

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
                            <span className="gradient-text">Categories</span>
                        </h1>
                        <Link href="/admin/categories/new">
                            <Button>
                                <Plus className="w-4 h-4" />
                                Add Category
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FolderTree className="w-5 h-5" />
                                All Categories ({categories.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {categories.length === 0 ? (
                                <div className="text-center py-12">
                                    <FolderTree className="w-12 h-12 mx-auto text-[#71717a] mb-4" />
                                    <p className="text-[#71717a] mb-4">No categories yet</p>
                                    <Link href="/admin/categories/new">
                                        <Button>Add your first category</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-[#262626]">
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Name</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Products</th>
                                                <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Slug</th>
                                                <th className="text-right py-3 px-4 text-[#71717a] font-medium text-sm">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categories.map((category) => (
                                                <tr key={category.id} className="border-b border-[#262626] hover:bg-[#151515]">
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 flex items-center justify-center">
                                                                <span className="text-sm font-bold gradient-text">
                                                                    {category.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-[#fafafa]">{category.name}</p>
                                                                {(category.nameAr || category.nameFr) && (
                                                                    <p className="text-xs text-[#a1a1aa]">{category.nameAr} / {category.nameFr}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-[#a1a1aa] text-sm">
                                                            {category._count.products} products
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="font-mono text-xs text-[#EAB308] bg-[#EAB308]/10 px-2 py-1 rounded">
                                                            {category.slug}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link
                                                                href={`/admin/categories/${category.id}/edit`}
                                                                className="p-2 rounded-lg hover:bg-[#262626] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                                                            >
                                                                <Pencil className="w-4 h-4" />
                                                            </Link>
                                                            <form action={deleteCategory.bind(null, category.id)}>
                                                                <button className="p-2 rounded-lg hover:bg-[#262626] text-[#a1a1aa] hover:text-[#ef4444] transition-colors">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </form>
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
