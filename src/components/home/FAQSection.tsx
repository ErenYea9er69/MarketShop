"use client"

import { useState } from "react"
import { Plus, Minus, HelpCircle, MessageCircle, Mail, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function FAQSection() {
    const { t, language } = useLanguage()
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    // Get FAQ questions from translations
    const getFAQs = () => {
        const questions = t("faq.questions")
        // If translations return the key, use fallback
        if (questions === "faq.questions") {
            return [
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
        }
        return []
    }

    // Import translations directly for FAQ questions
    const faqs = language === "en" ? [
        { question: "How do I receive my digital code?", answer: "Codes are delivered instantly to your email and dashboard account immediately after your payment is confirmed. No waiting times!" },
        { question: "Is it safe to buy from Kwaret?", answer: "Absolutely. We use secure 3rd-party payment gateways (Flouci, D17) and never store your sensitive payment information. We have served over 10,000 happy customers." },
        { question: "Can I get a refund if the code doesn't work?", answer: "In the rare case of an invalid code, our support team will verify with the provider and issue a replacement or refund immediately. Digital products are otherwise non-refundable once viewed." },
        { question: "Do you offer wholesale prices?", answer: "Yes! If you are a reseller or cyber café owner, please contact our support team to apply for a Merchant account with special rates." },
        { question: "Are the digital codes region-locked?", answer: "Yes, most codes are region-specific (e.g., Global, US, EU). Please check the product description carefully before purchasing to ensure it works for your account region." }
    ] : language === "fr" ? [
        { question: "Comment recevoir mon code numérique ?", answer: "Les codes sont livrés instantanément à votre email et compte tableau de bord immédiatement après confirmation du paiement. Pas de temps d'attente !" },
        { question: "Est-il sûr d'acheter chez Kwaret ?", answer: "Absolument. Nous utilisons des passerelles de paiement tierces sécurisées (Flouci, D17) et ne stockons jamais vos informations de paiement sensibles. Nous avons servi plus de 10 000 clients satisfaits." },
        { question: "Puis-je obtenir un remboursement si le code ne fonctionne pas ?", answer: "Dans le rare cas d'un code invalide, notre équipe support vérifiera avec le fournisseur et émettra un remplacement ou remboursement immédiatement. Les produits numériques ne sont autrement pas remboursables une fois consultés." },
        { question: "Proposez-vous des prix de gros ?", answer: "Oui ! Si vous êtes revendeur ou propriétaire de cyber café, veuillez contacter notre équipe support pour demander un compte Marchand avec des tarifs spéciaux." },
        { question: "Les codes numériques sont-ils verrouillés par région ?", answer: "Oui, la plupart des codes sont spécifiques à une région (ex: Global, US, EU). Veuillez vérifier attentivement la description du produit avant d'acheter pour vous assurer qu'il fonctionne pour la région de votre compte." }
    ] : [
        { question: "كيف أستلم الكود الرقمي؟", answer: "يتم تسليم الأكواد فوراً إلى بريدك الإلكتروني وحسابك بمجرد تأكيد الدفع. لا وقت للانتظار!" },
        { question: "هل الشراء من Kwaret آمن؟", answer: "بالتأكيد. نستخدم بوابات دفع آمنة (Flouci, D17) ولا نخزن معلومات الدفع الحساسة. لقد خدمنا أكثر من 10,000 عميل سعيد." },
        { question: "هل يمكنني استرداد المال إذا لم يعمل الكود؟", answer: "في الحالات النادرة لكود غير صالح، سيتحقق فريق الدعم مع المزود ويصدر بديلاً أو استرداداً فورياً. المنتجات الرقمية غير قابلة للاسترداد بمجرد عرضها." },
        { question: "هل تقدمون أسعار الجملة؟", answer: "نعم! إذا كنت بائعاً أو مالك مقهى إنترنت، يرجى الاتصال بفريق الدعم للتقدم لحساب تاجر بأسعار خاصة." },
        { question: "هل الأكواد الرقمية مقفلة حسب المنطقة؟", answer: "نعم، معظم الأكواد خاصة بمنطقة معينة (مثل: عالمي، أمريكي، أوروبي). يرجى التحقق من وصف المنتج بعناية قبل الشراء." }
    ]

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container w-[75%] max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
                    {/* Header Side */}
                    <div className="w-full md:w-5/12 sticky top-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider mb-6">
                            <HelpCircle className="w-4 h-4" />
                            <span>{t("faq.badge")}</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                            {t("faq.title1")} <br />
                            <span className="text-primary">{t("faq.title2")}</span>
                        </h2>

                        <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-sm">
                            {t("faq.subtitle")}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-card/40 border border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:bg-card/60 transition-colors">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">{t("faq.liveChat")}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t("faq.available247")}</div>
                                </div>
                            </div>
                            <div className="bg-card/40 border border-white/5 p-4 rounded-2xl flex flex-col gap-2 hover:bg-card/60 transition-colors">
                                <Mail className="w-5 h-5 text-primary" />
                                <div>
                                    <div className="text-sm font-bold text-foreground">{t("faq.emailUs")}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{t("faq.responseTime")}</div>
                                </div>
                            </div>
                        </div>

                        <button className="group w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-2">
                            <span>{t("faq.contactSupport")}</span>
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
