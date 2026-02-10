"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, ShoppingBag, Settings, Wallet, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container w-[90%] md:w-[85%] lg:w-[75%] max-w-[1400px] mx-auto px-4 pt-32 pb-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Dashboard Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-28 p-6 rounded-[2rem] bg-card/50 backdrop-blur-xl border border-border/50 shadow-xl">
                            <div className="mb-6 px-2">
                                <h2 className="text-lg font-bold text-foreground">My Account</h2>
                                <p className="text-xs text-muted-foreground">Manage your profile & orders</p>
                            </div>

                            <nav className="space-y-2">
                                <NavItem
                                    href="/dashboard"
                                    icon={<User className="w-4 h-4" />}
                                    label="Overview"
                                    active={pathname === "/dashboard"}
                                />
                                <NavItem
                                    href="/dashboard/orders"
                                    icon={<ShoppingBag className="w-4 h-4" />}
                                    label="My Orders"
                                    active={pathname === "/dashboard/orders"}
                                />
                                <NavItem
                                    href="/dashboard/wallet"
                                    icon={<Wallet className="w-4 h-4" />}
                                    label="Wallet & Top Up"
                                    active={pathname?.startsWith("/dashboard/wallet")}
                                />
                                <NavItem
                                    href="/dashboard/settings"
                                    icon={<Settings className="w-4 h-4" />}
                                    label="Settings"
                                    active={pathname === "/dashboard/settings"}
                                />
                            </nav>

                            <div className="my-6 h-px bg-border/50" />

                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 group"
                            >
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-card/30 backdrop-blur-sm rounded-[2.5rem] border border-border/50 p-6 sm:p-10 shadow-2xl">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${active
                    ? "bg-primary/10 text-primary font-semibold shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
        >
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
            )}
            <span className={`relative z-10 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
                {icon}
            </span>
            <span className="relative z-10">{label}</span>
        </Link>
    )
}
