import Link from "next/link"
import { ArrowRight, Zap, Shield, Headphones, CheckCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

// Payment method icons
const paymentMethods = [
  { name: "D17", label: "D17", color: "#FF6B00" },
  { name: "Ooredoo", label: "Mobile Credit", color: "#ED1C24" },
  { name: "PayPal", label: "International", color: "#003087" },
  { name: "Crypto", label: "USDT", color: "#26A17B" },
  { name: "Flouci", label: "Mobile Wallet", color: "#7C3AED" },
]

// Featured products with better images/gradients
const featuredProducts = [
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    price: 65,
    originalPrice: 75,
    category: "AI Tools",
    gradient: "from-[#10a37f] to-[#0d8266]",
    tag: "Best Seller"
  },
  {
    id: "netflix-profile",
    name: "Netflix Profile",
    price: 25,
    originalPrice: 35,
    category: "Streaming",
    gradient: "from-[#e50914] to-[#b20710]",
    tag: "Hot"
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    price: 20,
    originalPrice: 25,
    category: "Music",
    gradient: "from-[#1db954] to-[#169c46]",
    tag: "Instant"
  },
]

const features = [
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Codes delivered to your inbox in seconds, 24/7 automated system.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Bank-grade encryption for all transactions. Your data is never shared.",
  },
  {
    icon: Headphones,
    title: "Local Support",
    description: "Tunisian support team ready to help via WhatsApp and email.",
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1000px] bg-gradient-to-b from-[#22c55e]/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#06b6d4]/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-[#22c55e]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151515] border border-[#262626] mb-8 animate-slide-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
              </span>
              <span className="text-xs font-medium text-[#a1a1aa]">Trusted by 10,000+ Tunisians</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              The Premium Marketplace for <br />
              <span className="gradient-text text-glow">Digital Goods</span>
            </h1>

            <p className="text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Instant access to global subscriptions, gift cards, and software keys.
              Pay securely with your favorite local methods.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/shop">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-shadow">
                  Browse Store
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="lg" className="h-14 px-8 text-lg rounded-full bg-[#151515] hover:bg-[#202020] border-transparent">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Trust Strip */}
      <div className="border-y border-[#262626] bg-[#0a0a0a]/50 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center md:justify-between py-8 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#151515] flex items-center justify-center border border-[#262626]">
                  <feature.icon className="w-6 h-6 text-[#22c55e]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#fafafa]">{feature.title}</h3>
                  <p className="text-sm text-[#71717a] max-w-[200px]">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-[#a1a1aa]">Top rated products this week</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-[#22c55e] hover:text-[#06b6d4] transition-colors font-medium group">
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="group relative bg-[#151515] rounded-3xl border border-[#262626] overflow-hidden hover:border-[#3a3a3a] transition-all duration-300 hover:shadow-2xl hover:shadow-[#22c55e]/10">
                  {/* Image/Gradient Area */}
                  <div className={`aspect-[4/3] bg-gradient-to-br ${product.gradient} relative overflow-hidden p-8 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500`}>
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                        {product.category}
                      </span>
                      {product.tag && (
                        <span className="px-3 py-1 bg-[#fafafa] text-[#0a0a0a] rounded-full text-xs font-bold shadow-lg">
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-white">
                      <h3 className="text-3xl font-bold mb-1 drop-shadow-lg">{product.name.charAt(0)}</h3>
                      <p className="font-medium opacity-90">{product.name}</p>
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#fafafa] mb-1 group-hover:text-[#22c55e] transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="w-3 h-3 text-[#eab308] fill-[#eab308]" />
                          ))}
                          <span className="text-xs text-[#71717a] ml-1">(4.9)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#fafafa]">{product.price} TND</p>
                        {product.originalPrice && (
                          <p className="text-sm text-[#71717a] line-through">{product.originalPrice} TND</p>
                        )}
                      </div>
                    </div>

                    <Button className="w-full rounded-xl bg-[#262626] hover:bg-[#22c55e] hover:text-[#0a0a0a] border-transparent text-[#fafafa] transition-all duration-300">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop">
              <Button variant="secondary" className="w-full">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-24 bg-[#111]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Flexible <span className="gradient-text">Payments</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-xl mx-auto">
              We accept all major Tunisian payment methods. Secure, fast, and verify instantly.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="group w-40 p-6 rounded-2xl bg-[#151515] border border-[#262626] hover:border-[#3a3a3a] transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div
                  className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-shadow"
                  style={{ backgroundColor: method.color }}
                >
                  {method.name.charAt(0)}
                </div>
                <h4 className="font-bold text-[#fafafa] mb-1">{method.name}</h4>
                <p className="text-xs text-[#71717a]">{method.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Card CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#22c55e]/10 to-[#06b6d4]/10" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />

        <div className="container relative">
          <div className="max-w-4xl mx-auto bg-[#151515]/80 backdrop-blur-xl border border-[#262626] rounded-[2rem] p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">
              Received a <span className="gradient-text">Gift Card?</span>
            </h2>
            <p className="text-xl text-[#a1a1aa] mb-10 max-w-xl mx-auto">
              Redeem your code now and get instant credit added to your wallet. Works for all products store-wide.
            </p>
            <Link href="/redeem">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full">
                Redeem Code
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
