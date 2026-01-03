import { NextRequest } from 'next/server';
import { getInventory } from '@/lib/api/inventory';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: number }> }
) {
  try {
    const { productId } = await params;
    const inventory = await getInventory(productId);
    return Response.json(inventory);
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Failed to fetch inventory' },
      { status: error.response?.status || 500 }
    );
  }
}