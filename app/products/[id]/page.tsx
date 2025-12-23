'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import { ArrowLeft, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getProduct } from '@/lib/api/products'
import { getInventory } from '@/lib/api/inventory'
import { useCart } from '@/components/cart-provider'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const productId = parseInt(id)
  
  const { data: product, error: productError, isLoading: productLoading } = useSWR(
    `product-${productId}`,
    () => getProduct(productId)
  )
  
  const { data: inventory, error: inventoryError, isLoading: inventoryLoading } = useSWR(
    product ? `inventory-${productId}` : null,
    () => getInventory(productId)
  )

  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAdding(true)
    try {
      await addToCart(product, quantity)
      setQuantity(1)
    } finally {
      setIsAdding(false)
    }
  }

  const inStock = inventory ? inventory.available > 0 : false
  const maxQuantity = inventory?.available || 0

  if (productError) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load product. Please try again later.
        </div>
      </div>
    )
  }

  if (productLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="mb-4 h-8 w-32" />
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-8">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Link href="/products" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {inventoryLoading ? (
              <Skeleton className="h-6 w-24" />
            ) : inventory ? (
              <>
                <Badge variant={inStock ? 'default' : 'destructive'}>
                  {inStock ? `${inventory.available} in stock` : 'Out of stock'}
                </Badge>
                {inventory.reserved > 0 && (
                  <Badge variant="secondary">
                    {inventory.reserved} reserved
                  </Badge>
                )}
              </>
            ) : null}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{product.description}</p>
            </CardContent>
          </Card>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                  disabled={quantity >= maxQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className="w-full"
              size="lg"
            >
              {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
