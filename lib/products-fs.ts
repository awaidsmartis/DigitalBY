import fs from 'node:fs'
import path from 'node:path'
import { productSchema, type ProductFromJson } from './products-schema'

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products')
const PRODUCTS_INDEX_PATH = path.join(PRODUCTS_DIR, 'index.json')

export type Product = ProductFromJson

function readJsonFile(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw)
}

export function getAllProductsFromContent(): Product[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return []

  const entries = fs
    .readdirSync(PRODUCTS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)

  const products: Product[] = []

  for (const id of entries) {
    const jsonPath = path.join(PRODUCTS_DIR, id, 'product.json')
    if (!fs.existsSync(jsonPath)) continue

    const parsed = productSchema.parse(readJsonFile(jsonPath))
    // Ensure the folder name matches product id
    products.push({ ...parsed, id })
  }

  // Ordering strategy:
  // 1) If `content/products/index.json` exists, respect that order first.
  // 2) Any products not listed in the index are appended in stable (category/name) order.
  if (fs.existsSync(PRODUCTS_INDEX_PATH)) {
    try {
      const rawIndex = readJsonFile(PRODUCTS_INDEX_PATH)
      const index = Array.isArray(rawIndex) ? rawIndex : []
      const order = new Map<string, number>()
      for (let i = 0; i < index.length; i++) {
        const entry = index[i]
        if (entry && typeof entry === 'object' && typeof (entry as any).id === 'string') {
          order.set((entry as any).id, i)
        }
      }

      products.sort((a, b) => {
        const ai = order.get(a.id)
        const bi = order.get(b.id)

        // both in index
        if (ai !== undefined && bi !== undefined) return ai - bi
        // one in index
        if (ai !== undefined) return -1
        if (bi !== undefined) return 1

        // fallback stable ordering (by category then name)
        const c = a.category.localeCompare(b.category)
        if (c !== 0) return c
        return a.name.localeCompare(b.name)
      })
    } catch {
      // ignore and fall back to stable ordering below
      products.sort((a, b) => {
        const c = a.category.localeCompare(b.category)
        if (c !== 0) return c
        return a.name.localeCompare(b.name)
      })
    }
  } else {
    // Stable ordering (by category then name)
    products.sort((a, b) => {
      const c = a.category.localeCompare(b.category)
      if (c !== 0) return c
      return a.name.localeCompare(b.name)
    })
  }

  return products
}

export function getProductByIdFromContent(id: string): Product | undefined {
  const jsonPath = path.join(PRODUCTS_DIR, id, 'product.json')
  if (!fs.existsSync(jsonPath)) return undefined
  const parsed = productSchema.parse(readJsonFile(jsonPath))
  return { ...parsed, id }
}
