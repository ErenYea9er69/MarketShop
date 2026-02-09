import NextAuth from "next-auth"
import { authConfig } from "@/lib/auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAdmin = req.auth?.user?.role === "ADMIN"
    const isAuthRoute = req.nextUrl.pathname.startsWith("/admin")

    if (isAuthRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/api/auth/signin", req.url))
        }
        if (!isAdmin) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    }
})

export const config = {
    matcher: ["/admin/:path*"],
}
