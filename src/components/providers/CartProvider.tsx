"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image?: string
}

interface CartContextType {
    items: CartItem[]
    addItem: (item: Omit<CartItem, "quantity">) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
    lastAddedItem: Omit<CartItem, "quantity"> | null
    clearLastAddedItem: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [lastAddedItem, setLastAddedItem] = useState<Omit<CartItem, "quantity"> | null>(null)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            setItems(JSON.parse(savedCart))
        }
        setIsLoaded(true)
    }, [])

    // Save cart to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isLoaded])

    // Auto-clear lastAddedItem after 3 seconds
    useEffect(() => {
        if (lastAddedItem) {
            const timer = setTimeout(() => {
                setLastAddedItem(null)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [lastAddedItem])

    const addItem = (item: Omit<CartItem, "quantity">) => {
        setLastAddedItem(item)
        setItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id)
            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id)
            return
        }
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const clearLastAddedItem = () => {
        setLastAddedItem(null)
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                itemCount,
                lastAddedItem,
                clearLastAddedItem,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

