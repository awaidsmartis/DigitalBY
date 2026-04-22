import ProductsPageClient from './products-page-client'
import { cookies } from 'next/headers'

export default async function ProductsPage() {
  const cookieStore = await cookies()
  const view = cookieStore.get('digitalby_products_view')?.value
  const initialViewMode = view === 'cards' ? 'cards' : 'carousel'
  return <ProductsPageClient initialViewMode={initialViewMode} />
}
