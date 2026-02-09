"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Github } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

import { useLanguage } from "@/components/providers/LanguageProvider"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultView?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
    const router = useRouter()
    const { t } = useLanguage()
    const [view, setView] = useState<"login" | "register">(defaultView)
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")

    // Form states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    if (!isOpen) return null

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Invalid email or password")
            } else {
                router.refresh()
                onClose()
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Registration failed")
            } else {
                setView("login")
                setError("Account created! Please sign in.")
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl h-[600px] bg-[#0a0a0a] rounded-[32px] border border-[#262626] shadow-2xl flex overflow-hidden animate-slide-up">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-[#a1a1aa] hover:text-[#fafafa] transition-colors backdrop-blur-md"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-10 bg-[#0a0a0a]">
                    <div className="max-w-sm mx-auto w-full">
                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-3xl font-bold mb-2 text-[#fafafa]">
                                {view === "login" ? t("auth.welcomeBack") : t("auth.createAccount")}
                            </h2>
                            <p className="text-[#a1a1aa]">
                                {view === "login"
                                    ? t("auth.enterDetails")
                                    : t("auth.joinMarketplace")}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 rounded-xl bg-white text-black hover:bg-gray-100 border-none font-medium flex items-center justify-center gap-3 transition-colors"
                                onClick={() => signIn("google")}
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                {t("auth.continueGoogle")}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#262626]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#0a0a0a] px-2 text-[#71717a]">{t("auth.orContinueEmail")}</span>
                                </div>
                            </div>

                            <form onSubmit={view === "login" ? handleLogin : handleRegister} className="space-y-4">
                                {view === "register" && (
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa] group-focus-within:text-[#22c55e] transition-colors" />
                                        <Input
                                            placeholder={t("auth.fullName")}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="pl-12 h-12 rounded-xl bg-[#151515] border-[#262626] focus:border-[#22c55e] transition-all"
                                            required
                                        />
                                    </div>
                                )}

                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa] group-focus-within:text-[#22c55e] transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder={t("auth.email")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-12 h-12 rounded-xl bg-[#151515] border-[#262626] focus:border-[#22c55e] transition-all"
                                        required
                                    />
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa] group-focus-within:text-[#22c55e] transition-colors" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder={t("auth.password")}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-12 h-12 rounded-xl bg-[#151515] border-[#262626] focus:border-[#22c55e] transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {view === "register" && (
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa] group-focus-within:text-[#22c55e] transition-colors" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("auth.confirmPassword")}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="pl-12 h-12 rounded-xl bg-[#151515] border-[#262626] focus:border-[#22c55e] transition-all"
                                            required
                                        />
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-12 rounded-xl text-base font-medium shadow-lg shadow-[#22c55e]/20 hover:shadow-[#22c55e]/40 transition-shadow"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {t("auth.processing")}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            {view === "login" ? t("auth.signIn") : t("auth.createAccount")}
                                            <ArrowRight className="w-5 h-5" />
                                        </span>
                                    )}
                                </Button>
                            </form>

                            <div className="mt-8 text-center space-y-4">
                                <p className="text-[#71717a] text-sm">
                                    {view === "login" ? t("auth.dontHaveAccount") : t("auth.alreadyHaveAccount")}{" "}
                                    <button
                                        onClick={() => {
                                            setView(view === "login" ? "register" : "login")
                                            setError("")
                                        }}
                                        className="text-[#22c55e] hover:text-[#4ade80] font-semibold hover:underline transition-colors"
                                    >
                                        {view === "login" ? t("auth.signUpNow") : t("auth.signIn")}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className="hidden lg:flex w-1/2 relative bg-[#050505] items-center justify-center overflow-hidden">
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse-glow" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#06b6d4]/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 animate-pulse-glow" style={{ animationDelay: "1s" }} />

                    {/* Glass Card Visual */}
                    <div className="relative z-10 w-80 aspect-[3/4] rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between transform rotate-[-6deg] hover:rotate-0 transition-transform duration-500 hover:scale-105">
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center">
                                <span className="text-xl font-bold text-black">K</span>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white/80">
                                {t("auth.protected")}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                            <div className="h-24 w-full bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 rounded-2xl border border-white/5 backdrop-blur-md flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#06b6d4]">
                                        {t("auth.secure")}
                                    </div>
                                    <div className="text-xs text-white/50">{t("auth.encrypted")}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-[#151515] rounded-2xl border border-[#262626] shadow-xl flex items-center justify-center animate-bounce duration-[3000ms]">
                        <Lock className="w-6 h-6 text-[#22c55e]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
