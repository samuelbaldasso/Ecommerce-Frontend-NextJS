import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const INVENTORY_API = process.env.INVENTORY_API || ''

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  await fetch(`${INVENTORY_API}/${params.id}/reserve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return new Response(null, { status: 204 })
}
