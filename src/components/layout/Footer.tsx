import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-[#262626] bg-[#0a0a0a]">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#06b6d4] flex items-center justify-center">
                                <span className="text-[#0a0a0a] font-bold text-lg">K</span>
                            </div>
                            <span className="text-xl font-bold text-[#fafafa]">Kwaret</span>
                        </Link>
                        <p className="text-[#71717a] text-sm leading-relaxed">
                            Trusted marketplace for digital gift cards, subscriptions and services in Tunisia.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-[#fafafa] font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#faq" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h4 className="text-[#fafafa] font-semibold mb-4">Information</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/shop" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[#fafafa] font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/shop?category=gift_cards" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Gift Cards
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=subscriptions" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Subscriptions
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=product_keys" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Product Keys
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop?category=top_ups" className="text-[#71717a] hover:text-[#fafafa] text-sm transition-colors">
                                    Top Ups
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#71717a] text-sm">
                        © {currentYear} Kwaret. All rights reserved.
                    </p>
                    <a
                        href="mailto:support@kwaret.shop"
                        className="flex items-center gap-2 text-[#71717a] hover:text-[#22c55e] text-sm transition-colors"
                    >
                        <Mail className="w-4 h-4" />
                        support@kwaret.shop
                    </a>
                </div>
            </div>
        </footer>
    )
}
