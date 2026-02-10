
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Limit file size to 2MB to prevent large DB payloads
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ error: "File too large. Max 2MB." }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        // Convert to Base64 Data URI
        const mimeType = file.type || 'application/octet-stream'
        const base64Data = `data:${mimeType};base64,${buffer.toString('base64')}`

        // Return the Data URI as the "url"
        return NextResponse.json({ url: base64Data })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
