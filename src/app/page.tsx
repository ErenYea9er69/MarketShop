"use client"

import { useState } from "react"
import { AuthModal } from "@/components/auth/AuthModal"
import { HeroSection } from "@/components/home/HeroSection"
import { BestSellersSection } from "@/components/home/BestSellersSection"
import { FeaturedCategories } from "@/components/home/FeaturedCategories"

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

      <HeroSection openAuth={openAuth} />

      <BestSellersSection />

      <FeaturedCategories />
    </div>
  )
}
