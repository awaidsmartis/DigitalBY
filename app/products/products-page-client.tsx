'use client'

import LoadingScreen from '@/components/LoadingScreen'
import ProductsCarousel from '@/components/ProductsCarousel'
import { useProducts } from '@/hooks/useProducts'
import { useRouter } from 'next/navigation'

export default function ProductsPageClient() {
  const router = useRouter()
  const { state } = useProducts()

  if (state.status === 'loading') {
    return <LoadingScreen label="Loading products" />
  }

  if (state.status === 'error') {
    return (
      <div className="w-full min-h-screen bg-digitalby text-white flex flex-col items-center justify-center gap-4 px-6">
        <div className="text-xl font-black">Failed to load products</div>
        <div className="text-slate-400 text-sm">{state.error}</div>
        <button
          onClick={() => router.push('/menu')}
          className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10"
        >
          Back to menu
        </button>
      </div>
    )
  }

  return (
    <ProductsCarousel
      products={state.products}
      onSelectProduct={(p) => router.push(`/products/${p.id}`)}
      onBack={() => router.push('/menu')}
    />
  )
}
