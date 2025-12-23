'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/schemas'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart-provider'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  inventory?: {
    available: number
  }
}

export function ProductCard({ product, inventory }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      await addToCart(product, 1)
    } finally {
      setIsAdding(false)
    }
  }

  const inStock = inventory ? inventory.available > 0 : true

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
      </Link>
      
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="line-clamp-2 text-lg">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.name}
            </Link>
          </CardTitle>
          {inventory && (
            <Badge variant={inStock ? 'default' : 'destructive'}>
              {inStock ? `${inventory.available} in stock` : 'Out of stock'}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
        <Button
          onClick={handleAddToCart}
          disabled={!inStock || isAdding}
          size="sm"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}
