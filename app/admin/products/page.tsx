'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProducts, deleteProduct } from '@/lib/api/products'
import { getInventory } from '@/lib/api/inventory'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

import type { Inventory, Product } from '@/lib/schemas' 

export default function AdminProductsPage() {
  const { data: productsData, error, isLoading, mutate } = useSWR('admin-products', () => getProducts(0, 10, ''))
  const [inventoryMap, setInventoryMap] = useState<Map<number, Inventory>>(new Map())
  const { toast } = useToast()

  // Helper para acessar a lista de produtos (seja array direto ou paginado)
  const products: Product[] = productsData?.content

  // Fetch inventory for all products
  useEffect(() => {
    if (!productsData || !products.length) return

    const fetchInventory = async () => {
      const inventoryPromises = products.map(async (product: Product) => {
        if (!product.id) return null
        try {
          const inventory = await getInventory(product.id)
          return { productId: product.id, inventory }
        } catch (error) {
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
  }, [productsData]) // Dependência atualizada

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      await deleteProduct(id)
      toast({
        title: 'Product deleted',
        description: `${name} has been deleted successfully.`,
      })
      mutate()
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
      })
    }
  }

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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Management</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading products...
            </div>
          ) : products.length > 0 ? ( // CORREÇÃO 4: Usando o array extraído
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead> {/* Opcional: Mostrar SKU */}
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Reserved</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const inventory = inventoryMap.get(product.id!)
                  return (
                    <TableRow key={product.id}>
                      <TableCell>{product.sku || '-'}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>
                        {inventory ? (
                          <Badge variant={inventory.available > 0 ? 'default' : 'destructive'}>
                            {inventory.available}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {inventory ? (
                          <Badge variant="secondary">{inventory.reserved}</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id!, product.name)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No products found.</p>
              <Link href="/admin/products/new">
                <Button className="mt-4">Add Your First Product</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}