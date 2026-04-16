# Content guide (Products)

This app now supports a **folder-per-product** structure so you can add new products without touching TypeScript.

## Folder structure

Add a folder under:

```
New Digital App/content/products/<product-id>/product.json
```

Example:

```
content/products/my-new-product/product.json
```

## Required fields in `product.json`

Minimum recommended fields:

```json
{
  "id": "my-new-product",
  "name": "My New Product",
  "category": "Blue Yonder",
  "shortDescription": "One-liner",
  "description": "Long description...",
  "valueProposition": ["..."],
  "features": ["..."],
  "logo": "/assets/images/products-icons/MyLogo.png",
  "image": "/assets/images/products/images/MyNewProduct/hero.png",
  "media": [
    { "type": "image", "src": "/assets/images/products/images/MyNewProduct/1.png" },
    { "type": "video", "src": "https://example.com/demo.mp4", "title": "Demo" }
  ],
  "references": [
    { "label": "Product Page", "url": "https://example.com", "kind": "product-page" }
  ],
  "price": "Contact for pricing",
  "specs": {}
}
```

Notes:
- The loader validates every JSON file via Zod schema (`lib/products-schema.ts`).
- The folder name should match the `id`.

## Where products are loaded from

- Backend loader: `lib/products-fs.ts`
- API:
  - `GET /api/products`
  - `GET /api/products/<id>`
- UI uses the API via `hooks/useProducts.ts` so adding a new product folder automatically shows up in the carousel.

## Seeding from legacy TypeScript list

We kept the old `lib/products.ts` as a historical source; you can regenerate the JSON folders with:

```bash
cd "New Digital App"
node scripts/seed-products-json.cjs
```
