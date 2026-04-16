'use client'

import ProductDetail from '@/components/ProductDetail'
import { useProducts } from '@/hooks/useProducts'
import { useParams, useRouter } from 'next/navigation'

export default function ProductDetailRouteClient() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { state, productById } = useProducts()

  if (state.status === 'loading') {
    return (
      <div className="w-full min-h-screen bg-digitalby text-white flex items-center justify-center">
        Loading product…
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="w-full min-h-screen bg-digitalby text-white flex flex-col items-center justify-center gap-4 px-6">
        <div className="text-xl font-black">Failed to load products</div>
        <div className="text-slate-400 text-sm">{state.error}</div>
        <button
          onClick={() => router.push('/products')}
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10"
        >
          Back to products
        </button>
      </div>
    )
  }

  const product = productById?.(id)
  if (!product) {
    router.push('/products')
    return null
  }

  return (
    <ProductDetail
      product={product}
      allProducts={state.products}
      onClose={() => router.push('/products')}
    />
  )
}
