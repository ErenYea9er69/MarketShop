"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Upload, X, Image as ImageIcon } from "lucide-react"

interface ImageUploadProps {
    defaultValue?: string
    name: string
}

export function ImageUpload({ defaultValue = "", name }: ImageUploadProps) {
    const [preview, setPreview] = useState(defaultValue)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const formData = new FormData()
        formData.append("file", file)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            setPreview(data.url)
        } catch (error) {
            console.error("Upload error:", error)
            alert("Failed to upload image")
        } finally {
            setUploading(false)
        }
    }

    const handleRemove = () => {
        setPreview("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    return (
        <div className="space-y-4">
            <input type="hidden" name={name} value={preview} />

            {preview ? (
                <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-border bg-muted">
                    <img
                        src={preview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={handleRemove}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video w-full max-w-sm rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 bg-muted/5 flex flex-col items-center justify-center cursor-pointer transition-colors group"
                >
                    <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 mb-4 transition-colors">
                        <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF</p>
                </div>
            )}

            <div className="flex items-center gap-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!preview && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Select Image"}
                    </Button>
                )}

                {preview && (
                    <p className="text-xs text-muted-foreground break-all">
                        {preview}
                    </p>
                )}
            </div>
        </div>
    )
}
