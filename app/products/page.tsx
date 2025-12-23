'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { ProductCard } from '@/components/product-card'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { getProducts } from '@/lib/api/products'
import { getInventory } from '@/lib/api/inventory'
import type { Product, Inventory } from '@/lib/schemas'

export default function ProductsPage() {
  const { data, error, isLoading } = useSWR('products', () => getProducts(0, 10, ''))
  const products = data?.content
  const [inventoryMap, setInventoryMap] = useState<Map<number, Inventory>>(new Map())

  // Fetch inventory for all products
  useEffect(() => {
    if (!products) return

    const fetchInventory = async () => {
      const inventoryPromises = products?.map(async (product: any) => {
        try {
          const inventory = await getInventory(product.id)
          return { productId: product.id!, inventory }
        } catch (error) {
          console.error(`Failed to fetch inventory for product ${product.id}:`, error)
          return null
        }
      })

      const results = await Promise.all(inventoryPromises)
      const newMap = new Map<number, Inventory>()
      
      results.forEach((result) => {
        if (result) {
          newMap.set(result.productId, result.inventory)
        }
      })

      setInventoryMap(newMap)
    }

    fetchInventory()
  }, [products])

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load products. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete collection of products
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : products?.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                inventory={inventoryMap.get(product.id!)}
              />
            ))}
      </div>

      {!isLoading && products?.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  )
}
