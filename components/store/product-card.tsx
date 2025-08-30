"use client"

import type { ArcatProduct } from "../../lib/enhanced-renin-products"
import { formatPrice } from "../../lib/enhanced-renin-products"
import { Button } from "../ui/button"
import { RequestQuoteButton } from "../ui/request-quote-button"
import { OptimizedImage } from "../ui/optimized-image"
import { Badge } from "../ui/badge"
import { useState, useEffect } from "react"
import { Clock, Star, Truck, Shield, Eye, Heart } from "lucide-react"

interface ProductCardProps {
  product: ArcatProduct
  priority?: boolean // For above-the-fold images
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [urgencyTimer, setUrgencyTimer] = useState('')
  const [viewCount, setViewCount] = useState(0)
  
  // Generate realistic urgency metrics
  useEffect(() => {
    // Simulate viewing activity
    const baseViews = Math.floor(Math.random() * 15) + 8 // 8-23 viewers
    setViewCount(baseViews)
    
    // Update view count occasionally
    const viewInterval = setInterval(() => {
      setViewCount(prev => prev + (Math.random() > 0.7 ? 1 : 0))
    }, 15000)
    
    // Generate urgency timer for hot products
    if (product.featured || product.bestseller) {
      const hours = Math.floor(Math.random() * 48) + 6 // 6-54 hours
      setUrgencyTimer(`${hours}h`)
    }
    
    return () => clearInterval(viewInterval)
  }, [])

  const getImageSources = () => {
    const sources = []

    // Priority 1: Local ARCAT images
    if (product.arcatImages && product.arcatImages.length > 0) {
      sources.push(...product.arcatImages)
    }

    // Priority 2: External Home Depot image
    if (product.homeDepotImage) {
      sources.push(product.homeDepotImage)
    }

    // Priority 3: Final fallback placeholder
    sources.push(`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`)

    return sources
  }

  const imageSources = getImageSources()
  const primaryImage = imageSources[0]
  const fallbackImage = imageSources[1]

  return (
    <div 
      className="card-apple mobile-card group relative animate-slide-up-fade"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Urgency Badge */}
      {urgencyTimer && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-slate-800 text-white text-xs font-light tracking-wide animate-float shadow-lg backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            Sale ends in {urgencyTimer}
          </Badge>
        </div>
      )}
      
      {/* Popularity Badge */}
      {product.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-sky-400 text-slate-800 text-xs font-light tracking-widest shadow-lg backdrop-blur-sm animate-bounce-gentle">
            <Star className="w-3 h-3 mr-1 fill-current" />
            SIGNATURE
          </Badge>
        </div>
      )}

      {/* Social Proof Indicator */}
      {isHovered && (
        <div className="absolute bottom-20 left-3 z-10 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          <Eye className="w-3 h-3 inline mr-1" />
          {viewCount} people viewing
        </div>
      )}

      <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        )}

        <OptimizedImage
          src={primaryImage || "/placeholder.svg"}
          alt={`${product.name} - Professional closet door by Renin - PG Closets`}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          fallbackSrc={fallbackImage}
          placeholder="blur"
        />

        {/* Quick View Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm hover:bg-slate-800 hover:text-white text-slate-900 border-white/50 font-light tracking-wide uppercase"
              href={`/store/products/${product.slug}`}
            >
              Quick View
            </Button>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Trust Indicators */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-xs text-green-600">
            <Truck className="w-3 h-3 mr-1" />
            <span className="font-light">Expert Install</span>
          </div>
          <div className="flex items-center text-xs text-blue-600">
            <Shield className="w-3 h-3 mr-1" />
            <span className="font-light">Lifetime Warranty</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-light mb-2 group-hover:text-sky-400 transition-colors duration-200 line-clamp-2 tracking-wide uppercase">
            <a href={`/store/products/${product.slug}`} className="hover:underline">
              {product.name}
            </a>
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 font-light">{product.description}</p>
        </div>

        {/* Price with Value Proposition */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-light text-slate-800">{formatPrice(product.price)}</span>
            {product.salePrice && (
              <span className="text-sm text-slate-500 line-through">{formatPrice(product.salePrice)}</span>
            )}
          </div>
          <div className="text-xs text-green-600 font-light">
            ✓ Expert installation • ✓ Transparent pricing
          </div>
        </div>

        {/* Stock Status with Urgency */}
        <div className="mb-4">
          {product.inStock ? (
            <div className="flex items-center justify-between">
              <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-light flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Available - Ready to Ship
              </span>
              {Math.random() > 0.6 && (
                <span className="text-xs text-orange-600 font-light">Limited availability</span>
              )}
            </div>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-light">
              <Clock className="w-3 h-3 mr-1 inline" />
              Available in 2 weeks
            </span>
          )}
        </div>

        {/* Enhanced Conversion-Optimized CTAs */}
        <div className="space-y-3">
          <Button
            className="w-full touch-target group/btn font-light tracking-wide uppercase bg-slate-800 text-white hover:bg-sky-400 hover:text-slate-800 transition-all py-3 rounded-lg"
            href={`/store/products/${product.slug}`}
          >
            <span className="group-hover/btn:scale-110 transition-transform duration-200">✨</span>
            View Collection Details
          </Button>

          <RequestQuoteButton
            product={product}
            className="w-full touch-target justify-center font-light tracking-wide uppercase border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all py-3 rounded-lg"
          />
        </div>

        {/* Social Proof */}
        <div className="mt-3 text-center text-xs text-slate-500 font-light">
          ⭐ 4.9/5 rating • 500+ Ottawa installations
        </div>
      </div>
    </div>
  )
}
