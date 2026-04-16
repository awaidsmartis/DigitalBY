import { z } from 'zod'

export const productMediaSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('image'), src: z.string().min(1), alt: z.string().optional() }),
  z.object({ type: z.literal('video'), src: z.string().min(1), title: z.string().optional() }),
])

export const productReferenceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  kind: z.enum(['product-page', 'documentation', 'pdf', 'other']).optional(),
})

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  valueProposition: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  logo: z.string().min(1),
  image: z.string().min(1),
  media: z.array(productMediaSchema).default([]),
  references: z.array(productReferenceSchema).default([]),

  // Legacy compatibility (some non-kiosk components still reference these)
  price: z.string().default('Contact for pricing'),
  specs: z.record(z.string()).default({}),
  isNew: z.boolean().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
})

export type ProductFromJson = z.infer<typeof productSchema>
