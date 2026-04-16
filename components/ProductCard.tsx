'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

interface ProductCardProps {
  id: string
  name: string
  shortDescription: string
  image: string
  category: string
  isNew?: boolean
  rating?: number
  reviews?: number
  price?: string
  delay?: number
}

export default function ProductCard({
  id,
  name,
  shortDescription,
  image,
  category,
  isNew = false,
  rating = 4.5,
  reviews = 0,
  price = "Contact for pricing",
  delay = 0,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-primary/40 transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-2xl hover:shadow-primary/15 hover:translate-y-[-4px]"
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {isNew && (
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg animate-pulse">
              NEW
            </div>
          )}

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          {/* Category and Title */}
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
              {category}
            </span>
            <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2 flex-1">
            {shortDescription}
          </p>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 py-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-slate-300'}
                />
              ))}
            </div>
            <span className="text-xs text-foreground/60 font-medium ml-1">{rating} ({reviews})</span>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
            <span className="text-sm font-semibold text-primary">{price}</span>
            <ArrowRight size={20} className="text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}
