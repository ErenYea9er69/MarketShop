"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface HeroSectionProps {
    openAuth: () => void
}

export function HeroSection({ openAuth }: HeroSectionProps) {
    return (
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-background">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-secondary/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] bg-primary/15 rounded-full blur-[100px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0 dark:invert-0 invert" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-border backdrop-blur-md animate-slide-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">The #1 Marketplace in Tunisia</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground animate-slide-up" style={{ animationDelay: "100ms" }}>
                        Digital Products. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                            Instant Delivery.
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
                        Your one-stop shop for Gift Cards, Game Top-ups, and Software Subscriptions.
                        Secure payments via D17, Flouci, and Bank Transfer.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
                        <Button
                            size="lg"
                            onClick={openAuth}
                            className="w-full sm:w-auto px-8 h-14 rounded-2xl text-lg font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:bg-[length:200%_200%] animate-gradient"
                        >
                            Start Shopping
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Link href="/shop" className="w-full sm:w-auto">
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full h-14 rounded-2xl text-lg font-medium border-border hover:bg-accent text-foreground"
                            >
                                Browse Catalog
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
