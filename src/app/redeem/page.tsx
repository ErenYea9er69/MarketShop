"use client"

import { useState } from "react"
import Link from "next/link"
import { Gift, ArrowRight, Check, AlertCircle, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useLanguage } from "@/components/providers/LanguageProvider"

export default function RedeemPage() {
    const { t } = useLanguage()
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
                setError(data.error || t("redeem.error"))
            } else {
                setSuccess({ amount: data.amount })
                setCode("")
            }
        } catch {
            setError(t("redeem.genericError"))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-32">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container relative z-10 max-w-lg mx-auto px-4">
                <div className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        {t("redeem.backTohome")}
                    </Link>
                </div>

                <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                    {/* Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shadow-lg shadow-primary/10 group-hover:scale-110 transition-transform duration-500">
                                <Gift className="w-10 h-10 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-2">
                                {t("redeem.title")}
                            </h1>
                            <p className="text-muted-foreground">
                                {t("redeem.description")}
                            </p>
                        </div>

                        {success ? (
                            <div className="text-center py-6 animate-fade-in">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center ring-4 ring-emerald-500/5">
                                    <Check className="w-8 h-8 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">{t("redeem.success")}</h3>
                                <p className="text-muted-foreground mb-8">
                                    <span className="text-emerald-500 font-bold text-lg">{success.amount} TND</span> {t("redeem.successMessage").replace("{amount}", "")}
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setSuccess(null)}
                                        className="w-full h-12 rounded-xl"
                                    >
                                        {t("redeem.redeemAnother")}
                                    </Button>
                                    <Link href="/dashboard/wallet" className="block w-full">
                                        <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                                            {t("redeem.viewWallet")}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-shake">
                                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        <span className="text-red-500 text-sm font-medium">{error}</span>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder={t("redeem.placeholder")}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                                            className="text-center text-2xl tracking-[0.2em] font-mono h-16 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all uppercase placeholder:tracking-normal placeholder:font-sans"
                                            required
                                        />
                                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent pointer-events-none group-focus-within:ring-primary/50" />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 text-lg rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-primary/20"
                                    disabled={loading || !code.trim()}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            {t("redeem.redeeming")}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            {t("redeem.submit")}
                                            <Sparkles className="w-5 h-5" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
