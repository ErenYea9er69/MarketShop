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
    createdAt: Date;
    updatedAt: Date;
}

export const dummyProducts: Product[] = [
    {
        id: "1",
        name: "Premium Gift Card",
        description: "The perfect gift for anyone. Valid for all store items.",
        price: 50.00,
        image: "/images/gift-card.jpg",
        category: "GIFT_CARDS",
        active: true,
        featured: true,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        name: "Streaming Subscription (1 Month)",
        description: "Access thousands of movies and TV shows for 30 days.",
        price: 15.00,
        image: null,
        category: "SUBSCRIPTIONS",
        active: true,
        featured: false,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        name: "Game Key: Cyber Adventure",
        description: "Experience the future in this open-world RPG.",
        price: 59.99,
        image: null,
        category: "PRODUCT_KEYS",
        active: true,
        featured: true,
        stock: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "4",
        name: "Mobile Top-Up $10",
        description: "Instant credit for your mobile phone.",
        price: 10.00,
        image: null,
        category: "TOP_UPS",
        active: true,
        featured: false,
        stock: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "5",
        name: "Pro Software License",
        description: "Lifetime license for professional editing software.",
        price: 199.99,
        image: null,
        category: "PRODUCT_KEYS",
        active: true,
        featured: true,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
];
