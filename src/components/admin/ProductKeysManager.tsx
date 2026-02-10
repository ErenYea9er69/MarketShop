
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Key, Plus, Trash2, RefreshCw } from "lucide-react"

interface ProductKey {
    id: string
    value: string
    isUsed: boolean
    createdAt: string
}

interface ProductKeysManagerProps {
    productId: string
}

export function ProductKeysManager({ productId }: ProductKeysManagerProps) {
    const [keys, setKeys] = useState<ProductKey[]>([])
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [newKeys, setNewKeys] = useState("")

    const fetchKeys = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/admin/products/${productId}/keys`)
            if (res.ok) {
                const data = await res.json()
                setKeys(data)
            }
        } catch (error) {
            console.error("Failed to fetch keys", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchKeys()
    }, [productId])

    const handleAddKeys = async () => {
        if (!newKeys.trim()) return

        setAdding(true)
        try {
            const keysList = newKeys.split("\n").filter(k => k.trim())

            const res = await fetch(`/api/admin/products/${productId}/keys`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keys: keysList }),
            })

            if (res.ok) {
                setNewKeys("")
                fetchKeys()
            }
        } catch (error) {
            console.error("Failed to add keys", error)
        } finally {
            setAdding(false)
        }
    }

    const handleDeleteKey = async (keyId: string) => {
        if (!confirm("Are you sure you want to delete this key?")) return

        try {
            const res = await fetch(`/api/admin/products/${productId}/keys?keyId=${keyId}`, {
                method: "DELETE",
            })

            if (res.ok) {
                fetchKeys()
            }
        } catch (error) {
            console.error("Failed to delete key", error)
        }
    }

    const availableKeys = keys.filter(k => !k.isUsed).length
    const usedKeys = keys.filter(k => k.isUsed).length

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    Product Keys
                </h3>
                <div className="flex gap-4 text-sm">
                    <span className="text-emerald-500 font-medium">Available: {availableKeys}</span>
                    <span className="text-muted-foreground">Used: {usedKeys}</span>
                </div>
            </div>

            <div className="bg-card/30 border border-border/50 rounded-xl p-4 space-y-4">
                <textarea
                    value={newKeys}
                    onChange={(e) => setNewKeys(e.target.value)}
                    placeholder="Enter keys here (one per line)...&#10;For codes: AAAA-BBBB-CCCC&#10;For accounts: user@email.com:password123"
                    className="w-full h-32 bg-background border border-border rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="flex justify-end">
                    <Button
                        onClick={handleAddKeys}
                        disabled={adding || !newKeys.trim()}
                        className="bg-primary hover:opacity-90 text-primary-foreground"
                    >
                        {adding ? "Adding..." : (
                            <>
                                <Plus className="w-4 h-4 mr-2" />
                                Add {newKeys.split("\n").filter(k => k.trim()).length} Keys
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {loading ? (
                    <div className="text-center py-8 text-muted-foreground">Loading keys...</div>
                ) : keys.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No keys added yet.</div>
                ) : (
                    keys.map((key) => (
                        <div
                            key={key.id}
                            className={`p-3 rounded-lg border flex justify-between items-center group transition-colors ${key.isUsed
                                ? "bg-muted/30 border-border/30 opacity-60"
                                : "bg-card border-border hover:border-primary/20"
                                }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${key.isUsed ? "bg-muted-foreground" : "bg-emerald-500"}`} />
                                <code className="font-mono text-sm truncate max-w-[300px] text-foreground" title={key.value}>
                                    {key.value}
                                </code>
                                {key.isUsed && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Sold</span>}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-muted-foreground hidden sm:block">
                                    {new Date(key.createdAt).toLocaleDateString()}
                                </span>
                                {!key.isUsed && (
                                    <button
                                        onClick={() => handleDeleteKey(key.id)}
                                        className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        title="Delete key"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
