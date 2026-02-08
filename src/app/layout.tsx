import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { CartProvider } from "@/components/providers/CartProvider"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kwaret.shop – Trusted Tunisian Digital Marketplace",
  description: "Discover Tunisia's trusted marketplace for digital gift cards, subscriptions, and instant services with secure checkout and 24/7 local support.",
  keywords: ["digital marketplace", "gift cards", "subscriptions", "Tunisia", "IPTV", "Netflix", "Spotify", "ChatGPT"],
  openGraph: {
    title: "Kwaret.shop – Trusted Tunisian Digital Marketplace",
    description: "Discover Tunisia's trusted marketplace for digital gift cards, subscriptions, and instant services with secure checkout and 24/7 local support.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
