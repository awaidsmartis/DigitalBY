import { getProductByIdFromContent } from '@/lib/products-fs'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const product = getProductByIdFromContent(params.id)
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ product })
}
