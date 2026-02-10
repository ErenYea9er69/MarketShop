import Link from "next/link"
import { LayoutDashboard, Users, ShoppingBag, CreditCard, Settings, LogOut, Package, Layers, ChevronRight } from "lucide-react"
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
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#EAB308]/[0.03] rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F59E0B]/[0.03] rounded-full blur-[120px]" />
            </div>

            {/* Floating Sidebar */}
            <aside className="w-[280px] fixed top-3 left-3 bottom-3 z-50 flex flex-col rounded-2xl bg-[#09090b]/80 backdrop-blur-2xl border border-white/[0.06] shadow-2xl shadow-black/40">

                {/* Logo / Brand */}
                <div className="p-6 pb-5">
                    <Link href="/admin" className="flex items-center gap-3.5 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#D97706] flex items-center justify-center shadow-lg shadow-[#EAB308]/15 group-hover:shadow-[#EAB308]/30 group-hover:scale-105 transition-all duration-300">
                            <span className="text-black font-extrabold text-lg">K</span>
                        </div>
                        <div>
                            <span className="font-semibold text-[15px] tracking-tight block text-white/90 group-hover:text-white transition-colors">Kwaret</span>
                            <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Divider */}
                <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-none">
                    {/* Overview Section */}
                    <div className="px-3 pt-2 pb-3">
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">Overview</span>
                    </div>
                    <NavItem href="/admin" icon={<LayoutDashboard className="w-[18px] h-[18px]" />} label="Dashboard" />

                    {/* Management Section */}
                    <div className="px-3 pt-5 pb-3">
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">Management</span>
                    </div>
                    <NavItem href="/admin/users" icon={<Users className="w-[18px] h-[18px]" />} label="Users" />
                    <NavItem href="/admin/products" icon={<Package className="w-[18px] h-[18px]" />} label="Products" />
                    <NavItem href="/admin/categories" icon={<Layers className="w-[18px] h-[18px]" />} label="Categories" />
                    <NavItem href="/admin/orders" icon={<ShoppingBag className="w-[18px] h-[18px]" />} label="Orders" />
                    <NavItem href="/admin/transactions" icon={<CreditCard className="w-[18px] h-[18px]" />} label="Transactions" />

                    {/* System Section */}
                    <div className="px-3 pt-5 pb-3">
                        <span className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.2em]">System</span>
                    </div>
                    <NavItem href="/admin/settings" icon={<Settings className="w-[18px] h-[18px]" />} label="Settings" />
                </nav>

                {/* Divider */}
                <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

                {/* Profile & Sign Out */}
                <div className="p-4">
                    {/* Profile Card */}
                    <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.05] transition-colors duration-200">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#EAB308]/80 to-[#D97706]/80 flex items-center justify-center text-xs font-bold text-black shadow-md shadow-[#EAB308]/10">
                            {session.user.name?.charAt(0)?.toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium truncate text-white/80">{session.user.name}</p>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                                <p className="text-[11px] text-white/25">Online</p>
                            </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-white/10" />
                    </div>

                    {/* Sign Out */}
                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/" })
                        }}
                    >
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-medium text-red-400/70 hover:text-red-400 bg-red-500/[0.04] hover:bg-red-500/[0.08] border border-red-500/[0.06] hover:border-red-500/[0.12] rounded-xl transition-all duration-200">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-[292px] p-10 relative z-10">
                {children}
            </main>
        </div>
    )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3.5 py-2.5 text-white/40 hover:text-white/90 hover:bg-white/[0.04] rounded-xl transition-all duration-200 group hover:translate-x-0.5"
        >
            <span className="group-hover:text-[#EAB308] transition-all duration-200 text-white/25 group-hover:drop-shadow-[0_0_6px_rgba(234,179,8,0.3)]">{icon}</span>
            <span className="text-[13px] font-medium tracking-wide">{label}</span>
        </Link>
    )
}
