import { z } from 'zod'

export const productSchema = z.object({
  id: z.number().optional(),
  sku: z.string().optional(), // Adicionado para bater com o JSON
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  imageUrl: z.string().url('Must be a valid URL').optional(),
  category: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>

export const createProductSchema = productSchema.omit({ id: true })
export type CreateProductInput = z.infer<typeof createProductSchema>

export const updateProductSchema = productSchema.partial().required({ id: true })
export type UpdateProductInput = z.infer<typeof updateProductSchema>

// Inventory schemas
export const inventorySchema = z.object({
  productId: z.number(),
  quantity: z.number().int().nonnegative(),
  reserved: z.number().int().nonnegative(),
  available: z.number().int().nonnegative(),
})

export type Inventory = z.infer<typeof inventorySchema>

export const reserveInventorySchema = z.object({
  productId: z.number(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
})

export type ReserveInventoryInput = z.infer<typeof reserveInventorySchema>

export const releaseInventorySchema = z.object({
  productId: z.number(),
  quantity: z.number().int().positive('Quantity must be at least 1'),
})

export type ReleaseInventoryInput = z.infer<typeof releaseInventorySchema>

// Cart schemas
export const cartItemSchema = z.object({
  product: productSchema,
  quantity: z.number().int().positive(),
})

export type CartItem = z.infer<typeof cartItemSchema>
