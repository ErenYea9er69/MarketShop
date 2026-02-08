"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Check, Copy, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

const amounts = [10, 20, 50, 100, 200, 500]

const paymentMethods = [
    {
        id: "D17",
        name: "D17",
        icon: "📱",
        color: "#FF6B00",
        description: "Mobile Payment",
        details: "Send to: XX XXX XXX", // Admin will configure this
    },
    {
        id: "OOREDOO",
        name: "Ooredoo",
        icon: "📲",
        color: "#ED1C24",
        description: "Mobile Credit",
        details: "Transfer to: XX XXX XXX", // Admin will configure this
    },
    {
        id: "PAYPAL",
        name: "PayPal",
        icon: "💳",
        color: "#003087",
        description: "International",
        details: "Send to: email@example.com", // Admin will configure this
    },
    {
        id: "CRYPTO",
        name: "Crypto",
        icon: "₿",
        color: "#26A17B",
        description: "USDT (TRC20)",
        details: "Wallet: TXXXXXXXXXXXXXXXXXXXXXXX", // Admin will configure this
    },
    {
        id: "FLOUCI",
        name: "Flouci",
        icon: "💰",
        color: "#7C3AED",
        description: "Mobile Wallet",
        details: "Send to: XX XXX XXX", // Admin will configure this
    },
]

type Step = "amount" | "method" | "instructions" | "confirmation"

export default function TopUpPage() {
    const router = useRouter()
    const [step, setStep] = useState<Step>("amount")
    const [amount, setAmount] = useState<number>(0)
    const [customAmount, setCustomAmount] = useState("")
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)

    const selectedPaymentMethod = paymentMethods.find((m) => m.id === selectedMethod)

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
        setSelectedMethod(methodId)
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
                    method: selectedMethod,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Failed to create top-up request")
            } else {
                setStep("confirmation")
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
                <div className="max-w-2xl mx-auto">
                    {/* Back Link */}
                    <Link href="/dashboard/wallet" className="inline-flex items-center gap-2 text-[#a1a1aa] hover:text-[#fafafa] mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Wallet
                    </Link>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 mb-8">
                        {["amount", "method", "instructions", "confirmation"].map((s, i) => (
                            <div key={s} className="flex items-center gap-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === s
                                            ? "bg-gradient-to-r from-[#22c55e] to-[#06b6d4] text-[#0a0a0a]"
                                            : ["amount", "method", "instructions", "confirmation"].indexOf(step) > i
                                                ? "bg-[#22c55e] text-[#0a0a0a]"
                                                : "bg-[#151515] text-[#71717a]"
                                        }`}
                                >
                                    {["amount", "method", "instructions", "confirmation"].indexOf(step) > i ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                {i < 3 && <div className="w-8 h-0.5 bg-[#262626]" />}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Select Amount */}
                    {step === "amount" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Amount</CardTitle>
                                <CardDescription>Choose how much you want to add to your balance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {amounts.map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleAmountSelect(value)}
                                            className="p-4 rounded-xl bg-[#151515] border border-[#262626] hover:border-[#22c55e] hover:bg-[#22c55e]/10 transition-colors text-center"
                                        >
                                            <span className="text-2xl font-bold text-[#fafafa]">{value}</span>
                                            <span className="text-[#71717a] text-sm"> TND</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <Input
                                        type="number"
                                        placeholder="Custom amount (min 5 TND)"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        min={5}
                                    />
                                    <Button variant="secondary" onClick={handleCustomAmount} disabled={parseFloat(customAmount) < 5}>
                                        Continue
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 2: Select Payment Method */}
                    {step === "method" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Select Payment Method</CardTitle>
                                <CardDescription>
                                    Top up amount: <strong className="text-[#22c55e]">{amount} TND</strong>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => handleMethodSelect(method.id)}
                                            className="w-full p-4 rounded-xl bg-[#151515] border border-[#262626] hover:border-[#3a3a3a] transition-colors flex items-center gap-4 text-left"
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                                style={{ backgroundColor: `${method.color}20` }}
                                            >
                                                {method.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#fafafa]">{method.name}</p>
                                                <p className="text-sm text-[#71717a]">{method.description}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <Button variant="ghost" className="mt-4" onClick={() => setStep("amount")}>
                                    <ArrowLeft className="w-4 h-4" />
                                    Change Amount
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 3: Payment Instructions */}
                    {step === "instructions" && selectedPaymentMethod && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Instructions</CardTitle>
                                <CardDescription>
                                    Send <strong className="text-[#22c55e]">{amount} TND</strong> via{" "}
                                    <strong>{selectedPaymentMethod.name}</strong>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {error && (
                                    <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.1)] border border-[#ef4444]/30 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                                        <span className="text-[#ef4444]">{error}</span>
                                    </div>
                                )}

                                <div className="p-6 rounded-xl bg-[#151515] border border-[#262626]">
                                    <p className="text-[#71717a] text-sm mb-2">Send to:</p>
                                    <div className="flex items-center justify-between gap-4">
                                        <code className="text-lg font-mono text-[#fafafa]">{selectedPaymentMethod.details.split(": ")[1]}</code>
                                        <button
                                            onClick={() => handleCopy(selectedPaymentMethod.details.split(": ")[1])}
                                            className="p-2 rounded-lg hover:bg-[#262626] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                                        >
                                            {copied ? <Check className="w-5 h-5 text-[#22c55e]" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-[rgba(234,179,8,0.1)] border border-[#eab308]/30">
                                    <p className="text-[#eab308] text-sm">
                                        <strong>Important:</strong> After sending the payment, click the button below to notify us.
                                        Your balance will be updated once we verify the transaction (usually within 5-30 minutes).
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="secondary" onClick={() => setStep("method")}>
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button className="flex-1" onClick={handleConfirmPayment} disabled={loading}>
                                        {loading ? "Processing..." : "I have sent the payment"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Step 4: Confirmation */}
                    {step === "confirmation" && (
                        <Card className="text-center">
                            <CardContent className="py-12">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#22c55e]/20 flex items-center justify-center">
                                    <Check className="w-10 h-10 text-[#22c55e]" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#fafafa] mb-2">Request Submitted!</h2>
                                <p className="text-[#a1a1aa] mb-8 max-w-md mx-auto">
                                    We've received your top-up request for <strong className="text-[#22c55e]">{amount} TND</strong>.
                                    Your balance will be updated once we verify the transaction.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/dashboard/wallet">
                                        <Button variant="secondary">View Wallet</Button>
                                    </Link>
                                    <Link href="/shop">
                                        <Button>Continue Shopping</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
