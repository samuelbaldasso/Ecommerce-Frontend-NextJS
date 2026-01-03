import { NextRequest } from 'next/server';
import { releaseInventory } from '@/lib/api/inventory';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: number }> }
) {
  try {
    const body = await request.json();
    const result = await releaseInventory(body);
    return Response.json(result);
  } catch (error: any) {
    return Response.json(
      { error: error.message || 'Failed to release inventory' },
      { status: error.response?.status || 500 }
    );
  }
} 