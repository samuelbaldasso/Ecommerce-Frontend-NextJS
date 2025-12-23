import axios from 'axios'
import type { Product, CreateProductInput, UpdateProductInput } from '@/lib/schemas'

const productsClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getProducts(page = 0, size = 10, q = ''): Promise<any> {
  const response = await productsClient.get('/products', {
    params: { page, size, q },
  })
  return response.data
}

export async function getProduct(id: number): Promise<Product> {
  const response = await productsClient.get<Product>(`/products/${id}`)
  return response.data
}

export async function createProduct(data: CreateProductInput): Promise<Product> {
  const response = await productsClient.post<Product>('/products', data)
  return response.data
}

export async function updateProduct(id: number, data: Partial<UpdateProductInput>): Promise<Product> {
  const response = await productsClient.put<Product>(`/products/${id}`, data)
  return response.data
}

export async function deleteProduct(id: number): Promise<void> {
  await productsClient.delete(`/products/${id}`)
}
