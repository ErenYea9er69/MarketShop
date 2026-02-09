"use client"

import Image from "next/image"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function PaymentMethodsSection() {
    const { t } = useLanguage()

    const methods = [
        {
            name: "Ooredoo",
            fee: "17%",
            image: "/pament/Ooredoo-Tunisie-Tribune-300.svg",
            color: "text-red-500",
            bg: "bg-white",
            border: "group-hover:border-red-500/50",
            description: "Mobile Balance",
        },
        {
            name: "D17",
            fee: "1%",
            image: "/pament/d17.svg",
            color: "text-yellow-500",
            bg: "bg-white",
            border: "group-hover:border-yellow-500/50",
            description: "La Poste Tunisienne",
        },
        {
            name: "PayPal",
            fee: "0%",
            image: "/pament/PayPal_Logo2014.svg.svg",
            color: "text-blue-500",
            bg: "bg-white",
            border: "group-hover:border-blue-500/50",
            description: "International Payments",
        },
        {
            name: "Cryptocurrency",
            fee: "Network Fees",
            image: "/pament/Bitcoin.svg.svg",
            color: "text-orange-500",
            bg: "bg-white",
            border: "group-hover:border-orange-500/50",
            description: "USDT, BTC, ETH",
        },
        {
            name: "Flouci",
            fee: "Standard Fees",
            image: "/pament/flouci.svg",
            color: "text-emerald-500",
            bg: "bg-white",
            border: "group-hover:border-emerald-500/50",
            description: "Mobile Wallet",
        },
    ]

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container w-[75%] max-w-[1400px] mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        {t("payment.title")}
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t("payment.subtitle")}
                    </p>
                </div>

                <div className="bg-card/20 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-4 md:p-6 shadow-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {methods.map((method, i) => (
                            <div
                                key={i}
                                className={`aspect-square relative flex flex-col items-center justify-between p-4 rounded-[2rem] bg-card/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all duration-300 group ${method.border} hover:-translate-y-1`}
                            >
                                <div className="flex-1 flex flex-col items-center justify-center w-full">
                                    <div className={`w-12 h-12 rounded-2xl ${method.bg} flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                                        <div className="relative w-7 h-7">
                                            <Image
                                                src={method.image}
                                                alt={method.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-sm font-bold text-foreground text-center leading-tight">{method.name}</h3>
                                    <p className="text-muted-foreground text-[9px] uppercase tracking-wider font-medium mt-1 text-center opacity-80">{method.description}</p>
                                </div>

                                <div className="w-full pt-3 border-t border-dashed border-white/10 flex flex-col items-center justify-center h-[40px]">
                                    <span className="text-[9px] font-medium text-muted-foreground/50 uppercase tracking-wider mb-0.5">Fees</span>
                                    <span className={`font-black ${method.color} text-center leading-none ${method.fee.includes('%') ? 'text-2xl' : 'text-[10px] uppercase tracking-wide'}`}>
                                        {method.fee}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
