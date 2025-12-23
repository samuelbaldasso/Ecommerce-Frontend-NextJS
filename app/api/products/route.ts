import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRODUCTS_API = process.env.PRODUCTS_API || ''

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.search
  const res = await fetch(`${PRODUCTS_API}${searchParams}`)

  const data = await res.json()

  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const res = await fetch(PRODUCTS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return NextResponse.json(data)
}
