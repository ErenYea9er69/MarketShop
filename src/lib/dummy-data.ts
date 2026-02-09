export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string | null;
    category: string;
    active: boolean;
    featured: boolean;
    stock: number;
    features?: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const dummyProducts: Product[] = [
    {
        id: "1",
        name: "Premium Gift Card",
        description: "The perfect gift for anyone. Valid for all store items. This digital gift card can be used to purchase any product in our store, including subscriptions, game keys, and software licenses.",
        price: 50.00,
        image: "/images/gift-card.jpg",
        category: "GIFT_CARDS",
        active: true,
        featured: true,
        stock: 100,
        features: [
            "No expiration date",
            "Valid for all products",
            "Instant delivery via email",
            "Transferable to friends"
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Streaming Subscription (1 Month)",
        description: "Access thousands of movies and TV shows for 30 days. Enjoy ad-free streaming in 4K HDR quality on up to 4 devices simultaneously.",
        price: 15.00,
        image: null,
        category: "SUBSCRIPTIONS",
        active: true,
        featured: false,
        stock: 50,
        features: [
            "4K HDR Quality",
            "Ad-free experience",
            "Offline downloads",
            "Cancel anytime"
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Game Key: Cyber Adventure",
        description: "Experience the future in this open-world RPG. Navigate a dystopian metropolis, customize your character with cybernetic enhancements, and shape the story through your choices.",
        price: 59.99,
        image: null,
        category: "PRODUCT_KEYS",
        active: true,
        featured: true,
        stock: 25,
        features: [
            "Global Steam Key",
            "Includes Pre-order Bonus",
            "Multiplayer enabled",
            "Cross-platform save"
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Mobile Top-Up $10",
        description: "Instant credit for your mobile phone. Works with all major carriers. Stay connected with friends and family.",
        price: 10.00,
        image: null,
        category: "TOP_UPS",
        active: true,
        featured: false,
        stock: 1000,
        features: [
            "Instant activation",
            "No hidden fees",
            "Works with all carriers",
            "Secure transaction"
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Pro Software License",
        description: "Lifetime license for professional editing software. Includes all future updates and premium support.",
        price: 199.99,
        image: null,
        category: "PRODUCT_KEYS",
        active: true,
        featured: true,
        stock: 10,
        features: [
            "Lifetime License",
            "Free Updates",
            "Premium Support",
            "Commercial Use Allowed"
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];
