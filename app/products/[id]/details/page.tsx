import { redirect } from 'next/navigation'

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // Details are now inline on the main product page (single-page brochure experience)
  redirect(`/products/${id}?details=1`)
}
