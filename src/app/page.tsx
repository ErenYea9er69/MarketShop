"use client"

import { useState } from "react"
import { AuthModal } from "@/components/auth/AuthModal"
import { HeroSection } from "@/components/home/HeroSection"
import { BestSellersSection } from "@/components/home/BestSellersSection"
import { PaymentMethodsSection } from "@/components/home/PaymentMethodsSection"

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authView, setAuthView] = useState<"login" | "register">("register")

  const openAuth = () => {
    setAuthView("register")
    setAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultView={authView}
      />

      <HeroSection openAuth={openAuth} />

      <BestSellersSection />

      <PaymentMethodsSection />
    </div>
  )
}
