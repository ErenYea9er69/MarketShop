import type { NextAuthConfig } from "next-auth"

export const authConfig = {
    pages: {
        signIn: "/login",
        signOut: "/",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string
                token.role = (user as { role?: string }).role as string
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = (token.role as string) || "CLIENT"
            }
            return session
        }
    },
    providers: [], // Providers configured in auth.ts
} satisfies NextAuthConfig
