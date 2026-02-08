"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Github } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
    defaultView?: "login" | "register"
}

export function AuthModal({ isOpen, onClose, defaultView = "login" }: AuthModalProps) {
    const router = useRouter()
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
                                {view === "login" ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p className="text-[#a1a1aa]">
                                {view === "login"
                                    ? "Enter your details to access your wallet"
                                    : "Join Tunisia's most trusted marketplace"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={view === "login" ? handleLogin : handleRegister} className="space-y-4">
                            {view === "register" && (
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a1a1aa] group-focus-within:text-[#22c55e] transition-colors" />
                                    <Input
                                        placeholder="Full Name"
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
                                    placeholder="Email Address"
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
                                    placeholder="Password"
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
                                        placeholder="Confirm Password"
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
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {view === "login" ? "Sign In" : "Create Account"}
                                        <ArrowRight className="w-5 h-5" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 text-center space-y-4">
                            <p className="text-[#71717a] text-sm">
                                {view === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button
                                    onClick={() => {
                                        setView(view === "login" ? "register" : "login")
                                        setError("")
                                    }}
                                    className="text-[#22c55e] hover:text-[#4ade80] font-semibold hover:underline transition-colors"
                                >
                                    {view === "login" ? "Sign up now" : "Sign in"}
                                </button>
                            </p>
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
                                Protected
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                            <div className="h-24 w-full bg-gradient-to-br from-[#22c55e]/20 to-[#06b6d4]/20 rounded-2xl border border-white/5 backdrop-blur-md flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#22c55e] to-[#06b6d4]">
                                        Secure
                                    </div>
                                    <div className="text-xs text-white/50">Encrypted Transactions</div>
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
