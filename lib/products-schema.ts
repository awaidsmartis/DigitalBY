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

  // Optional rich marketing content (used by MOCA Client)
  cta: z
    .object({
      primary: z.object({ label: z.string().min(1), url: z.string().url() }),
      secondary: z.object({ label: z.string().min(1), url: z.string().url() }).optional(),
    })
    .optional(),

  stats: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
        note: z.string().optional(),
      })
    )
    .optional(),

  highlights: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).optional(),

  keyFeatures: z
    .array(
      z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        bullets: z.array(z.string()).default([]),
      })
    )
    .optional(),

  benefits: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).optional(),

  useCases: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).optional(),

  blogs: z
    .array(
      z.object({
        title: z.string().min(1),
        author: z.string().min(1),
        date: z.string().min(1),
        url: z.string().url().optional(),
      })
    )
    .optional(),

  faqs: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).optional(),

  // Legacy compatibility (some non-kiosk components still reference these)
  price: z.string().default('Contact for pricing'),
  specs: z.record(z.string()).default({}),
  isNew: z.boolean().optional(),
  rating: z.number().optional(),
  reviews: z.number().optional(),
})

export type ProductFromJson = z.infer<typeof productSchema>
