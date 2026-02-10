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

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const user = await prisma.user.findUnique({
        where: { id },
    })

    if (!user) {
        return (
            <div className="py-12 container text-center">
                <h1 className="text-2xl font-bold mb-4">User not found</h1>
                <Link href="/admin/users">
                    <Button variant="outline">Back to Users</Button>
                </Link>
            </div>
        )
    }

    async function updateUser(formData: FormData) {
        "use server"

        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const role = formData.get("role") as string
        const balance = parseFloat(formData.get("balance") as string)
        const cashback = parseFloat(formData.get("cashback") as string)

        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                role,
                balance,
                cashback,
            },
        })

        revalidatePath("/admin/users")
        redirect("/admin/users")
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-2xl mx-auto">
                    <Link
                        href="/admin/users"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Users
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Edit User</span>
                        </h1>
                        <p className="text-[#a1a1aa] mt-2">Update user details and permissions</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={updateUser} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={user.name || ""}
                                        placeholder="User Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user.email}
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        name="role"
                                        defaultValue={user.role}
                                        className="w-full rounded-xl bg-[#151515] border border-[#262626] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]/20 focus:border-[#EAB308]/50 transition-all placeholder:text-muted-foreground"
                                    >
                                        <option value="CLIENT">Client</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="balance">Balance (TND)</Label>
                                        <Input
                                            id="balance"
                                            name="balance"
                                            type="number"
                                            step="0.01"
                                            defaultValue={user.balance}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cashback">Cashback (TND)</Label>
                                        <Input
                                            id="cashback"
                                            name="cashback"
                                            type="number"
                                            step="0.01"
                                            defaultValue={user.cashback}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-4">
                                    <Link href="/admin/users">
                                        <Button type="button" variant="ghost">Cancel</Button>
                                    </Link>
                                    <Button type="submit">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
