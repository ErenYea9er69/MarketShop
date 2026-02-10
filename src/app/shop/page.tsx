import { prisma } from "@/lib/prisma"
import { ShopClient } from "@/components/shop/ShopClient"

export const dynamic = "force-dynamic"

interface ShopPageProps {
    searchParams: Promise<{ category?: string; search?: string; maxPrice?: string }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const params = await searchParams
    const category = params.category || "all"
    const search = params.search || ""
    const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : 1000

    const where: any = {
        active: true,
        price: {
            lte: maxPrice,
        },
    }

    if (category !== "all") {
        where.category = category
    }

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ]
    }

    const [products, categories] = await Promise.all([
        prisma.product.findMany({
            where,
            orderBy: [
                { featured: "desc" },
                { createdAt: "desc" },
            ],
        }),
        prisma.category.findMany({
            orderBy: { name: "asc" }
        })
    ])

    return <ShopClient products={products} search={search} categories={categories} />
}

