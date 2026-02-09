"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, ShoppingCart, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useCart } from "@/components/providers/CartProvider"
import { AuthModal } from "@/components/auth/AuthModal"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "ar", name: "العربية", flag: "🇹🇳" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
]

// Custom smooth easing for premium feel
const smoothTransition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'

export function Header() {
    const { data: session, status } = useSession()
    const { itemCount } = useCart()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [langMenuOpen, setLangMenuOpen] = useState(false)
    const [currentLang, setCurrentLang] = useState("en")

    // Auth Modal State
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [authView, setAuthView] = useState<"login" | "register">("login")

    // Animation states
    const [isScrolled, setIsScrolled] = useState(false)
    const [isPillMode, setIsPillMode] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            // Trigger pill mode earlier for better UX
            const triggerPoint = 100

            setIsScrolled(scrollY > 10)
            setIsPillMode(scrollY > triggerPoint)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const openAuth = (view: "login" | "register") => {
        setAuthView(view)
        setAuthModalOpen(true)
        setMobileMenuOpen(false)
    }

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/redeem", label: "Gift Cards" },
        { href: "/contact", label: "Support" },
    ]

    return (
        <>
            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                defaultView={authView}
            />

            <header
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center w-full pointer-events-none`}
                style={{
                    padding: isPillMode ? '12px' : '0',
                    transition: smoothTransition,
                }}
            >
                <div
                    className={`flex items-center justify-between pointer-events-auto ${isPillMode
                        ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#262626] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
                        : isScrolled
                            ? 'w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#262626]'
                            : 'w-full bg-transparent'
                        }`}
                    style={{
                        width: isPillMode ? 'fit-content' : '100%',
                        maxWidth: isPillMode ? '1280px' : '100%',
                        height: isPillMode ? '56px' : '80px',
                        paddingLeft: isPillMode ? '8px' : '24px',
                        paddingRight: isPillMode ? '8px' : '24px',
                        transition: smoothTransition,
                    }}
                >
                    {/* 1. Logo Section */}
                    <div
                        className="flex items-center"
                        style={{
                            gap: isPillMode ? '8px' : '12px',
                            marginRight: isPillMode ? '24px' : '48px',
                            marginLeft: isPillMode ? '8px' : '0',
                            transition: smoothTransition
                        }}
                    >
                        <Link href="/" className="flex items-center gap-3 group">
                            <div
                                className="rounded-xl bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center shadow-lg shadow-[#22c55e]/20 group-hover:scale-105 transition-transform duration-300"
                                style={{
                                    width: isPillMode ? '32px' : '40px',
                                    height: isPillMode ? '32px' : '40px',
                                    borderRadius: isPillMode ? '50%' : '12px',
                                    transition: smoothTransition
                                }}
                            >
                                <span className={`text-[#0a0a0a] font-black ${isPillMode ? 'text-lg' : 'text-xl'}`}>K</span>
                            </div>
                            <span
                                className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fafafa] to-[#a1a1aa] hidden sm:block`}
                                style={{
                                    fontSize: isPillMode ? '16px' : '20px',
                                    opacity: isPillMode ? 0 : 1,
                                    width: isPillMode ? 0 : 'auto',
                                    overflow: 'hidden',
                                    transition: smoothTransition
                                }}
                            >
                                Kwaret
                            </span>
                        </Link>
                    </div>

                    {/* 2. Navigation Section */}
                    <div
                        className="hidden md:flex items-center justify-center"
                        style={{
                            transition: smoothTransition
                        }}
                    >
                        <nav
                            className="flex items-center"
                            style={{
                                gap: isPillMode ? '4px' : '8px',
                                transition: smoothTransition
                            }}
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isPillMode
                                        ? 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#262626]'
                                        : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#262626]/50'
                                        }`}
                                    style={{
                                        padding: isPillMode ? '6px 16px' : '8px 20px',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* 3. Actions Section */}
                    <div
                        className="flex items-center"
                        style={{
                            gap: isPillMode ? '8px' : '16px',
                            marginLeft: isPillMode ? '24px' : '48px',
                            marginRight: isPillMode ? '8px' : '0',
                            transition: smoothTransition
                        }}
                    >
                        {/* Theme Toggle */}
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>

                        {/* Language Selector */}
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setLangMenuOpen(!langMenuOpen)}
                                className="flex items-center justify-center rounded-full hover:bg-[#151515] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                                style={{
                                    width: isPillMode ? '32px' : '40px',
                                    height: isPillMode ? '32px' : '40px',
                                }}
                            >
                                <span className="text-lg">{languages.find(l => l.code === currentLang)?.flag}</span>
                            </button>
                        </div>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center rounded-full hover:bg-[#151515] text-[#a1a1aa] hover:text-[#fafafa] transition-colors group"
                            style={{
                                width: isPillMode ? '32px' : '40px',
                                height: isPillMode ? '32px' : '40px',
                            }}
                        >
                            <ShoppingCart className="group-hover:scale-110 transition-transform" style={{ width: isPillMode ? 16 : 20, height: isPillMode ? 16 : 20 }} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#22c55e] text-[#0a0a0a] text-[10px] font-bold flex items-center justify-center ring-2 ring-[#0a0a0a] animate-pulse-glow">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth */}
                        <div className="hidden sm:flex items-center gap-2">
                            {status === "loading" ? (
                                <div className="w-20 h-8 skeleton rounded-full" />
                            ) : session ? (
                                <div className="flex items-center gap-2">
                                    <Link href="/dashboard">
                                        <div
                                            className="rounded-full bg-gradient-to-r from-[#22c55e] to-[#06b6d4] flex items-center justify-center text-[#0a0a0a] font-bold cursor-pointer"
                                            style={{
                                                width: isPillMode ? '32px' : '40px',
                                                height: isPillMode ? '32px' : '40px',
                                                fontSize: isPillMode ? '12px' : '14px',
                                            }}
                                        >
                                            {session.user.name?.charAt(0) || "U"}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => openAuth("register")}
                                    size="sm"
                                    className={`rounded-full shadow-lg shadow-[#22c55e]/20 ${isPillMode ? 'px-4 h-9' : 'px-6'}`}
                                    style={{
                                        fontSize: isPillMode ? '13px' : '14px',
                                        transition: smoothTransition
                                    }}
                                >
                                    Get Started
                                </Button>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex items-center justify-center rounded-full hover:bg-[#151515] text-[#a1a1aa] md:hidden"
                            style={{
                                width: isPillMode ? '32px' : '40px',
                                height: isPillMode ? '32px' : '40px',
                            }}
                        >
                            {mobileMenuOpen ? <X size={isPillMode ? 18 : 24} /> : <Menu size={isPillMode ? 18 : 24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute top-20 left-4 right-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#262626] rounded-2xl p-4 md:hidden animate-slide-up shadow-2xl pointer-events-auto">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 rounded-xl text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#151515] transition-colors font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="h-px bg-[#262626] my-2" />
                            {!session ? (
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="secondary" className="w-full justify-center" onClick={() => openAuth("login")}>Log in</Button>
                                    <Button className="w-full justify-center" onClick={() => openAuth("register")}>Sign Up</Button>
                                </div>
                            ) : (
                                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center gap-2">
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
