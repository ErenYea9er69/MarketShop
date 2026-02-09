import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import "dotenv/config"

console.log("DEBUG: DATABASE_URL is", process.env.DATABASE_URL ? "DEFINED" : "UNDEFINED");
const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@kwaret.shop" },
    update: {},
    create: {
      email: "admin@kwaret.shop",
      name: "Admin",
      password: adminPassword,
      role: "ADMIN",
      balance: 0,
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // Create test client
  const clientPassword = await bcrypt.hash("client123", 12)
  const client = await prisma.user.upsert({
    where: { email: "client@test.com" },
    update: {},
    create: {
      email: "client@test.com",
      name: "Test Client",
      password: clientPassword,
      role: "CLIENT",
      balance: 100,
      cashback: 5,
    },
  })
  console.log("✅ Test client created:", client.email)

  // Create products
  const products = [
    {
      name: "ChatGPT Plus",
      nameAr: "شات جي بي تي بلس",
      nameFr: "ChatGPT Plus",
      description: "1 Month ChatGPT Plus Subscription",
      descAr: "اشتراك شهر واحد في ChatGPT Plus",
      descFr: "Abonnement ChatGPT Plus 1 mois",
      price: 65,
      category: "SUBSCRIPTIONS",
      stock: 50,
      featured: true,
    },
    {
      name: "Netflix Profile",
      nameAr: "نتفليكس بروفايل",
      nameFr: "Profil Netflix",
      description: "Premium Netflix Profile - 1 Month",
      descAr: "بروفايل نتفليكس بريميوم - شهر واحد",
      descFr: "Profil Netflix Premium - 1 mois",
      price: 25,
      category: "SUBSCRIPTIONS",
      stock: 100,
      featured: true,
    },
    {
      name: "Spotify Premium",
      nameAr: "سبوتيفاي بريميوم",
      nameFr: "Spotify Premium",
      description: "Spotify Premium Individual - 1 Month",
      descAr: "سبوتيفاي بريميوم فردي - شهر واحد",
      descFr: "Spotify Premium Individuel - 1 mois",
      price: 20,
      category: "SUBSCRIPTIONS",
      stock: 75,
      featured: true,
    },
    {
      name: "Steam $20 Gift Card",
      nameAr: "بطاقة ستيم 20 دولار",
      nameFr: "Carte Cadeau Steam 20$",
      description: "Steam Wallet Code - $20 USD",
      descAr: "رصيد ستيم - 20 دولار أمريكي",
      descFr: "Code Steam Wallet - 20$ USD",
      price: 65,
      category: "GIFT_CARDS",
      stock: 30,
      featured: false,
    },
    {
      name: "PlayStation Plus",
      nameAr: "بلايستيشن بلس",
      nameFr: "PlayStation Plus",
      description: "PlayStation Plus Essential - 1 Month",
      descAr: "بلايستيشن بلس أساسي - شهر واحد",
      descFr: "PlayStation Plus Essentiel - 1 mois",
      price: 35,
      category: "SUBSCRIPTIONS",
      stock: 40,
      featured: false,
    },
    {
      name: "IPTV Premium",
      nameAr: "IPTV بريميوم",
      nameFr: "IPTV Premium",
      description: "Premium IPTV - 1 Month Access",
      descAr: "IPTV بريميوم - وصول شهر واحد",
      descFr: "IPTV Premium - Accès 1 mois",
      price: 15,
      category: "SUBSCRIPTIONS",
      stock: 200,
      featured: false,
    },
    {
      name: "Windows 11 Pro Key",
      nameAr: "مفتاح ويندوز 11 برو",
      nameFr: "Clé Windows 11 Pro",
      description: "Windows 11 Professional License Key",
      descAr: "مفتاح ترخيص ويندوز 11 بروفيشنال",
      descFr: "Clé de licence Windows 11 Professionnel",
      price: 45,
      category: "PRODUCT_KEYS",
      stock: 20,
      featured: false,
    },
    {
      name: "Ooredoo 5 TND",
      nameAr: "أوريدو 5 دينار",
      nameFr: "Ooredoo 5 TND",
      description: "Ooredoo Mobile Credit Top-up 5 TND",
      descAr: "شحن رصيد أوريدو 5 دينار",
      descFr: "Recharge Ooredoo 5 TND",
      price: 5.5,
      category: "TOP_UPS",
      stock: 1000,
      featured: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, "-") },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, "-"),
        ...product,
      },
    })
  }
  console.log("✅ Products created:", products.length)

  // Create payment methods
  const paymentMethods = [
    { name: "D17", displayName: "D17", displayAr: "D17", displayFr: "D17", details: "XX XXX XXX" },
    { name: "OOREDOO", displayName: "Ooredoo", displayAr: "أوريدو", displayFr: "Ooredoo", details: "XX XXX XXX" },
    { name: "PAYPAL", displayName: "PayPal", displayAr: "باي بال", displayFr: "PayPal", details: "email@example.com" },
    { name: "CRYPTO", displayName: "Crypto (USDT)", displayAr: "كريبتو (USDT)", displayFr: "Crypto (USDT)", details: "TXXXXXXXXXXXXXXXXXXXXXXX" },
    { name: "FLOUCI", displayName: "Flouci", displayAr: "فلوسي", displayFr: "Flouci", details: "XX XXX XXX" },
  ]

  for (const method of paymentMethods) {
    await prisma.paymentMethod.upsert({
      where: { name: method.name },
      update: method,
      create: method,
    })
  }
  console.log("✅ Payment methods created:", paymentMethods.length)

  // Create sample gift cards
  const giftCards = [
    { code: "KWARET-TEST-100", amount: 100 },
    { code: "KWARET-TEST-50", amount: 50 },
    { code: "KWARET-TEST-25", amount: 25 },
  ]

  for (const card of giftCards) {
    await prisma.giftCard.upsert({
      where: { code: card.code },
      update: card,
      create: card,
    })
  }
  console.log("✅ Gift cards created:", giftCards.length)

  console.log("\n🎉 Seeding complete!")
  console.log("\n📝 Login credentials:")
  console.log("   Admin: admin@kwaret.shop / admin123")
  console.log("   Client: client@test.com / client123")
  console.log("\n💳 Test gift cards: KWARET-TEST-100, KWARET-TEST-50, KWARET-TEST-25")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
