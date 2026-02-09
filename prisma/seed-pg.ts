import { Client } from 'pg';
import bcrypt from 'bcryptjs';
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    await client.connect();
    console.log("🌱 Seeding database using direct PG connection...");

    // 1. Create Admin User
    const adminPassword = await bcrypt.hash("admin123", 12);
    // Upsert Admin
    await client.query(`
      INSERT INTO "User" (id, email, password, name, role, balance, "createdAt", "updatedAt")
      VALUES ('admin-id', 'admin@kwaret.shop', $1, 'Admin', 'ADMIN', 0, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET password = $1;
    `, [adminPassword]);
    console.log("✅ Admin user created/updated");

    // 2. Create Test Client
    const clientPassword = await bcrypt.hash("client123", 12);
    // Upsert Client
    await client.query(`
      INSERT INTO "User" (id, email, password, name, role, balance, cashback, "createdAt", "updatedAt")
      VALUES ('client-id', 'client@test.com', $1, 'Test Client', 'CLIENT', 100, 5, NOW(), NOW())
      ON CONFLICT (email) DO UPDATE SET password = $1, balance = 100;
    `, [clientPassword]);
    console.log("✅ Test client created/updated");

    // 3. Create Products
    const products = [
      {
        id: "chatgpt-plus", name: "ChatGPT Plus", nameAr: "شات جي بي تي بلس", nameFr: "ChatGPT Plus",
        description: "1 Month ChatGPT Plus Subscription", descAr: "اشتراك شهر واحد في ChatGPT Plus", descFr: "Abonnement ChatGPT Plus 1 mois",
        price: 65, category: "SUBSCRIPTIONS", stock: 50, featured: true
      },
      {
        id: "netflix-profile", name: "Netflix Profile", nameAr: "نتفليكس بروفايل", nameFr: "Profil Netflix",
        description: "Premium Netflix Profile - 1 Month", descAr: "بروفايل نتفليكس بريميوم - شهر واحد", descFr: "Profil Netflix Premium - 1 mois",
        price: 25, category: "SUBSCRIPTIONS", stock: 100, featured: true
      },
      {
        id: "spotify-premium", name: "Spotify Premium", nameAr: "سبوتيفاي بريميوم", nameFr: "Spotify Premium",
        description: "Spotify Premium Individual - 1 Month", descAr: "سبوتيفاي بريميوم فردي - شهر واحد", descFr: "Spotify Premium Individuel - 1 mois",
        price: 20, category: "SUBSCRIPTIONS", stock: 75, featured: true
      },
      {
        id: "steam-20-gift-card", name: "Steam $20 Gift Card", nameAr: "بطاقة ستيم 20 دولار", nameFr: "Carte Cadeau Steam 20$",
        description: "Steam Wallet Code - $20 USD", descAr: "رصيد ستيم - 20 دولار أمريكي", descFr: "Code Steam Wallet - 20$ USD",
        price: 65, category: "GIFT_CARDS", stock: 30, featured: false
      },
       {
        id: "playstation-plus", name: "PlayStation Plus", nameAr: "بلايستيشن بلس", nameFr: "PlayStation Plus",
        description: "PlayStation Plus Essential - 1 Month", descAr: "بلايستيشن بلس أساسي - شهر واحد", descFr: "PlayStation Plus Essentiel - 1 mois",
        price: 35, category: "SUBSCRIPTIONS", stock: 40, featured: false
      },
      {
        id: "iptv-premium", name: "IPTV Premium", nameAr: "IPTV بريميوم", nameFr: "IPTV Premium",
        description: "Premium IPTV - 1 Month Access", descAr: "IPTV بريميوم - وصول شهر واحد", descFr: "IPTV Premium - Accès 1 mois",
        price: 15, category: "SUBSCRIPTIONS", stock: 200, featured: false
      },
      {
        id: "windows-11-pro-key", name: "Windows 11 Pro Key", nameAr: "مفتاح ويندوز 11 برو", nameFr: "Clé Windows 11 Pro",
        description: "Windows 11 Professional License Key", descAr: "مفتاح ترخيص ويندوز 11 بروفيشنال", descFr: "Clé de licence Windows 11 Professionnel",
        price: 45, category: "PRODUCT_KEYS", stock: 20, featured: false
      },
      {
        id: "ooredoo-5-tnd", name: "Ooredoo 5 TND", nameAr: "أوريدو 5 دينار", nameFr: "Ooredoo 5 TND",
        description: "Ooredoo Mobile Credit Top-up 5 TND", descAr: "شحن رصيد أوريدو 5 دينار", descFr: "Recharge Ooredoo 5 TND",
        price: 5.5, category: "TOP_UPS", stock: 1000, featured: false
      },
    ];

    for (const p of products) {
      await client.query(`
        INSERT INTO "Product" (id, name, "nameAr", "nameFr", description, "descAr", "descFr", price, category, stock, featured, active, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, NOW(), NOW())
        ON CONFLICT (id) DO UPDATE SET 
          price = $8, stock = $10, featured = $11;
      `, [p.id, p.name, p.nameAr, p.nameFr, p.description, p.descAr, p.descFr, p.price, p.category, p.stock, p.featured]);
    }
    console.log(`✅ ${products.length} Products created/updated`);

    // 4. Payment Methods
    const paymentMethods = [
      { name: "D17", displayName: "D17", displayAr: "D17", displayFr: "D17", details: "XX XXX XXX" },
      { name: "OOREDOO", displayName: "Ooredoo", displayAr: "أوريدو", displayFr: "Ooredoo", details: "XX XXX XXX" },
      { name: "PAYPAL", displayName: "PayPal", displayAr: "باي بال", displayFr: "PayPal", details: "email@example.com" },
      { name: "CRYPTO", displayName: "Crypto (USDT)", displayAr: "كريبتو (USDT)", displayFr: "Crypto (USDT)", details: "TXXXXXXXXXXXXXXXXXXXXXXX" },
      { name: "FLOUCI", displayName: "Flouci", displayAr: "فلوسي", displayFr: "Flouci", details: "XX XXX XXX" },
    ];

    for (const m of paymentMethods) {
      await client.query(`
        INSERT INTO "PaymentMethod" (id, name, "displayName", "displayAr", "displayFr", details, active)
        VALUES ($1, $2, $3, $4, $5, $6, true)
        ON CONFLICT (name) DO UPDATE SET details = $6;
      `, [m.name.toLowerCase(), m.name, m.displayName, m.displayAr, m.displayFr, m.details]);
    }
    console.log(`✅ ${paymentMethods.length} Payment methods created/updated`);

    // 5. Gift Cards
    const giftCards = [
      { code: "KWARET-TEST-100", amount: 100 },
      { code: "KWARET-TEST-50", amount: 50 },
      { code: "KWARET-TEST-25", amount: 25 },
    ];

    for (const c of giftCards) {
      await client.query(`
        INSERT INTO "GiftCard" (id, code, amount, used, "createdAt")
        VALUES ($1, $2, $3, false, NOW())
        ON CONFLICT (code) DO NOTHING;
      `, [c.code, c.code, c.amount]);
    }
    console.log(`✅ ${giftCards.length} Gift cards created/updated`);

    console.log("\n🎉 Seeding complete!");
    await client.end();
  } catch (e) {
    console.error("❌ Seeding failed:", e);
    await client.end();
    process.exit(1);
  }
}

main();
