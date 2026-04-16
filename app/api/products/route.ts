import { getAllProductsFromContent } from '@/lib/products-fs'
import { NextResponse } from 'next/server'

// Always read from disk at runtime so adding a new folder is picked up.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET() {
  const products = getAllProductsFromContent()
  return NextResponse.json({ products })
}
