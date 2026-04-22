
import BottomLeftControls from '@/components/BottomLeftControls'
import LoadingScreen from '@/components/LoadingScreen'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProducts } from '@/hooks/useProducts'
import { useUiPreferences } from '@/hooks/useUiPreferences'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowUp,
  ChevronDown,
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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Props = {
  productId: string
  /** When embedded inside another scroll container (e.g., modal), avoid owning the page scroll & controls. */
  embedded?: boolean
  /** Override the default “Back” navigation (used when embedded). */
  onBack?: () => void
  /** When embedded, optionally auto-scroll to a particular section on first mount (e.g., deep-link to benefits). */
  initialSectionId?: string
}

type TocSection = {
  id: string
  label: string
  show?: boolean
}

export default function ProductDetailRichPageClient({ productId, embedded, onBack, initialSectionId }: Props) {
  const router = useRouter()
  const { state, productById } = useProducts()
  const { prefs } = useUiPreferences()

  const [activeSection, setActiveSection] = useState<string>('overview')
  const [embeddedMobileScrollMode, setEmbeddedMobileScrollMode] = useState(false)
  const embeddedTabsWrapRef = useRef<HTMLDivElement | null>(null)
  const embeddedTabsMeasureRef = useRef<HTMLDivElement | null>(null)
  const tocRef = useRef<HTMLDivElement | null>(null)
  const didAutoScrollRef = useRef<Record<string, boolean>>({})
  const [embeddedTabsCondensed, setEmbeddedTabsCondensed] = useState(false)
  const [embeddedTabsMaxPrimary, setEmbeddedTabsMaxPrimary] = useState<number>(3)
  const [showLayoutToast, setShowLayoutToast] = useState(false)

  const embeddedSectionStorageKey = useMemo(() => {
    return `digitalby:productDetailActiveSection:v1:${productId}`
  }, [productId])

  // IMPORTANT: do not early-return before all hooks have been called.
  const product = state.status === 'ready' ? productById?.(productId) : undefined

  // Only enable the "continuous scroll" tabs behavior on mobile + tablet portrait.
  // Desktop / tablet landscape should keep the original "single section" experience.
  useEffect(() => {
    if (!embedded) {
      setEmbeddedMobileScrollMode(false)
      return
    }

    const update = () => {
      const w = window.innerWidth
      const isPortrait =
        window.matchMedia?.('(orientation: portrait)')?.matches ?? window.innerHeight >= window.innerWidth
      const isSmallEnough = w <= 1024
      setEmbeddedMobileScrollMode(Boolean(isPortrait && isSmallEnough))
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [embedded])

  const embeddedUseContinuousScroll = embedded && embeddedMobileScrollMode

  const embeddedUseBottomTabs = Boolean(embeddedUseContinuousScroll && prefs.productTabsBottomOnMobile)

  // Keep the pill size stable (no visual jump when the sticky bar toggles condensed/not).
  // Slightly smaller than before so long labels (e.g. “Use Cases”) don’t feel oversized.
  const tabPillSizeClass = 'h-10 px-3.5 text-[13px]'

  // Quick visual hint when the user toggles the layout.
  useEffect(() => {
    if (!embedded) return

    setShowLayoutToast(true)
    const t = window.setTimeout(() => setShowLayoutToast(false), 900)
    return () => window.clearTimeout(t)
  }, [embedded, embeddedUseBottomTabs])

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
      valueProposition: Boolean(product?.valueProposition?.length),
      legacyFeatures: Boolean(product?.features?.length),
      useCases: Boolean(product?.useCases?.length),
      faqs: Boolean(product?.faqs?.length),
      links: Boolean(product?.references?.length),
    }

    const hasValue = has.highlights || has.stats || has.valueProposition

    // Content-driven naming rules:
    // - Benefits: valueProposition + (or) benefits
    // - How it works: keyFeatures
    // - Features: legacy features list (only when keyFeatures is absent to avoid overlap)
    const hasBenefits = has.benefits || has.valueProposition
    const howItWorksLabel = 'How it works'
    const showLegacyFeatures = has.legacyFeatures && !has.keyFeatures

    return [
      { id: 'overview', label: 'Overview', show: true },
      { id: 'value', label: 'Value', show: hasValue },
      { id: 'benefits', label: 'Benefits', show: hasBenefits },
      { id: 'key-features', label: howItWorksLabel, show: has.keyFeatures },
      { id: 'features', label: 'Features', show: showLegacyFeatures },
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
    product?.valueProposition?.length,
    product?.features?.length,
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
  // Embedded mode has a sticky tab bar, so we need more scroll-margin.
  // If tabs are at the bottom, we can use a smaller top margin (and add bottom padding).
  const sectionScrollMt = embedded
    ? embeddedUseBottomTabs
      ? 'scroll-mt-20 pb-24'
      : 'scroll-mt-36 pt-3'
    : 'scroll-mt-28'

  // When embedded, restore the last selected section for this product (session-only)
  // so the user returns to the same tab after leaving details.
  // If a deep-link section is provided, it wins.
  useEffect(() => {
    if (!embedded) {
      setActiveSection(initialSectionId ?? 'overview')
      return
    }

    if (initialSectionId) {
      setActiveSection(initialSectionId)
      return
    }

    try {
      const saved = window.sessionStorage.getItem(embeddedSectionStorageKey)
      const allowed = new Set(tocSections.map(s => s.id))
      if (saved && allowed.has(saved)) {
        setActiveSection(saved)
        return
      }
    } catch {
      // ignore
    }

    setActiveSection('overview')
  }, [embedded, embeddedSectionStorageKey, initialSectionId, productId, tocSections])

  // Persist embedded active section whenever it changes.
  useEffect(() => {
    if (!embedded) return
    try {
      window.sessionStorage.setItem(embeddedSectionStorageKey, activeSection)
    } catch {
      // ignore
    }
  }, [activeSection, embedded, embeddedSectionStorageKey])

  useEffect(() => {
    // In embedded mode we render one section at a time (classic tabs),
    // so scroll-spy observers aren't useful.
    if (embedded) return
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
  }, [embedded, idPrefix, state.status, tocSections])

  const getEmbeddedScrollContainer = useCallback((el?: HTMLElement | null) => {
    return (
      (el?.closest?.('[data-scroll-container="product-detail-modal"]') as HTMLElement | null) ??
      (document.querySelector('[data-scroll-container="product-detail-modal"]') as HTMLElement | null)
    )
  }, [])

  const scrollEmbeddedToTop = useCallback(() => {
    const container = getEmbeddedScrollContainer(null)
    if (!container) return
    container.scrollTo({ top: 0, behavior: 'smooth' })
  }, [getEmbeddedScrollContainer])

  const [showBackToTop, setShowBackToTop] = useState(false)

  // Show the mobile "back to top" only after user scrolls a bit.
  useEffect(() => {
    if (!embeddedUseContinuousScroll) {
      setShowBackToTop(false)
      return
    }

    const container = getEmbeddedScrollContainer(null)
    if (!container) return

    const onScroll = () => {
      setShowBackToTop(container.scrollTop > 240)
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [embeddedUseContinuousScroll, getEmbeddedScrollContainer])

  const scrollToSection = useCallback((
    id: string,
    opts?: {
      behavior?: ScrollBehavior
      /** Avoid re-scrolling when we're already basically at the target (prevents jitter). */
      onlyIfFar?: boolean
    }
  ) => {
    const el = document.getElementById(sectionId(id))
    if (!el) return

    // Embedded mode lives inside the ProductDetail modal's internal scroll container.
    // Scrolling the container directly is more reliable than relying on `scrollIntoView`
    // (which can occasionally land a section under the sticky sub-nav).
    if (embedded) {
      const container = getEmbeddedScrollContainer(el)
      if (container) {
        const containerRect = container.getBoundingClientRect()
        const elRect = el.getBoundingClientRect()
        // Keep the section a bit LOWER (more breathing room below the sticky tabs).
        // This also helps avoid the feeling that the section is being shoved under the nav.
        const stickyOffset = 128
        const nextTop = container.scrollTop + (elRect.top - containerRect.top) - stickyOffset

        const targetTop = Math.max(0, nextTop)
        if (opts?.onlyIfFar && Math.abs(container.scrollTop - targetTop) < 8) return

        container.scrollTo({ top: targetTop, behavior: opts?.behavior ?? 'smooth' })
        return
      }
    }

    el.scrollIntoView({ behavior: opts?.behavior ?? 'smooth', block: 'start' })
  }, [embedded, getEmbeddedScrollContainer, sectionId])

  const handleEmbeddedTabSelect = useCallback(
    (nextId: string) => {
      setActiveSection(nextId)
      if (embeddedUseContinuousScroll) {
        scrollToSection(nextId, { behavior: 'smooth', onlyIfFar: true })
      }
    },
    [embeddedUseContinuousScroll, scrollToSection]
  )

  // Embedded sticky tabs: subtle “condense” animation once the user scrolls down.
  useEffect(() => {
    if (!embedded) return

    const anyEl = document.getElementById(sectionId('overview'))
    const container = anyEl?.closest('[data-scroll-container="product-detail-modal"]') as HTMLElement | null
    if (!container) return

    const onScroll = () => {
      setEmbeddedTabsCondensed(container.scrollTop > 8)
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [embedded, sectionId])

  // Embedded deep-link support: select a section once per product id.
  useEffect(() => {
    if (!embedded) return
    if (!initialSectionId) return
    if (state.status !== 'ready') return
    if (didAutoScrollRef.current[productId]) return

    const allowed = new Set(tocSections.map(s => s.id))
    if (!allowed.has(initialSectionId)) return

    didAutoScrollRef.current[productId] = true
    setActiveSection(initialSectionId)
  }, [embedded, initialSectionId, productId, state.status, tocSections])

  // In embedded mode, keep the primary tabs minimal and push the rest into a “More” dropdown.
  const tabPriority = useCallback((id: string) => {
    switch (id) {
      case 'overview':
        return 0
      case 'value':
        return 1
      case 'benefits':
        return 2
      case 'key-features':
        return 3
      case 'use-cases':
        return 4
      case 'features':
        return 5
      case 'faq':
        return 6
      case 'links':
        return 7
      default:
        return 99
    }
  }, [])

  // Responsive embedded tabs: show as many pills as we can fit; only show “More” when needed.
  // Uses real DOM widths (no heuristics) to avoid showing “More” when there is empty space.
  useEffect(() => {
    if (!embedded) return
    if (typeof ResizeObserver === 'undefined') return

    const wrap = embeddedTabsWrapRef.current
    const measureRow = embeddedTabsMeasureRef.current
    if (!wrap || !measureRow) return

    const measure = () => {
      const listEl = wrap.querySelector<HTMLElement>('[data-slot="tabs-list"]')
      const containerWidth = (listEl ?? wrap).getBoundingClientRect().width
      if (!containerWidth || Number.isNaN(containerWidth)) return

      const ordered = [...tocSections].sort((a, b) => tabPriority(a.id) - tabPriority(b.id))
      if (!ordered.length) return

      const nodes = Array.from(measureRow.querySelectorAll<HTMLElement>('[data-measure="tab"]'))
      const moreNode = measureRow.querySelector<HTMLElement>('[data-measure="more"]')
      if (nodes.length !== ordered.length || !moreNode) return

      const style = window.getComputedStyle(listEl ?? wrap)
      const gap = Number.parseFloat(style.columnGap || '0') || 4
      const padL = Number.parseFloat(style.paddingLeft || '0') || 0
      const padR = Number.parseFloat(style.paddingRight || '0') || 0
      const available = Math.max(0, containerWidth - padL - padR)

      let used = 0
      let count = 0
      for (let i = 0; i < nodes.length; i++) {
        const remainingAfter = nodes.length - (i + 1)
        const needsMore = remainingAfter > 0

        const w = nodes[i].offsetWidth
        const nextUsed = used + (count > 0 ? gap : 0) + w
        const reserved = needsMore ? (gap + moreNode.offsetWidth) : 0

        if (nextUsed + reserved <= available) {
          used = nextUsed
          count++
        } else {
          break
        }
      }

      setEmbeddedTabsMaxPrimary(Math.max(1, count))
    }

    // Run after layout.
    requestAnimationFrame(measure)

    const ro = new ResizeObserver(() => requestAnimationFrame(measure))
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [embedded, tabPillSizeClass, tabPriority, tocSections])

  const { primaryTabs, moreTabs } = useMemo(() => {
    if (!embedded) return { primaryTabs: tocSections, moreTabs: [] as TocSection[] }

    const sorted = [...tocSections].sort((a, b) => tabPriority(a.id) - tabPriority(b.id))

    // Keep it tight so we never need horizontal scrolling.
    const maxPrimary = Math.max(1, Math.min(embeddedTabsMaxPrimary, sorted.length))
    const prim = sorted.slice(0, maxPrimary)

    const primaryIds = new Set(prim.map(t => t.id))
    const more = tocSections.filter(t => !primaryIds.has(t.id))

    // Preserve original order in the dropdown.
    return { primaryTabs: prim, moreTabs: more }
  }, [embedded, embeddedTabsMaxPrimary, tabPriority, tocSections])

  const activeMoreTab = moreTabs.find(t => t.id === activeSection)

  const shouldRenderSection = useCallback(
    (id: string) => {
      if (!embedded) return true
      if (embeddedUseContinuousScroll) return true
      // Desktop / tablet landscape: keep original behavior (only active section mounted)
      return activeSection === id
    },
    [activeSection, embedded, embeddedUseContinuousScroll]
  )

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
                      (c): c is NonNullable<typeof c> =>
                        c != null &&
                        typeof c.url === 'string' &&
                        typeof c.label === 'string' &&
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
            ? 'w-full px-0 pb-2 pt-0 relative'
            : // Pull the content slightly into the hero so the first cards don't “hard cut” at the hero edge
              'mx-auto max-w-6xl px-6 pb-20 -mt-10 pt-6 relative z-10'
        }
      >
        {embedded && showLayoutToast ? (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-black/55 border border-white/10 backdrop-blur text-xs text-white">
            Updating layout…
          </div>
        ) : null}
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
          <div className={embedded ? 'space-y-10 px-2 sm:px-3 md:px-4 pb-8 sm:pb-10' : 'space-y-10'}>
            {/* Embedded mode: sticky scroll-spy tabs (single source of truth for navigation) */}
            {embedded ? (
              <div
                className={
                  (embeddedUseBottomTabs
                    ? 'fixed bottom-0 left-0 right-0 z-30 px-2 sm:px-3 md:px-4 pb-[env(safe-area-inset-bottom)] border-t border-white/10 bg-digitalby/65 backdrop-blur-xl transition-all '
                    : 'sticky top-3 sm:top-4 z-30 -mx-2 sm:-mx-3 md:-mx-4 px-2 sm:px-3 md:px-4 border-b border-white/10 bg-digitalby/65 backdrop-blur-xl transition-all ') +
                  // Keep height stable; only add shadow when scrolled.
                  ('pt-2 pb-3 ' + (embeddedTabsCondensed ? 'shadow-lg shadow-black/20' : ''))
                }
              >
                <Tabs
                  value={activeSection}
                  onValueChange={(v) => {
                    handleEmbeddedTabSelect(v)
                  }}
                >
                  <div ref={embeddedTabsWrapRef} className="w-full">
                    <TabsList
                      className={
                        // NOTE: allow overflow-visible so the active pill shadow and rounded corners
                        // don't get clipped on the right edge (especially the “More” pill).
                        'w-full max-w-full h-auto bg-white/5 border border-white/10 rounded-2xl gap-1 flex items-center justify-start overflow-visible ' +
                        // padding: keep extra right padding at all sizes to avoid last-pixel clipping.
                        'p-1 pr-2 sm:p-1.5 sm:pr-3'
                      }
                    >
                      {primaryTabs.map((s) => (
                      <TabsTrigger
                        key={s.id}
                        value={s.id}
                        onPointerDown={() => {
                          // Support tapping the active tab: still scroll to that section (mobile portrait only).
                          if (embeddedUseContinuousScroll) {
                            scrollToSection(s.id, { behavior: 'smooth', onlyIfFar: true })
                          }
                        }}
                        className={
                          'flex-none relative rounded-xl font-bold text-slate-200/80 hover:text-white hover:bg-white/10 ' +
                          tabPillSizeClass +
                          ' data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow ' +
                          'after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:rounded-full after:bg-primary after:opacity-0 ' +
                          'data-[state=active]:after:opacity-100 after:transition-opacity'
                        }
                      >
                        {s.label}
                      </TabsTrigger>
                      ))}

                      {moreTabs.length ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={
                              'flex-none relative rounded-xl font-bold transition inline-flex items-center gap-2 border border-transparent ' +
                              tabPillSizeClass +
                              ' ' +
                              (activeMoreTab
                                ? 'bg-white text-slate-900 shadow'
                                : 'text-slate-200/80 hover:text-white hover:bg-white/10')
                            }
                            aria-label="More sections"
                          >
                            <span className="truncate max-w-[120px]">
                              {activeMoreTab ? activeMoreTab.label : 'More'}
                            </span>
                            <ChevronDown size={14} className={activeMoreTab ? 'text-slate-900' : 'text-slate-300'} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-56 bg-digitalby/95 text-white border border-white/10 backdrop-blur-xl"
                        >
                          {moreTabs.map((t) => (
                            <DropdownMenuItem
                              key={t.id}
                              className={
                                'cursor-pointer ' +
                                (t.id === activeSection ? 'bg-white/10 text-white' : 'text-slate-200')
                              }
                              onSelect={() => {
                                handleEmbeddedTabSelect(t.id)
                              }}
                            >
                              {t.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      ) : null}
                    </TabsList>
                  </div>
                </Tabs>

                {/* measurement row (invisible) */}
                <div
                  ref={embeddedTabsMeasureRef}
                  className="absolute -left-[9999px] top-0 opacity-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="inline-flex items-center gap-1 p-1">
                    {[...tocSections]
                      .sort((a, b) => tabPriority(a.id) - tabPriority(b.id))
                      .map((s) => (
                        <div
                          key={`measure-${s.id}`}
                          data-measure="tab"
                          className={
                            'flex-none inline-flex items-center justify-center rounded-xl font-bold whitespace-nowrap ' +
                            tabPillSizeClass
                          }
                        >
                          {s.label}
                        </div>
                      ))}
                    <div
                      data-measure="more"
                      className={
                        'flex-none inline-flex items-center gap-2 rounded-xl font-bold whitespace-nowrap border border-transparent ' +
                        tabPillSizeClass
                      }
                    >
                      <span>More</span>
                      <ChevronDown size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {embedded ? (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
                    {shouldRenderSection('overview') ? (
                    <section id={sectionId('overview')} className={sectionScrollMt}>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6"
                      >
                        <div
                          className={
                            'grid grid-cols-1 gap-6 items-center ' +
                            (!embedded && marketingImages[0]?.src ? 'lg:grid-cols-2' : '')
                          }
                        >
                          <div>
                            <div className="inline-flex items-center gap-2 text-slate-300">
                              <LayoutGrid size={18} className="text-primary" />
                              <span className="text-sm font-bold">Overview</span>
                            </div>
                            {!!product.shortDescription && (
                              <div className="mt-3 text-slate-200 font-semibold">{product.shortDescription}</div>
                            )}
                            <div className="mt-3 text-slate-200 leading-relaxed">{product.description}</div>
                          </div>
                        </div>

                        {product.cta && (
                          <div className="mt-6 flex flex-wrap gap-3">
                            {[product.cta.primary, product.cta.secondary]
                              .filter(
                                (c): c is NonNullable<typeof c> =>
                                  c != null &&
                                  typeof c.url === 'string' &&
                                  typeof c.label === 'string' &&
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
                    ) : null}

                  {shouldRenderSection('value') && (product.highlights?.length || product.stats?.length || product.valueProposition?.length) ? (
                    <section id={sectionId('value')} className={sectionScrollMt}>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={18} className="text-primary" />
                        <h2 className="text-2xl md:text-3xl font-black">Value</h2>
                      </div>
                      {!!product.valueProposition?.length ? (
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                          <div className="text-white font-black">Why it matters</div>
                          <div className="mt-3 space-y-3">
                            {(product.valueProposition ?? []).map((v, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <p className="text-slate-200">{v}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {!!product.highlights?.length ? (
                        <div className={product.valueProposition?.length ? 'mt-6' : ''}>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {product.highlights.map((h, idx) => (
                              <motion.div
                                key={h.label}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.12) }}
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
                        </div>
                      ) : null}

                      {!!product.stats?.length ? (
                        <div className={(product.valueProposition?.length || product.highlights?.length) ? 'mt-6' : ''}>
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
                        </div>
                      ) : null}
                    </section>
                  ) : null}

                  {/* Other sections below remain unchanged and will render when active */}
                  {(product.benefits?.length || product.valueProposition?.length) && shouldRenderSection('benefits') ? (
                    <section id={sectionId('benefits')} className={sectionScrollMt}>
                      <div className="flex items-center gap-2 mb-4">
                        <LifeBuoy size={18} className="text-primary" />
                        <h2 className="text-2xl md:text-3xl font-black">Benefits</h2>
                      </div>
                      {product.benefits?.length ? (
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
                      ) : (
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                          <div className="space-y-3">
                            {(product.valueProposition ?? []).map((v, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <p className="text-slate-200">{v}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </section>
                  ) : null}

                  {product.keyFeatures?.length && shouldRenderSection('key-features') ? (
                    <section id={sectionId('key-features')} className={sectionScrollMt}>
                      <div className="flex items-center gap-2 mb-4">
                        <LayoutGrid size={18} className="text-primary" />
                        <h2 className="text-2xl md:text-3xl font-black">How it works</h2>
                      </div>
                      <div className="space-y-8">
                        {product.keyFeatures.map((kf, idx) => (
                          <motion.div
                            key={kf.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.12) }}
                          >
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
                          </motion.div>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {!product.keyFeatures?.length && product.features?.length && shouldRenderSection('features') ? (
                    <section id={sectionId('features')} className={sectionScrollMt}>
                      <div className="flex items-center gap-2 mb-4">
                        <LayoutGrid size={18} className="text-primary" />
                        <h2 className="text-2xl md:text-3xl font-black">Features</h2>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                        <div className="space-y-3">
                          {product.features.map((f, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Zap size={18} className="text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-slate-200">{f}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  ) : null}

                  {product.useCases?.length && shouldRenderSection('use-cases') ? (
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

                  {product.faqs?.length && shouldRenderSection('faq') ? (
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

                  {product.references?.length && shouldRenderSection('links') ? (
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
                </motion.div>

                {embeddedUseContinuousScroll && showBackToTop && !embeddedUseBottomTabs ? (
                  <button
                    type="button"
                    onClick={scrollEmbeddedToTop}
                    className="fixed left-5 z-40 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur text-white inline-flex items-center justify-center shadow-lg"
                    // Safe-area aware so it doesn’t get cut off by iOS Safari bottom bar.
                    style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
                    aria-label="Back to top"
                  >
                    <ArrowUp size={18} />
                  </button>
                ) : null}
              </>
            ) : null}

            {!embedded ? (
              <>
                {/* Non-embedded: brochure flow */}
                {shouldRenderSection('overview') ? (
                  <section id={sectionId('overview')} className={sectionScrollMt}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6"
                    >
                      <div
                        className={
                          'grid grid-cols-1 gap-6 items-center ' +
                          (!embedded && marketingImages[0]?.src ? 'lg:grid-cols-2' : '')
                        }
                      >
                        <div>
                          <div className="inline-flex items-center gap-2 text-slate-300">
                            <LayoutGrid size={18} className="text-primary" />
                            <span className="text-sm font-bold">Overview</span>
                          </div>
                          {!!product.shortDescription && (
                            <div className="mt-3 text-slate-200 font-semibold">{product.shortDescription}</div>
                          )}
                          <div className="mt-3 text-slate-200 leading-relaxed">{product.description}</div>
                        </div>

                        {!embedded && marketingImages[0]?.src ? (
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
                              (c): c is NonNullable<typeof c> =>
                                c != null &&
                                typeof c.url === 'string' &&
                                typeof c.label === 'string' &&
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
                ) : null}

                {/* NOTE: remaining brochure sections below are unchanged */}
              </>
            ) : null}

            {!embedded && shouldRenderSection('value') && (product.highlights?.length || product.stats?.length || product.valueProposition?.length) ? (
              <section id={sectionId('value')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Value</h2>
                </div>

                {!!product.valueProposition?.length ? (
                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                    <div className="text-white font-black">Why it matters</div>
                    <div className="mt-3 space-y-3">
                      {(product.valueProposition ?? []).map((v, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-slate-200">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {!!product.highlights?.length ? (
                  <div className={product.valueProposition?.length ? 'mt-6' : ''}>
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
                  </div>
                ) : null}

                {!!product.stats?.length ? (
                  <div className={(product.valueProposition?.length || product.highlights?.length) ? 'mt-6' : ''}>
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
                  </div>
                ) : null}
              </section>
            ) : null}

            {!embedded && product.keyFeatures?.length && shouldRenderSection('key-features') ? (
              <section id={sectionId('key-features')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">How it works</h2>
                </div>
                <div className="space-y-8">
                  {product.keyFeatures.map((kf, idx) => {
                    // Use images sequentially (Moca2 → Moca6) for alternating brochure blocks.
                    // (Moca1 is used in the Overview block above.)
                    const img = marketingImages[idx + 1]
                    const hasImg = !embedded && Boolean(img?.src)
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

            {/* Legacy flat features list (only when key-features is absent to avoid overlap) */}
            {!embedded && !product.keyFeatures?.length && product.features?.length && shouldRenderSection('features') ? (
              <section id={sectionId('features')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <LayoutGrid size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Features</h2>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                  <div className="space-y-3">
                    {product.features.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Zap size={18} className="text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-slate-200">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {!embedded && (product.benefits?.length || product.valueProposition?.length) && shouldRenderSection('benefits') ? (
              <section id={sectionId('benefits')} className={sectionScrollMt}>
                <div className="flex items-center gap-2 mb-4">
                  <LifeBuoy size={18} className="text-primary" />
                  <h2 className="text-2xl md:text-3xl font-black">Benefits</h2>
                </div>
                {/*
                  Content rule: don’t remove information.
                  If both `benefits[]` (cards) and `valueProposition[]` (bullets) exist,
                  we show both, but keep it compact and avoid obvious duplicates.
                */}
                {product.benefits?.length ? (
                  <>
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

                    {!!product.valueProposition?.length && (
                      <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                        <div className="text-white font-black">Additional value</div>
                        <div className="mt-3 space-y-3">
                          {(product.valueProposition ?? [])
                            .filter((v) => {
                              const needle = v.trim().toLowerCase()
                              if (!needle) return false
                              const combined = (product.benefits ?? [])
                                .map((b) => `${b.title} ${b.description}`.toLowerCase())
                                .join(' \n ')
                              return !combined.includes(needle)
                            })
                            .map((v, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                <p className="text-slate-200">{v}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6">
                    <div className="space-y-3">
                      {(product.valueProposition ?? []).map((v, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-slate-200">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ) : null}

            {!embedded && product.useCases?.length && shouldRenderSection('use-cases') ? (
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

            {!embedded && product.faqs?.length && shouldRenderSection('faq') ? (
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

            {!embedded && product.references?.length && shouldRenderSection('links') ? (
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
