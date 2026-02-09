"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
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

        setLoading(true)

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
                router.push("/login?registered=true")
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md animate-slide-up">
                <Card className="border-[#262626]">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#EAB308] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#EAB308]/20">
                            <span className="text-black font-bold text-2xl">K</span>
                        </div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fafafa] to-[#a1a1aa]">Create Account</CardTitle>
                        <CardDescription>Join the trusted Tunisian marketplace</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a] group-focus-within:text-[#EAB308] transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 border-[#262626] focus:border-[#EAB308]/50 bg-[#151515] focus:bg-[#0a0a0a] transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a] group-focus-within:text-[#EAB308] transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 border-[#262626] focus:border-[#EAB308]/50 bg-[#151515] focus:bg-[#0a0a0a] transition-all"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a] group-focus-within:text-[#EAB308] transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 border-[#262626] focus:border-[#EAB308]/50 bg-[#151515] focus:bg-[#0a0a0a] transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717a] hover:text-[#fafafa] transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a] group-focus-within:text-[#EAB308] transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-10 border-[#262626] focus:border-[#EAB308]/50 bg-[#151515] focus:bg-[#0a0a0a] transition-all"
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-black font-bold hover:opacity-90 transition-opacity" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                        Creating account...
                                    </span>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-[#a1a1aa] text-sm">
                                Already have an account?{" "}
                                <Link href="/login" className="text-[#EAB308] hover:text-[#F59E0B] hover:underline font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
