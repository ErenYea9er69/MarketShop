"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"

interface StockInputProps {
    initialStock?: number
}

export function StockInput({ initialStock = 0 }: StockInputProps) {
    const [isStocked, setIsStocked] = useState(initialStock > 0)
    const [stockValue, setStockValue] = useState(initialStock > 0 ? initialStock : 0)

    useEffect(() => {
        if (!isStocked) {
            setStockValue(0)
        } else if (stockValue === 0) {
            setStockValue(1) // Default to 1 when re-enabling if it was 0
        }
    }, [isStocked])

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="isStocked"
                    checked={isStocked}
                    onCheckedChange={(checked) => setIsStocked(checked as boolean)}
                />
                <Label htmlFor="isStocked" className="font-normal cursor-pointer">
                    Available in Stock
                </Label>
            </div>

            {isStocked ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="1"
                        value={stockValue}
                        onChange={(e) => setStockValue(parseInt(e.target.value) || 0)}
                        required
                    />
                </div>
            ) : (
                <div className="p-3 rounded-xl bg-secondary/50 border border-border text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-200">
                    Product is marked as <span className="font-medium text-foreground">Sold Out</span>.
                    <input type="hidden" name="stock" value="0" />
                </div>
            )}
        </div>
    )
}
