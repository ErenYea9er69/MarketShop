"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star, Shield, Zap, Gift, Smartphone, Globe } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { AuthModal } from "@/components/auth/AuthModal"

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<"login" | "register">("register")

  const openAuth = () => {
    setAuthView("register")
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden selection:bg-[#22c55e]/30">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView={authView}
      />

      {/* Hero Section - Lifted by ~20% */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#22c55e]/10 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#06b6d4]/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-[#22c55e]/5 rounded-full blur-[100px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-slide-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
              </span>
              <span className="text-sm font-medium text-[#a1a1aa]">The #1 Marketplace in Tunisia</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white animate-slide-up" style={{ animationDelay: "100ms" }}>
              Digital Products. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#06b6d4]">
                Instant Delivery.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
              Your one-stop shop for Gift Cards, Game Top-ups, and Software Subscriptions.
              Secure payments via D17, Flouci, and Bank Transfer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <Button
                size="lg"
                onClick={openAuth}
                className="w-full sm:w-auto px-8 h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-[#22c55e] to-[#06b6d4] text-black hover:opacity-90 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all hover:bg-[length:200%_200%] animate-gradient"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Link href="/shop" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-14 rounded-2xl text-lg font-medium border-[#262626] hover:bg-[#151515] text-[#fafafa]"
                >
                  Browse Catalog
                </Button>
              </Link>
            </div>



          </div>
        </div>
      </section>

      {/* Best Sellers Section - Modern & Premium Redesign */}
      <section className="py-32 relative overflow-hidden bg-[#050505]">

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#06b6d4]/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: "2s" }} />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 relative z-10">
                Selected for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] to-[#06b6d4]">You</span>
              </h2>
              <p className="text-[#a1a1aa] text-lg max-w-md">
                Top rated digital products chosen by our community this week.
              </p>
              {/* Decorative Background Text */}
              <span className="absolute -top-12 -left-8 text-9xl font-bold text-white/[0.02] pointer-events-none select-none hidden md:block">
                BEST
              </span>
            </div>

            <Link href="/shop">
              <Button
                variant="ghost"
                className="rounded-full px-6 h-12 text-white hover:bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                View Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-[#22c55e]" />
              </Button>
            </Link>
          </div>

          {/* Premium Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Netflix Premium",
                type: "4K UHD • Private",
                price: "25.00",
                currency: "TND",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
                gradient: "from-red-600/20 to-red-900/5",
                borderHover: "group-hover:border-red-500/50",
                buttonGradient: "hover:from-red-600 hover:to-red-700",
                glowInfo: "shadow-[0_0_30px_-5px_rgba(220,38,38,0.3)]"
              },
              {
                name: "Spotify Premium",
                type: "Individual • Stable",
                price: "15.00",
                currency: "TND",
                image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
                gradient: "from-[#22c55e]/20 to-[#22c55e]/5",
                borderHover: "group-hover:border-[#22c55e]/50",
                buttonGradient: "hover:from-[#22c55e] hover:to-green-600",
                glowInfo: "shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
              },
              {
                name: "ChatGPT Plus",
                type: "GPT-4 • DALL-E 3",
                price: "65.00",
                currency: "TND",
                image: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
                gradient: "from-[#06b6d4]/20 to-[#06b6d4]/5",
                borderHover: "group-hover:border-[#06b6d4]/50",
                buttonGradient: "hover:from-[#06b6d4] hover:to-cyan-600",
                glowInfo: "shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
              }
            ].map((product, i) => (
              <div
                key={i}
                className={`group relative bg-[#0a0a0a] rounded-[2rem] border border-white/5 ${product.borderHover} overflow-hidden transition-all duration-500 hover:-translate-y-2`}
              >
                {/* Dynamic Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 p-8 flex flex-col h-full items-center text-center">

                  {/* Floating Icon with Glow */}
                  <div className={`w-24 h-24 rounded-3xl bg-[#111] border border-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${product.glowInfo}`}>
                    <div className="absolute inset-0 rounded-3xl bg-white/5 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-contain relative z-10" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="text-xs font-bold tracking-widest text-white/40 uppercase">{product.type}</div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price & Action */}
                  <div className="mt-8 w-full space-y-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-white">{product.price}</span>
                      <span className="text-sm font-medium text-white/50">{product.currency}</span>
                    </div>

                    <Button className={`w-full h-12 rounded-xl bg-white/5 border border-white/10 text-white font-medium backdrop-blur-sm transition-all duration-300 ${product.buttonGradient} hover:border-transparent hover:text-white hover:shadow-lg relative overflow-hidden group/btn`}>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Purchase Now
                        <ArrowRight className="w-4 h-4 -translate-x-1 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Strip */}
      <section className="py-8 border-y border-[#262626] bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {['Netflix', 'Spotify', 'PlayStation', 'Xbox', 'Steam', 'Free Fire', 'Roblox'].map((brand, i) => (
              <div key={i} className="px-5 py-2 rounded-full border border-white/5 bg-white/5 text-[#71717a] hover:text-[#fafafa] hover:border-white/20 transition-all cursor-pointer text-xs font-medium uppercase tracking-wide">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div >
  )
}
