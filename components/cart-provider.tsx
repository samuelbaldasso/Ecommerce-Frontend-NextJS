'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import type { CartItem, Product } from '@/lib/schemas'
import { reserveInventory, releaseInventory } from '@/lib/api/inventory'
import { useToast } from '@/components/ui/use-toast'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = useCallback(async (product: Product, quantity: number) => {
    try {
      // Reserve inventory
      await reserveInventory({ productId: product.id!, quantity })

      setItems((prev) => {
        const existingItem = prev.find((item) => item.product.id === product.id)
        
        if (existingItem) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
        
        return [...prev, { product, quantity }]
      })

      toast({
        title: 'Added to cart',
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
      })
      throw error
    }
  }, [toast])

  const removeFromCart = useCallback(async (productId: number) => {
    const item = items.find((i) => i.product.id === productId)
    if (!item) return

    try {
      // Release inventory
      await releaseInventory({ productId, quantity: item.quantity })

      setItems((prev) => prev.filter((item) => item.product.id !== productId))

      toast({
        title: 'Removed from cart',
        description: `${item.product.name} has been removed from your cart.`,
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove item from cart. Please try again.',
      })
      throw error
    }
  }, [items, toast])

  const updateQuantity = useCallback(async (productId: number, newQuantity: number) => {
    const item = items.find((i) => i.product.id === productId)
    if (!item) return

    const quantityDiff = newQuantity - item.quantity

    try {
      if (quantityDiff > 0) {
        // Reserve more inventory
        await reserveInventory({ productId, quantity: quantityDiff })
      } else if (quantityDiff < 0) {
        // Release inventory
        await releaseInventory({ productId, quantity: Math.abs(quantityDiff) })
      }

      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      )
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update quantity. Please try again.',
      })
      throw error
    }
  }, [items, toast])

  const clearCart = useCallback(() => {
    // Release all inventory
    items.forEach(async (item) => {
      try {
        await releaseInventory({ productId: item.product.id!, quantity: item.quantity })
      } catch (error) {
        console.error('Failed to release inventory:', error)
      }
    })

    setItems([])
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart.',
    })
  }, [items, toast])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
