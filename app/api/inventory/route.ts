import { NextResponse } from 'next/server'

const INVENTORY_API = process.env.INVENTORY_API || ''

export async function GET() {
  const res = await fetch(INVENTORY_API)

  const data = await res.json()

  return NextResponse.json(data)
}
