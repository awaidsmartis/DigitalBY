'use client'

import BottomLeftControls from '@/components/BottomLeftControls'
import LoadingScreen from '@/components/LoadingScreen'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useProducts } from '@/hooks/useProducts'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Gauge,
  LayoutGrid,
  LifeBuoy,
  Sparkles,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  productId: string
  /** When embedded inside another scroll container (e.g., modal), avoid owning the page scroll & controls. */
  embedded?: boolean
  /** Override the default “Back” navigation (used when embedded). */
  onBack?: () => void
}

type TocSection = {
  id: string
  label: string
  show?: boolean
}

export default function ProductDetailRichPageClient({ productId, embedded, onBack }: Props) {
  const router = useRouter()
  const { state, productById } = useProducts()

  const [activeSection, setActiveSection] = useState<string>('overview')
  const tocRef = useRef<HTMLDivElement | null>(null)

  // IMPORTANT: do not early-return before all hooks have been called.
  const product = state.status === 'ready' ? productById?.(productId) : undefined

  const hostnameFor = (url: string) => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  }

  const isSmartAppsUrl = (url: string) => {
    try {
      const host = new URL(url).hostname.toLowerCase()
      return host === 'smartapps.com' || host.endsWith('.smartapps.com')
    } catch {
      return false
    }
  }

  const isSmartIsProductUrl = (url: string) => {
    try {
      const u = new URL(url)
      const host = u.hostname.toLowerCase()
      const pathname = u.pathname.toLowerCase()
      return host === 'www.smart-is.com' && pathname.includes('/what-we-do/smart-product')
    } catch {
      return false
    }
  }

  const isDownloadLabel = (label: string) => /download/i.test(label)

  const tocSections: TocSection[] = useMemo(() => {
    const has = {
      highlights: Boolean(product?.highlights?.length),
      stats: Boolean(product?.stats?.length),
      keyFeatures: Boolean(product?.keyFeatures?.length),
      benefits: Boolean(product?.benefits?.length),
      useCases: Boolean(product?.useCases?.length),
      faqs: Boolean(product?.faqs?.length),
      links: Boolean(product?.references?.length),
    }

    return [
      { id: 'overview', label: 'Overview', show: true },
      { id: 'highlights', label: 'Highlights', show: has.highlights },
      { id: 'stats', label: 'Stats', show: has.stats },
      { id: 'key-features', label: 'Key Features', show: has.keyFeatures },
      { id: 'benefits', label: 'Benefits', show: has.benefits },
      { id: 'use-cases', label: 'Use Cases', show: has.useCases },
      // Blogs are explicitly excluded from rich product details.
      { id: 'faq', label: 'FAQ', show: has.faqs },
      { id: 'links', label: 'Links', show: has.links },
    ].filter(s => s.show)
  }, [
    product?.benefits?.length,
    product?.faqs?.length,
    product?.highlights?.length,
    product?.keyFeatures?.length,
    product?.references?.length,
    product?.stats?.length,
    product?.useCases?.length,
  ])

  const marketingImages = useMemo(() => {
    const imgs = (product?.media ?? []).filter((m) => m.type === 'image') as Array<{
      type: 'image'
      src: string
      alt?: string
    }>
    // Use up to 6 images for the brochure/story blocks (e.g., Moca1 → Moca6)
    return imgs.slice(0, 6)
  }, [product?.media])

  // Prevent id collisions when this component is embedded on a page that might already
  // contain other sections with the same ids.
  const idPrefix = embedded ? `product-${productId}-details-` : ''
  const sectionId = (id: string) => `${idPrefix}${id}`
  const sectionScrollMt = embedded ? 'scroll-mt-24' : 'scroll-mt-28'

  // When embedded, ensure the first section is considered active initially
  useEffect(() => {
    setActiveSection('overview')
  }, [productId])

  useEffect(() => {
    if (state.status !== 'ready') return

    const rawIds = tocSections.map(s => s.id)
    const ids = rawIds.map(sectionId)
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = visible[0]
        const fullId = (top?.target as HTMLElement | undefined)?.id
        if (!fullId) return

        const rawId = idPrefix && fullId.startsWith(idPrefix) ? fullId.slice(idPrefix.length) : fullId
        if (rawId && rawIds.includes(rawId)) setActiveSection(rawId)
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0.05, 0.12, 0.2, 0.35] }
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [idPrefix, state.status, tocSections])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(sectionId(id))
    if (!el) return

    // Embedded mode lives inside the ProductDetail modal's internal scroll container.
    // Scrolling the container directly is more reliable than relying on `scrollIntoView`
    // (which can occasionally land a section under the sticky sub-nav).
    if (embedded) {
      const container = el.closest('[data-scroll-container="product-detail-modal"]') as HTMLElement | null
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        const stickyOffset = 88 // sticky sub-nav height + spacing
        const nextTop = container.scrollTop + (elRect.top - containerRect.top) - stickyOffset
        container.scrollTo({ top: Math.max(0, nextTop), behavior: 'smooth' })
        return
      }
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (state.status === 'loading') {
    return <LoadingScreen label="Loading" />
  }

  if (state.status === 'error') {
    return (
      <div className="min-h-screen bg-digitalby text-white flex items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xl font-black">Failed to load product</div>
          <div className="text-slate-400 text-sm mt-2">{state.error}</div>
          <button
            onClick={() => router.push('/products')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10"
            type="button"
          >
            <ArrowLeft size={18} />
            Back to products
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-digitalby text-white flex items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xl font-black">Product not found</div>
          <button
            onClick={() => router.push('/products')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10"
            type="button"
          >
            <ArrowLeft size={18} />
            Back to products
          </button>
        </div>
      </div>
    )
  }

  const rootClassName = embedded
    ? 'text-white'
    : // NOTE: the app layout locks body/html scrolling (kiosk). This page must scroll internally.
      'h-screen bg-digitalby text-white overflow-y-auto overscroll-contain'

  return (
    <div className={rootClassName}>
      {!embedded ? <BottomLeftControls /> : null}

      {!embedded ? (
        <>
          {/* Top bar */}
          <div className="sticky top-0 z-20 border-b border-white/10 bg-digitalby/70 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  if (onBack) return onBack()
                  router.push(`/products/${productId}`)
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                type="button"
              >
                <ArrowLeft size={18} />
                Back
              </button>

              {product.cta && (
                <div className="hidden sm:flex items-center gap-2">
                  {[product.cta.primary, product.cta.secondary]
                    .filter(
                      c =>
                        c?.url &&
                        !isDownloadLabel(c.label) &&
                        !isSmartAppsUrl(c.url) &&
                        !isSmartIsProductUrl(c.url)
                    )
                    .map((c, idx) => (
                      <a
                        key={`${c.label}-${c.url}`}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          'inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold transition ' +
                          (idx === 0
                            ? 'bg-primary text-white hover-primary'
                            : 'bg-white/10 hover:bg-white/15 border border-white/10')
                        }
                      >
                        <ExternalLink size={16} />
                        {c.label}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* HERO (no images per requirement; use gradients + glow) */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-digitalby/75 to-digitalby" />
              <div className="absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-primary/22 blur-3xl" />
              <div className="absolute -bottom-40 -left-28 w-[560px] h-[560px] rounded-full bg-white/10 blur-3xl" />
              <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur"
              >
                <Sparkles className="text-primary" size={16} />
                <span className="text-sm text-slate-200">{product.category}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                className="mt-4 text-4xl md:text-6xl font-black leading-tight"
              >
                {product.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
                className="mt-5 text-lg md:text-xl text-slate-200/90 max-w-3xl"
              >
                {product.shortDescription}
              </motion.p>
            </div>
          </div>
        </>
      ) : null}

      {/* BODY */}
      <div
        className={
          embedded
            ? 'mx-auto max-w-6xl px-0 md:px-2 pb-2 pt-0 relative'
            : // Pull the content slightly into the hero so the first cards don't “hard cut” at the hero edge
              'mx-auto max-w-6xl px-6 pb-20 -mt-10 pt-6 relative z-10'
        }
      >
        <div className={embedded ? 'grid grid-cols-1 gap-10' : 'grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10'}>
          {/* TOC (page mode only) */}
          {!embedded ? (
            <div className="hidden lg:block">
              <div
                ref={tocRef}
                className="sticky top-[92px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-4"
              >
                <div className="text-xs tracking-widest text-slate-400 px-2 py-2">ON THIS PAGE</div>
                <div className="mt-2 space-y-1">
                  {tocSections.map((s) => {
                    const isActive = activeSection === s.id
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollToSection(s.id)}
                        className={
                          'w-full text-left px-3 py-2 rounded-2xl border transition flex items-center justify-between ' +
                          (isActive
                            ? 'bg-white/10 border-white/15 text-white'
                            : 'bg-transparent border-transparent text-slate-300 hover:bg-white/5')
                        }
                      >
                        <span className="text-sm font-semibold">{s.label}</span>
                        <ChevronRight size={16} className={isActive ? 'text-primary' : 'text-slate-500'} />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : null}

          {/* CONTENT */}
          <div className={embedded ? 'space-y-10 px-3 sm:px-5 md:px-8 pb-8 sm:pb-10' : 'space-y-10'}>
            <section id={sectionId('overview')} className={sectionScrollMt}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 text-slate-300">
                      <LayoutGrid size={18} className="text-primary" />
                      <span className="text-sm font-bold">Overview</span>
                    </div>
                    <div className="mt-3 text-slate-200 leading-relaxed">{product.description}</div>
                  </div>

                  {marketingImages[0]?.src ? (
                    <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 bg-black/25">
                      <Image
                        src={marketingImages[0].src}
                        alt={marketingImages[0].alt ?? `${product.name} screenshot`}
                        fill
                        sizes="(min-width: 1024px) 520px, 92vw"
                        className="object-contain p-4"
                      />
                    </div>
                  ) : null}
                </div>

                {product.cta && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[product.cta.primary, product.cta.secondary]
                      .filter(
                        c =>
                          c?.url &&
                          !isDownloadLabel(c.label) &&
                          !isSmartAppsUrl(c.url) &&
                          !isSmartIsProductUrl(c.url)
                      )
                      .map((c, idx) => (
                        <a
                          key={`${c.label}-${c.url}`}
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={
                            'inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition ' +
                            (idx === 0
                              ? 'bg-primary text-white hover-primary'
                              : 'bg-white/10 hover:bg-white/15 border border-white/10 text-white')
                          }
                        >
                          <ExternalLink size={18} />
                          {c.label}
                        </a>
                      ))}
                  </div>
                )}
              </motion.div>
            </section>

            {product.highlights?.length ? (
              <section id={sectionId('highlights')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Highlights</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {product.highlights.map((h, idx) => (
                    <motion.div
                      key={h.label}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.03, 0.12) }}
                      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-5"
                    >
                      <div className="text-2xl font-black text-white leading-tight break-words line-clamp-2">
                        {h.value}
                      </div>
                      <div className="text-slate-300 text-sm mt-1 leading-snug break-words line-clamp-3">
                        {h.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            ) : null}

            {product.stats?.length ? (
              <section id={sectionId('stats')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <Gauge size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Stats</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {product.stats.map((s) => (
                    <Card key={s.label} className="bg-white/5 border-white/10 text-white">
                      <CardHeader className="pb-2 px-5 sm:px-6">
                        <CardTitle className="text-2xl sm:text-3xl font-black text-white leading-tight break-words">
                          {s.value}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 px-5 sm:px-6">
                        <div className="text-slate-200 font-semibold leading-snug break-words">{s.label}</div>
                        {s.note && <div className="text-slate-400 text-sm">{s.note}</div>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            {product.keyFeatures?.length ? (
              <section id={sectionId('key-features')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Key Features</h2>
                </div>
                <div className="space-y-8">
                  {product.keyFeatures.map((kf, idx) => {
                    // Use images sequentially (Moca2 → Moca6) for alternating brochure blocks.
                    // (Moca1 is used in the Overview block above.)
                    const img = marketingImages[idx + 1]
                    const hasImg = Boolean(img?.src)
                    const reversed = idx % 2 === 1

                    return (
                      <motion.div
                        key={kf.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.45, ease: 'easeOut', delay: Math.min(idx * 0.02, 0.12) }}
                        className={hasImg ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 items-center' : ''}
                      >
                        {hasImg ? (
                          <div className={reversed ? 'lg:order-2' : undefined}>
                            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 bg-black/25">
                              <Image
                                src={img!.src}
                                alt={img!.alt ?? `${product.name} screenshot ${idx + 2}`}
                                fill
                                sizes="(min-width: 1024px) 520px, 92vw"
                                className="object-contain p-4"
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className={hasImg && reversed ? 'lg:order-1' : undefined}>
                          <Card className="bg-white/5 border-white/10 text-white">
                            <CardHeader className="space-y-1">
                              <CardTitle className="text-xl font-black">{kf.title}</CardTitle>
                              <p className="text-slate-300">{kf.summary}</p>
                            </CardHeader>
                            {!!kf.bullets?.length && (
                              <CardContent>
                                <div className="space-y-3">
                                  {kf.bullets.map((b, bi) => (
                                    <div key={bi} className="flex items-start gap-3">
                                      <Zap size={18} className="text-primary flex-shrink-0 mt-0.5" />
                                      <p className="text-slate-200">{b}</p>
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            )}
                          </Card>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </section>
            ) : null}

            {product.benefits?.length ? (
              <section id={sectionId('benefits')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <LifeBuoy size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Benefits</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((b) => (
                    <Card key={b.title} className="bg-white/5 border-white/10 text-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-black">{b.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300">{b.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            {product.useCases?.length ? (
              <section id={sectionId('use-cases')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <Gauge size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Use Cases</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.useCases.map((u) => (
                    <Card key={u.title} className="bg-white/5 border-white/10 text-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-black">{u.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300">{u.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ) : null}

            {product.faqs?.length ? (
              <section id={sectionId('faq')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">FAQ</h2>
                </div>
                <Accordion type="single" collapsible className="rounded-3xl border border-white/10 bg-white/5 px-6">
                  {product.faqs.map((f, idx) => (
                    <AccordionItem key={idx} value={`faq-${idx}`} className="border-white/10">
                      <AccordionTrigger className="text-white hover:no-underline">{f.q}</AccordionTrigger>
                      <AccordionContent className="text-slate-300">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ) : null}

            {product.references?.length ? (
              <section id={sectionId('links')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <ExternalLink size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Links</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.references
                    .filter(r => r?.url && !isSmartAppsUrl(r.url) && !isSmartIsProductUrl(r.url))
                    .map((r) => (
                    <a
                      key={r.label}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 p-5 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-white font-black group-hover:text-primary transition-colors">{r.label}</div>
                          <div className="text-slate-400 text-xs mt-1 truncate">{hostnameFor(r.url)}</div>
                        </div>
                        <ExternalLink size={18} className="text-slate-400 group-hover:text-white" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
