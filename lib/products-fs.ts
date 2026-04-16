import fs from 'node:fs'
import path from 'node:path'
import { productSchema, type ProductFromJson } from './products-schema'

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products')

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

  // Stable ordering (by category then name)
  products.sort((a, b) => {
    const c = a.category.localeCompare(b.category)
    if (c !== 0) return c
    return a.name.localeCompare(b.name)
  })

  return products
}

export function getProductByIdFromContent(id: string): Product | undefined {
  const jsonPath = path.join(PRODUCTS_DIR, id, 'product.json')
  if (!fs.existsSync(jsonPath)) return undefined
  const parsed = productSchema.parse(readJsonFile(jsonPath))
  return { ...parsed, id }
}
