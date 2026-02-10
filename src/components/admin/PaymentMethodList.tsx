"use client"

import { useState } from "react"
import { type PaymentMethod } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Textarea } from "@/components/ui/Textarea"
import { Save, Loader2 } from "lucide-react"
import { updatePaymentMethod } from "@/app/actions/settings"

interface PaymentMethodListProps {
    methods: PaymentMethod[]
}

export function PaymentMethodList({ methods }: PaymentMethodListProps) {
    return (
        <div className="space-y-6">
            {methods.map((method) => (
                <PaymentMethodCard key={method.id} method={method} />
            ))}
        </div>
    )
}

function PaymentMethodCard({ method }: { method: PaymentMethod }) {
    const [loading, setLoading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [data, setData] = useState({
        displayName: method.displayName,
        details: method.details || "",
        displayAr: method.displayAr || "",
        displayFr: method.displayFr || "",
        active: method.active,
    })

    const handleChange = (field: keyof typeof data, value: string | boolean) => {
        setData((prev) => ({ ...prev, [field]: value }))
        setHasChanges(true)
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            await updatePaymentMethod(method.id, data)
            setHasChanges(false)
        } catch (error) {
            console.error(error)
            alert("Failed to save changes")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="border-[#262626] bg-[#151515]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    {method.name}
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${data.active ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                        {data.active ? "Active" : "Inactive"}
                    </span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id={`active-${method.id}`}
                        checked={data.active}
                        onCheckedChange={(checked) => handleChange("active", checked as boolean)}
                    />
                    <Label htmlFor={`active-${method.id}`} className="cursor-pointer">Enable</Label>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Display Name (English)</Label>
                        <Input
                            value={data.displayName}
                            onChange={(e) => handleChange("displayName", e.target.value)}
                            placeholder="e.g. Credit Card"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Display Name (Arabic)</Label>
                        <Input
                            value={data.displayAr}
                            onChange={(e) => handleChange("displayAr", e.target.value)}
                            className="text-right"
                            dir="rtl"
                            placeholder="e.g. بطاقة بنكية"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Display Name (French)</Label>
                        <Input
                            value={data.displayFr}
                            onChange={(e) => handleChange("displayFr", e.target.value)}
                            placeholder="e.g. Carte bancaire"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Payment Details / Instructions</Label>
                    <Textarea
                        value={data.details}
                        onChange={(e) => handleChange("details", e.target.value)}
                        placeholder="Enter wallet address, phone number, or payment instructions..."
                        rows={3}
                        className="font-mono text-sm"
                    />
                    <p className="text-xs text-[#a1a1aa]">
                        These details will be shown to the user when they select this payment method.
                    </p>
                </div>

                {hasChanges && (
                    <div className="flex justify-end pt-2 animate-in fade-in slide-in-from-top-1">
                        <Button onClick={handleSave} disabled={loading} size="sm">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
