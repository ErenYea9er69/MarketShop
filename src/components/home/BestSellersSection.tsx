"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function BestSellersSection() {
    return (
        <section className="pt-24 pb-32 relative overflow-hidden bg-background">
            {/* Background Elements */}
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Seamless Gradient Connection from Hero */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-primary/5 via-primary/5 to-transparent blur-3xl opacity-50" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-50" />

                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02] dark:invert-0 invert" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 relative z-10">
                            Selected for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">You</span>
                        </h2>
                        <p className="text-muted-foreground text-base max-w-md">
                            Top rated digital products chosen by our community this week.
                        </p>
                        {/* Decorative Background Text */}

                    </div>

                    <Link href="/shop">
                        <Button
                            variant="ghost"
                            className="rounded-full px-6 h-10 text-foreground hover:bg-accent border border-border hover:border-accent-foreground/20 transition-all group"
                        >
                            View Collection
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                        </Button>
                    </Link>
                </div>

                {/* Premium Product Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                            gradient: "from-[#EAB308]/20 to-[#EAB308]/5",
                            borderHover: "group-hover:border-[#EAB308]/50",
                            buttonGradient: "hover:from-[#EAB308] hover:to-amber-500",
                            glowInfo: "shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]"
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
                            className={`group relative bg-card rounded-[1.5rem] border border-border ${product.borderHover} overflow-hidden transition-all duration-500 hover:-translate-y-2`}
                        >
                            {/* Dynamic Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 p-6 flex flex-col h-full items-center text-center">

                                {/* Floating Icon with Glow */}
                                <div className={`w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${product.glowInfo}`}>
                                    <div className="absolute inset-0 rounded-2xl bg-background blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain relative z-10" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-2">
                                    <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">{product.type}</div>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-foreground/70 transition-colors">
                                        {product.name}
                                    </h3>
                                </div>

                                {/* Price & Action */}
                                <div className="mt-6 w-full space-y-3">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-2xl font-bold text-foreground">{product.price}</span>
                                        <span className="text-xs font-medium text-muted-foreground">{product.currency}</span>
                                    </div>

                                    <Button className={`w-full h-10 rounded-lg bg-accent border border-border text-foreground font-medium backdrop-blur-sm transition-all duration-300 ${product.buttonGradient} hover:border-transparent hover:text-white hover:shadow-lg relative overflow-hidden group/btn text-sm`}>
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Purchase Now
                                            <ArrowRight className="w-3 h-3 -translate-x-1 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all" />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
