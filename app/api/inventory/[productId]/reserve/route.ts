import { NextRequest } from 'next/server';
import { reserveInventory } from '@/lib/api/inventory';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: number }> }
) {
  try {
    const body = await request.json();
    const result = await reserveInventory(body);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Failed to reserve inventory' },
      { status: error.response?.status || 500 }
    );
  }
}