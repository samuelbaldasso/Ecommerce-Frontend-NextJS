'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useSWR from 'swr'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { getProduct, updateProduct } from '@/lib/api/products'
import { updateProductSchema } from '@/lib/schemas'
import { useToast } from '@/components/ui/use-toast'

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const productId = parseInt(id)
  const router = useRouter()
  const { toast } = useToast()
  
  const { data: product, error, isLoading } = useSWR(
    `edit-product-${productId}`,
    () => getProduct(productId)
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      id: productId,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      imageUrl: formData.get('imageUrl') as string || undefined,
      category: formData.get('category') as string || undefined,
    }

    try {
      // Validate with Zod
      const validated = updateProductSchema.parse(data)
      
      // Update product
      await updateProduct(productId, validated)

      toast({
        title: 'Product updated',
        description: 'The product has been updated successfully.',
      })

      router.push('/admin/products')
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to update product. Please try again.',
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
          Failed to load product. Please try again later.
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="mb-6 h-8 w-32" />
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
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
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>Update product information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                required
                defaultValue={product.name}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                required
                defaultValue={product.description}
                placeholder="Enter product description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-destructive">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={product.price}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                defaultValue={product.imageUrl || ''}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="text-sm text-destructive">{errors.imageUrl}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                defaultValue={product.category || ''}
                placeholder="Enter product category"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
              <Link href="/admin/products" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
