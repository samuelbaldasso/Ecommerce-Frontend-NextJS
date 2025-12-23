import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const INVENTORY_API = process.env.INVENTORY_API || ''

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${INVENTORY_API}/${params.id}`)

  const data = await res.json()

  return NextResponse.json(data)
}
