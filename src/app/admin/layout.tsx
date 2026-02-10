import Link from "next/link"
import { LayoutDashboard, Users, ShoppingBag, CreditCard, Settings, LogOut, Package, Layers } from "lucide-react"
import { auth, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    if (session?.user?.role !== "ADMIN") {
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-[#050505] text-[#fafafa] flex font-sans selection:bg-[#EAB308]/20 selection:text-[#EAB308]">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#EAB308]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
            </div>

            {/* Sidebar */}
            <aside className="w-72 border-r border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-xl flex flex-col fixed h-full z-50">
                <div className="p-8 pb-6 border-b border-[#262626]/50">
                    <Link href="/admin" className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#EAB308]/20 group-hover:shadow-[#EAB308]/40 transition-shadow duration-300">
                            <span className="text-black font-bold text-lg">K</span>
                        </div>
                        <div>
                            <span className="font-bold text-xl tracking-tight block group-hover:text-[#EAB308] transition-colors">Admin</span>
                            <span className="text-xs text-[#a1a1aa] uppercase tracking-wider font-medium">Panel</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    <p className="px-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4">Overview</p>
                    <NavItem href="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" />

                    <p className="px-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4 mt-8">Management</p>
                    <NavItem href="/admin/users" icon={<Users className="w-5 h-5" />} label="Users" />
                    <NavItem href="/admin/products" icon={<Package className="w-5 h-5" />} label="Products" />
                    <NavItem href="/admin/categories" icon={<Layers className="w-5 h-5" />} label="Categories" />
                    <NavItem href="/admin/orders" icon={<ShoppingBag className="w-5 h-5" />} label="Orders" />
                    <NavItem href="/admin/transactions" icon={<CreditCard className="w-5 h-5" />} label="Transactions" />

                    <p className="px-4 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wider mb-4 mt-8">System</p>
                    <NavItem href="/admin/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
                </nav>

                <div className="p-6 border-t border-[#262626]/50 bg-[#0a0a0a]/50">
                    <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-[#151515] border border-[#262626]">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#333] flex items-center justify-center text-xs font-bold text-[#EAB308]">
                            {session.user.name?.charAt(0) || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-[#fafafa]">{session.user.name}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
                                <p className="text-xs text-[#a1a1aa] truncate">Online</p>
                            </div>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}
                    >
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl transition-all duration-200">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-10 relative z-10">
                {children}
            </main>
        </div>
    )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-4 py-3 text-[#71717a] hover:text-[#fafafa] hover:bg-[#151515] border border-transparent hover:border-[#262626] rounded-xl transition-all duration-200 group"
        >
            <span className="group-hover:text-[#EAB308] transition-colors duration-200 text-[#52525b]">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    )
}
