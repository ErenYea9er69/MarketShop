"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Gift, ArrowRight, Check, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

export default function RedeemPage() {
    const router = useRouter()
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState<{ amount: number } | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess(null)
        setLoading(true)

        try {
            const res = await fetch("/api/giftcards/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code.trim().toUpperCase() }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to redeem gift card")
            } else {
                setSuccess({ amount: data.amount })
                setCode("")
            }
        } catch {
            setError("An error occurred. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="py-12">
            <div className="container">
                <div className="max-w-md mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <Card>
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/20 flex items-center justify-center">
                                <Gift className="w-8 h-8 text-[#a855f7]" />
                            </div>
                            <CardTitle className="text-2xl">Redeem Gift Card</CardTitle>
                            <CardDescription>
                                Enter your gift card code to add balance to your wallet
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {success ? (
                                <div className="text-center py-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                                        <Check className="w-8 h-8 text-[#22c55e]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#fafafa] mb-2">Success!</h3>
                                    <p className="text-[#a1a1aa] mb-6">
                                        <strong className="text-[#22c55e]">{success.amount} TND</strong> has been added to your wallet
                                    </p>
                                    <div className="flex gap-4 justify-center">
                                        <Button variant="secondary" onClick={() => setSuccess(null)}>
                                            Redeem Another
                                        </Button>
                                        <Link href="/dashboard/wallet">
                                            <Button>
                                                View Wallet
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && (
                                        <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[#ef4444]/30 flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0" />
                                            <span className="text-[#ef4444] text-sm">{error}</span>
                                        </div>
                                    )}

                                    <Input
                                        type="text"
                                        placeholder="Enter gift card code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                                        className="text-center text-lg tracking-wider font-mono"
                                        required
                                    />

                                    <Button type="submit" className="w-full" disabled={loading || !code.trim()}>
                                        {loading ? (
                                            <span className="animate-pulse">Redeeming...</span>
                                        ) : (
                                            <>
                                                Redeem
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
