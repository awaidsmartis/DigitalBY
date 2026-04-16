/**
 * Smooth scroll to element by ID with optional offset
 */
export function smoothScrollToElement(elementId: string, offset = 80) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Trigger animation when element comes into view
 */
export function observeElementAnimation(
  selector: string,
  callback: (element: HTMLElement) => void
) {
  if (typeof window === 'undefined') return

  const elements = document.querySelectorAll(selector)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target as HTMLElement)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  elements.forEach((element) => observer.observe(element))

  return observer
}

/**
 * Get scroll progress percentage
 */
export function getScrollProgress(): number {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollHeight === 0) return 0
  return (window.scrollY / scrollHeight) * 100
}
