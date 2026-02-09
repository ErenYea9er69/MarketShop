"use client"

import Link from "next/link"
import { Mail } from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider"

export function Footer() {
    const currentYear = new Date().getFullYear()
    const { t } = useLanguage()

    return (
        <footer className="border-t border-[#262626] bg-[#0a0a0a]">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#EAB308]/20">
                                <span className="text-black font-bold text-lg">K</span>
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fafafa] to-[#a1a1aa]">Kwaret</span>
                        </Link>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed">
                            {t("footer.description")}
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[#EAB308] font-bold mb-4">{t("footer.company")}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#faq" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.faq")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.contact")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-[#EAB308] font-bold mb-4">{t("footer.information")}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/shop" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.shop")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.privacyPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.refundPolicy")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.termsOfService")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[#EAB308] font-bold mb-4">{t("footer.services")}</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/shop?category=gift_cards" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.giftCards")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=subscriptions" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.subscriptions")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=product_keys" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.productKeys")}
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=top_ups" className="text-[#71717a] hover:text-[#EAB308] text-sm transition-colors">
                                    {t("footer.topUps")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#71717a] text-sm">
                        © {currentYear} Kwaret. {t("footer.allRightsReserved")}
                    </p>
                    <a
                        href="mailto:support@kwaret.shop"
                        className="flex items-center gap-2 text-[#71717a] hover:text-[#EAB308] text-sm transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        support@kwaret.shop
                    </a>
                </div>
            </div>
        </footer>
    )
}
