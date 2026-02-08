"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface TransactionActionsProps {
    transactionId: string
    userId: string
    amount: number
}

export function TransactionActions({ transactionId, userId, amount }: TransactionActionsProps) {
    const router = useRouter()
    const [loading, setLoading] = useState<"approve" | "reject" | null>(null)

    const handleAction = async (action: "approve" | "reject") => {
        setLoading(action)

        try {
            const res = await fetch("/api/admin/transactions/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    transactionId,
                    userId,
                    amount,
                    action,
                }),
            })

            if (res.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error("Error updating transaction:", error)
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                size="sm"
                onClick={() => handleAction("approve")}
                disabled={loading !== null}
            >
                {loading === "approve" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Check className="w-4 h-4" />
                )}
                Approve
            </Button>
            <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction("reject")}
                disabled={loading !== null}
            >
                {loading === "reject" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <X className="w-4 h-4" />
                )}
                Reject
            </Button>
        </div>
    )
}
