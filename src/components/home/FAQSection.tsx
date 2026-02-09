"use client"

import { useState } from "react"
import { Plus, Minus, HelpCircle, MessageCircle, Mail, ArrowRight } from "lucide-react"

export function FAQSection() {
    const faqs = [
        {
            question: "How do I receive my digital code?",
            answer: "Codes are delivered instantly to your email and dashboard account immediately after your payment is confirmed. No waiting times!"
        },
        {
            question: "Is it safe to buy from Kwaret?",
            answer: "Absolutely. We use secure 3rd-party payment gateways (Flouci, D17) and never store your sensitive payment information. We have served over 10,000 happy customers."
        },
        {
            question: "Can I get a refund if the code doesn't work?",
            answer: "In the rare case of an invalid code, our support team will verify with the provider and issue a replacement or refund immediately. Digital products are otherwise non-refundable once viewed."
        },
        {
            question: "Do you offer wholesale prices?",
            answer: "Yes! If you are a reseller or cyber café owner, please contact our support team to apply for a Merchant account with special rates."
        },
        {
            question: "Are the digital codes region-locked?",
            answer: "Yes, most codes are region-specific (e.g., Global, US, EU). Please check the product description carefully before purchasing to ensure it works for your account region."
        }
    ]

    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container w-[75%] max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
                    {/* Header Side */}
                    <div className="w-full md:w-5/12 sticky top-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-6">
                            <HelpCircle className="w-4 h-4" />
                            <span>Support</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                            Have Questions? <br />
                            <span className="text-primary">We have answers.</span>
                        </h2>

                        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
                            Find everything you need to know about our services. Can't find what you're looking for?
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-card/40 border border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:bg-card/60 transition-colors">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">Live Chat</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Available 24/7</div>
                                </div>
                            </div>
                            <div className="bg-card/40 border border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:bg-card/60 transition-colors">
                                <Mail className="w-5 h-5 text-primary" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">Email Us</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Response &lt; 2h</div>
                                </div>
                            </div>
                        </div>

                        <button className="group w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2">
                            <span>Contact Support</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Accordion Side */}
                    <div className="w-full md:w-7/12 space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className={`group rounded-2xl border transition-all duration-300 ${openIndex === i
                                    ? "bg-card/50 border-primary/50 shadow-lg shadow-primary/5"
                                    : "bg-card/20 border-white/5 hover:border-white/10 hover:bg-card/30"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-bold transition-colors ${openIndex === i ? "text-primary" : "text-foreground group-hover:text-primary/80"
                                        }`}>
                                        {faq.question}
                                    </span>
                                    <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === i ? "bg-primary text-primary-foreground rotate-180" : "bg-white/5 text-muted-foreground group-hover:bg-white/10"
                                        }`}>
                                        {openIndex === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
        </section>
    )
}
