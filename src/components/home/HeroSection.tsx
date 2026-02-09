"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useState, useEffect } from "react"

interface HeroSectionProps {
    openAuth: () => void
}

export function HeroSection({ openAuth }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0)

    const offers = [
        "/offer/1.jpg",
        "/offer/2.jpg",
        "/offer/3.jpg",
        "/offer/4.jpg",
        "/offer/5.jpg"
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % offers.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])
    return (
        <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-background">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] z-0 dark:invert-0 invert" />

            <div className="w-[80%] max-w-[1400px] mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start text-left space-y-6 max-w-xl">
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/50 border border-border backdrop-blur-md animate-slide-up">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">The #1 Marketplace in Tunisia</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground animate-slide-up leading-[1.1]" style={{ animationDelay: "100ms" }}>
                            Digital Products. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                Instant Delivery.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-slide-up" style={{ animationDelay: "200ms" }}>
                            Your one-stop shop for Gift Cards, Game Top-ups, and Software Subscriptions.
                            Secure payments via D17, Flouci, and Bank Transfer.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
                            <Button
                                size="lg"
                                onClick={openAuth}
                                className="w-full sm:w-auto px-8 h-12 rounded-2xl text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:bg-[length:200%_200%] animate-gradient"
                            >
                                Start Shopping
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Image Carousel */}
                    <div className="relative w-full aspect-square lg:h-[500px] flex items-center justify-center animate-slide-up" style={{ animationDelay: "300ms" }}>
                        <div className="relative w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-border/50 backdrop-blur-sm overflow-hidden group shadow-2xl">
                            {offers.map((src, index) => (
                                <div
                                    key={src}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                                        }`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Special Offer ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                    {/* Optional subtle gradient for text contrast if needed anywhere, otherwise clean */}
                                    <div className="absolute inset-0 bg-black/10" />
                                </div>
                            ))}

                            {/* Carousel Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {offers.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? "w-6 bg-primary shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                            : "w-1.5 bg-white/50 hover:bg-white/80"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Decorative floating elements */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-2xl blur-xl animate-pulse-glow" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
                    </div>

                </div>
            </div>
        </section>
    )
}
