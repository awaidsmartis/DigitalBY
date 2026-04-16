/* eslint-disable no-console */

/**
 * Seeds `content/products/<id>/product.json` files from the existing
 * `lib/products.ts` in this repo.
 *
 * Why: we want a folder-per-product structure so adding a product is as simple
 * as adding a new folder with a `product.json`.
 *
 * Usage:
 *   node scripts/seed-products-json.cjs
 */

const fs = require('fs')
const path = require('path')
const vm = require('vm')

const ROOT = path.join(__dirname, '..')
const PRODUCTS_TS = path.join(ROOT, 'lib', 'products.ts')
const OUT_DIR = path.join(ROOT, 'content', 'products')

function extractProductsArraySource(tsSource) {
  const marker = 'export const products'
  const start = tsSource.indexOf(marker)
  if (start < 0) throw new Error('Could not find "export const products" in lib/products.ts')

  const openBracket = tsSource.indexOf('[', start)
  if (openBracket < 0) throw new Error('Could not find opening [ for products array')

  const endMarker = '\n\nexport function getProductById'
  const end = tsSource.indexOf(endMarker, openBracket)
  if (end < 0) throw new Error('Could not find end of products array (before getProductById)')

  // capture the array literal including closing bracket
  const arrayLiteral = tsSource.slice(openBracket, end).trim()
  return arrayLiteral
}

function evalProducts(arrayLiteral) {
  const code = `module.exports = ${arrayLiteral}`
  const sandbox = { module: { exports: [] } }
  vm.createContext(sandbox)
  vm.runInContext(code, sandbox, { timeout: 1000 })
  return sandbox.module.exports
}

function stableJson(obj) {
  return JSON.stringify(obj, null, 2) + '\n'
}

function main() {
  const tsSource = fs.readFileSync(PRODUCTS_TS, 'utf8')
  const arrayLiteral = extractProductsArraySource(tsSource)
  const products = evalProducts(arrayLiteral)

  fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const p of products) {
    const dir = path.join(OUT_DIR, p.id)
    fs.mkdirSync(dir, { recursive: true })
    const outPath = path.join(dir, 'product.json')
    fs.writeFileSync(outPath, stableJson(p), 'utf8')
  }

  // also write an index file for quick inspection
  fs.writeFileSync(
    path.join(OUT_DIR, 'index.json'),
    stableJson(products.map((p) => ({ id: p.id, name: p.name, category: p.category }))),
    'utf8',
  )

  console.log(`Seeded ${products.length} products into ${OUT_DIR}`)
}

main()
