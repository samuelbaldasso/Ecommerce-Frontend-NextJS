import axios from 'axios'
import type { Inventory, ReserveInventoryInput, ReleaseInventoryInput } from '@/lib/schemas'

const inventoryClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function getInventory(productId: number): Promise<Inventory> {
  const response = await inventoryClient.get<Inventory>(`/inventory/${productId}`)
  return response.data
}

export async function reserveInventory(data: ReserveInventoryInput): Promise<void> {
  await inventoryClient.post(`/inventory/${data.productId}/reserve`, {
    quantity: data.quantity,
  })
}

export async function releaseInventory(data: ReleaseInventoryInput): Promise<void> {
  await inventoryClient.post(`/inventory/${data.productId}/release`, {
    quantity: data.quantity,
  })
}
