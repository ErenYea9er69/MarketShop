"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, AlertCircle, Sparkles, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useLanguage } from "@/components/providers/LanguageProvider"
import { type PaymentMethod } from "@prisma/client"

const amounts = [10, 20, 50, 100, 200, 500]

// Static assets mapping based on payment method name
const STATIC_ASSETS: Record<string, { image: string, color: string, description: string }> = {
    D17: {
        image: "/pament/d17.svg",
        color: "#FF6B00",
        description: "Mobile Payment",
    },
    OOREDOO: {
        image: "/pament/Ooredoo-Tunisie-Tribune-300.svg",
        color: "#ED1C24",
        description: "Mobile Credit",
    },
    PAYPAL: {
        image: "/pament/PayPal_Logo2014.svg.svg",
        color: "#003087",
        description: "International",
    },
    CRYPTO: {
        image: "/pament/Bitcoin.svg.svg",
        color: "#26A17B",
        description: "USDT (TRC20)",
    },
    FLOUCI: {
        image: "/pament/flouci.svg",
        color: "#7C3AED",
        description: "Mobile Wallet",
    },
}

type Step = "amount" | "method" | "instructions" | "confirmation"

interface TopUpClientProps {
    methods: PaymentMethod[]
}

export function TopUpClient({ methods }: TopUpClientProps) {
    const { t } = useLanguage()
    const [step, setStep] = useState<Step>("amount")
    const [amount, setAmount] = useState<number>(0)
    const [customAmount, setCustomAmount] = useState("")
    const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)
    const [proofUrl, setProofUrl] = useState<string | null>(null)

    // Merge dynamic data with static assets
    const enrichedMethods = methods.map(m => ({
        ...m,
        ...STATIC_ASSETS[m.name] || {
            image: "/placeholder.svg",
            color: "#888888",
            description: "Payment Method"
        }
    }))

    const selectedMethod = enrichedMethods.find((m) => m.id === selectedMethodId)

    const handleAmountSelect = (value: number) => {
        setAmount(value)
        setCustomAmount("")
        setStep("method")
    }

    const handleCustomAmount = () => {
        const value = parseFloat(customAmount)
        if (value >= 5) {
            setAmount(value)
            setStep("method")
        }
    }

    const handleMethodSelect = (methodId: string) => {
        setSelectedMethodId(methodId)
        setStep("instructions")
    }

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleConfirmPayment = async () => {
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/transactions/topup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    method: selectedMethod?.name,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || t("topup.error"))
            } else {
                setStep("confirmation")
            }
        } catch {
            setError(t("topup.genericError"))
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

            <div className="container relative z-10 max-w-2xl mx-auto px-4">
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
                                <CreditCard className="w-10 h-10 text-primary" />
                            </div>
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-2">
                                {t("topup.title")}
                            </h1>
                            <p className="text-muted-foreground">
                                {t("topup.description")}
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <div className="flex items-center justify-center gap-2 mb-10">
                            {["amount", "method", "instructions", "confirmation"].map((s, i) => (
                                <div key={s} className="flex items-center gap-2">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step === s
                                            ? "bg-primary text-primary-foreground scale-110 ring-4 ring-primary/20"
                                            : ["amount", "method", "instructions", "confirmation"].indexOf(step) > i
                                                ? "bg-primary/20 text-primary"
                                                : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {["amount", "method", "instructions", "confirmation"].indexOf(step) > i ? (
                                            <Check className="w-4 h-4" />
                                        ) : (
                                            i + 1
                                        )}
                                    </div>
                                    {i < 3 && <div className={`w-8 h-0.5 transition-colors ${["amount", "method", "instructions", "confirmation"].indexOf(step) > i ? "bg-primary/50" : "bg-muted"}`} />}
                                </div>
                            ))}
                        </div>

                        {/* Step 1: Select Amount */}
                        {step === "amount" && (
                            <div className="animate-fade-in">
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {amounts.map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleAmountSelect(value)}
                                            className="p-4 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all text-center group/btn"
                                        >
                                            <span className="text-2xl font-bold text-foreground group-hover/btn:text-primary transition-colors">{value}</span>
                                            <span className="text-muted-foreground text-sm ml-1">TND</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <Input
                                            type="number"
                                            placeholder={t("topup.customAmountPlaceholder")}
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            min={5}
                                            className="h-12 rounded-xl border-border/50 bg-background/50 focus:bg-background transition-all"
                                        />
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-muted-foreground text-sm">TND</div>
                                    </div>
                                    <Button
                                        onClick={handleCustomAmount}
                                        disabled={parseFloat(customAmount) < 5}
                                        className="h-12 px-6 rounded-xl"
                                    >
                                        {t("topup.continue")}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 text-center">{t("topup.minAmount")}</p>
                            </div>
                        )}

                        {/* Step 2: Select Payment Method */}
                        {step === "method" && (
                            <div className="space-y-3 animate-fade-in">
                                <Button
                                    variant="ghost"
                                    className="mb-2 p-0 h-auto hover:bg-transparent hover:text-primary transition-colors flex items-center gap-2 text-muted-foreground"
                                    onClick={() => setStep("amount")}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    {t("topup.changeAmount")}
                                </Button>

                                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6 text-center">
                                    <span className="text-muted-foreground">{t("topup.selectedAmount")}: </span>
                                    <strong className="text-primary text-xl">{amount} TND</strong>
                                </div>

                                {enrichedMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => handleMethodSelect(method.id)}
                                        className="w-full p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-muted/50 transition-all flex items-center gap-4 text-left group/item"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center p-2 transition-transform group-hover/item:scale-110 bg-white"
                                        >
                                            <img
                                                src={method.image}
                                                alt={method.displayName}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-foreground">{method.displayName || method.name}</p>
                                                <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 opacity-0 group-hover/item:opacity-100 transition-all -translate-x-2 group-hover/item:translate-x-0" />
                                            </div>
                                            <p className="text-sm text-muted-foreground">{method.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Step 3: Payment Instructions */}
                        {step === "instructions" && selectedMethod && (
                            <div className="space-y-6 animate-fade-in">
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-shake">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-red-500">{error}</span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <p className="text-muted-foreground">{t("topup.sendInstruction")} <strong className="text-primary">{amount} TND</strong> {t("topup.via")} <strong>{selectedMethod.displayName || selectedMethod.name}</strong></p>
                                </div>

                                <div className="p-6 rounded-xl bg-muted/30 border border-border relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 w-32 h-32 pointer-events-none grayscale">
                                        <img
                                            src={selectedMethod.image}
                                            alt={selectedMethod.displayName}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-2">{t("topup.sendTo")}:</p>
                                    <div className="flex items-center justify-between gap-4 bg-background p-3 rounded-lg border border-border/50">
                                        <code className="text-lg font-mono text-foreground break-all">
                                            {selectedMethod.details || "No details available"}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(selectedMethod.details || "")}
                                            className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {selectedMethod.details && (
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {selectedMethod.name === "D17" && "Open D17 app and send money to this number"}
                                            {selectedMethod.name === "FLOUCI" && "Send to this wallet address / number"}
                                            {selectedMethod.name === "CRYPTO" && "Send USDT (TRC20) to this address"}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Transaction Reference (Optional)</label>
                                        <Input
                                            placeholder="e.g. Transaction ID, Sender Name..."
                                            className="bg-background/50"
                                            onChange={(e) => {
                                                // Optional: handle reference state if needed
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Proof of Payment (Screenshot)</label>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            className="bg-background/50 cursor-pointer file:cursor-pointer file:text-primary file:font-medium"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0]
                                                if (file) {
                                                    setLoading(true)
                                                    const formData = new FormData()
                                                    formData.append("file", file)
                                                    try {
                                                        const res = await fetch("/api/upload", {
                                                            method: "POST",
                                                            body: formData,
                                                        })
                                                        const data = await res.json()
                                                        if (data.url) {
                                                            setProofUrl(data.url)
                                                        }
                                                    } catch (err) {
                                                        console.error("Upload failed", err)
                                                    } finally {
                                                        setLoading(false)
                                                    }
                                                }
                                            }}
                                        />
                                        <p className="text-xs text-muted-foreground">Upload a screenshot of your successful payment</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                    <p className="text-yellow-500 text-sm flex gap-2">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>
                                            <strong>{t("topup.important")}:</strong> {t("topup.importantMessage")}
                                        </span>
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setStep("method")} className="h-12 w-1/3">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        {t("topup.back")}
                                    </Button>
                                    <Button
                                        className="flex-1 h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/20"
                                        onClick={async () => {
                                            setLoading(true)
                                            setError("")
                                            try {
                                                const res = await fetch("/api/transactions/topup", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({
                                                        amount,
                                                        method: selectedMethod?.name,
                                                        proof: proofUrl,
                                                    }),
                                                })
                                                const data = await res.json()
                                                if (!res.ok) {
                                                    setError(data.error || t("topup.error"))
                                                } else {
                                                    setStep("confirmation")
                                                }
                                            } catch {
                                                setError(t("topup.genericError"))
                                            } finally {
                                                setLoading(false)
                                            }
                                        }}
                                        disabled={loading || !proofUrl}
                                        title={!proofUrl ? "Please upload proof of payment first" : ""}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                {t("redeem.redeeming")}
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                {t("topup.confirmSent")}
                                                <Sparkles className="w-4 h-4" />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Confirmation */}
                        {step === "confirmation" && (
                            <div className="text-center py-6 animate-fade-in">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 flex items-center justify-center ring-4 ring-emerald-500/5">
                                    <Check className="w-10 h-10 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 mb-2">{t("topup.successTitle")}</h2>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    {t("topup.successMessage")} <strong className="text-emerald-500">{amount} TND</strong>.
                                    {t("topup.successSubMessage")}
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/dashboard/wallet">
                                        <Button variant="outline" className="h-12 px-6 rounded-xl">
                                            {t("redeem.viewWallet")}
                                        </Button>
                                    </Link>
                                    <Link href="/shop">
                                        <Button className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                                            {t("redeem.backTohome")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
