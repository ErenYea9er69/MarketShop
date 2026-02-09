import { dummyProducts, type Product } from "@/lib/dummy-data"
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

    // Fetch products from dummy data
    const products = dummyProducts.filter((product) => {
        const matchesCategory = category === "all" || product.category === category
        const matchesPrice = product.price <= maxPrice
        const matchesSearch = !search ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())

        return product.active && matchesCategory && matchesSearch && matchesPrice
    }).sort((a, b) => {
        // Mock sorting: featured first, then newest
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return <ShopClient products={products} search={search} />
}
