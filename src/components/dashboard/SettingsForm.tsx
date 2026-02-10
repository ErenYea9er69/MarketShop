"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Loader2, Save } from "lucide-react"

interface SettingsFormProps {
    user: {
        name: string | null
        email: string | null
    }
}

export function SettingsForm({ user }: SettingsFormProps) {
    const router = useRouter()
    const { update } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)

    const [formData, setFormData] = useState({
        name: user.name || "",
        password: "",
        confirmPassword: ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" })
            setIsLoading(false)
            return
        }

        try {
            const res = await fetch("/api/user/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    password: formData.password || undefined
                })
            })

            if (!res.ok) {
                const text = await res.text()
                throw new Error(text)
            }

            await update({ name: formData.name })
            setMessage({ type: "success", text: "Profile updated successfully" })
            setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }))
            router.refresh()
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "Something went wrong" })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="text-foreground">Profile Information</CardTitle>
                    <CardDescription className="text-muted-foreground">Update your display name and password preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {message && (
                        <div className={`p-4 rounded-xl text-sm flex items-center gap-2 ${message.type === "success"
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-red-500/10 text-red-500 border border-red-500/20"
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${message.type === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <Input
                            value={user.email || ""}
                            disabled
                            className="bg-muted/30 border-border/50 text-muted-foreground cursor-not-allowed opacity-70"
                        />
                        <p className="text-xs text-muted-foreground/60">Email address cannot be changed for security reasons.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Display Name</label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 focus:ring-primary/20 transition-all"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="pt-6 border-t border-border/50">
                        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-primary rounded-full" />
                            Change Password
                        </h3>
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">New Password</label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 focus:ring-primary/20 transition-all font-mono"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground">Confirm New Password</label>
                                <Input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className="bg-background/50 border-border/50 text-foreground focus:border-primary/50 focus:ring-primary/20 transition-all font-mono"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
