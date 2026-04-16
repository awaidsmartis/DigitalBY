'use client'

import type { Product } from '@/lib/products-fs';
import { useEffect, useMemo, useState } from 'react';

type ProductsState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ready'; products: Product[] }

let cache: Product[] | null = null
let cachePromise: Promise<Product[]> | null = null

async function fetchProducts(): Promise<Product[]> {
  if (cache) return cache
  if (cachePromise) return cachePromise

  cachePromise = fetch('/api/products', { cache: 'no-store' })
    .then(async (r) => {
      if (!r.ok) throw new Error(`Failed to load products (${r.status})`)
      const data = (await r.json()) as { products: Product[] }
      cache = data.products
      return cache
    })
    .finally(() => {
      cachePromise = null
    })

  return cachePromise
}

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetchProducts()
      .then((products) => {
        if (cancelled) return
        setState({ status: 'ready', products })
      })
      .catch((e: unknown) => {
        if (cancelled) return
        setState({ status: 'error', error: e instanceof Error ? e.message : 'Unknown error' })
      })

    return () => {
      cancelled = true
    }
  }, [])

  const productById = useMemo(() => {
    if (state.status !== 'ready') return null
    const map = new Map(state.products.map((p) => [p.id, p]))
    return (id: string) => map.get(id)
  }, [state])

  return { state, productById }
}
