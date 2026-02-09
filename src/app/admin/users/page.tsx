import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, User, Shield, ShieldAlert, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export default async function UsersPage() {
    const session = await auth()

    if (!session?.user || session.user.role !== "ADMIN") {
        redirect("/")
    }

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
    })

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">
                            <span className="gradient-text">Users</span>
                        </h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-10 pr-4 py-2 rounded-xl bg-[#151515] border border-[#262626] text-sm text-[#fafafa] placeholder:text-[#52525b] focus:outline-none focus:border-[#EAB308]/50 w-64 transition-colors"
                            />
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                All Users ({users.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#262626]">
                                            <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">User</th>
                                            <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Role</th>
                                            <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Balance</th>
                                            <th className="text-left py-3 px-4 text-[#71717a] font-medium text-sm">Joined</th>
                                            <th className="text-right py-3 px-4 text-[#71717a] font-medium text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-[#262626] hover:bg-[#151515] transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#333] flex items-center justify-center text-sm font-bold text-[#EAB308]">
                                                            {user.name?.charAt(0) || user.email.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-[#fafafa]">{user.name || "Unnamed"}</p>
                                                            <p className="text-xs text-[#a1a1aa]">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === "ADMIN"
                                                            ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                            : "bg-[#262626] text-[#a1a1aa] border-transparent"
                                                        }`}>
                                                        {user.role === "ADMIN" ? <ShieldAlert className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                                        {user.role}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`font-mono font-medium ${user.balance > 0 ? "text-[#EAB308]" : "text-[#71717a]"}`}>
                                                        {user.balance.toFixed(2)} TND
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-sm text-[#a1a1aa]">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <button className="text-xs font-medium text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
