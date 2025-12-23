import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRODUCTS_API = process.env.PRODUCTS_API || ''

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${PRODUCTS_API}/${params.id}`)

  const data = await res.json()

  return NextResponse.json(data)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const res = await fetch(`${PRODUCTS_API}/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return NextResponse.json(data)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await fetch(`${PRODUCTS_API}/${params.id}`, {
    method: 'DELETE',
  })

  return new Response(null, { status: 204 })
}
