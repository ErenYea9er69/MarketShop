import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProductDetailsClient } from "@/components/shop/ProductDetailsClient"

interface ProductPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params
    const product = await prisma.product.findUnique({
        where: { id },
    })

    if (!product) {
        notFound()
    }

    return <ProductDetailsClient product={product} />
}
