import ProductDetailRichPageClient from '@/components/ProductDetailRichPageClient'

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProductDetailRichPageClient productId={id} />
}
