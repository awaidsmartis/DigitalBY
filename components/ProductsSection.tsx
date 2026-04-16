'use client'

import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  isNew?: boolean
  rating?: number
  price?: string
}

interface ProductsSectionProps {
  title?: string
  subtitle?: string
  products: Product[]
  showNew?: boolean
}

export default function ProductsSection({
  title = "Our Products",
  subtitle = "Explore our latest innovations and cutting-edge solutions",
  products,
  showNew = true,
}: ProductsSectionProps) {
  // Sort by isNew first if showNew is true
  const sortedProducts = showNew
    ? [...products].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    : products

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/2 via-transparent to-secondary/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 100}
            />
          ))}
        </div>

        {/* View All Button */}
        {products.length > 6 && (
          <div className="flex justify-center mt-12 animate-fade-in-up">
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105">
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
