"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Advanced SEO optimization hooks and utilities
export function useAdvancedSEO() {
  const pathname = usePathname()

  useEffect(() => {
    // CRITICAL: Core Web Vitals optimization
    optimizeCoreWebVitals()
    
    // Local SEO signals
    trackLocalSEOSignals(pathname)
    
    // Performance monitoring
    monitorPagePerformance()
  }, [pathname])
}

// Core Web Vitals Optimization
function optimizeCoreWebVitals() {
  // LCP Optimization - Preload critical images
  if (typeof window !== 'undefined') {
    const criticalImages = [
      '/luxury-walk-in-closet.png',
      '/pg-logo.png',
      '/renin-euro-1-lite-pivot.png'
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })

    // FID Optimization - Reduce main thread blocking
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Initialize non-critical features during idle time
        initializeNonCriticalFeatures()
      })
    }

    // CLS Optimization - Reserve space for dynamic content
    reserveSpaceForDynamicContent()
  }
}

// Local SEO Signal Tracking
function trackLocalSEOSignals(pathname: string) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const locationPages = [
      '/ottawa', '/kanata', '/nepean', '/orleans', '/barrhaven',
      '/barn-doors-ottawa', '/bypass-doors-ottawa', '/bifold-doors-ottawa'
    ]
    
    if (locationPages.some(page => pathname.includes(page))) {
      // Track local page views for SEO
      ;(window as any).gtag('event', 'local_page_view', {
        event_category: 'Local SEO',
        event_label: pathname,
        custom_map: {
          'custom_parameter_1': 'ottawa_local_search'
        }
      })
    }
  }
}

// Performance Monitoring
function monitorPagePerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Monitor key performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Send performance data to analytics
        if ('gtag' in window) {
          ;(window as any).gtag('event', 'page_performance', {
            event_category: 'Performance',
            event_label: entry.name,
            value: Math.round(entry.duration)
          })
        }
      }
    })
    
    observer.observe({ entryTypes: ['navigation', 'resource'] })
  }
}

// Initialize non-critical features during idle time
function initializeNonCriticalFeatures() {
  // Initialize chat widget, analytics extensions, etc.
  console.log('Initializing non-critical features during idle time')
}

// CLS Optimization - Reserve space for dynamic content
function reserveSpaceForDynamicContent() {
  // Add CSS for reserved spaces
  const style = document.createElement('style')
  style.textContent = `
    .hero-image-container {
      aspect-ratio: 16/9;
      min-height: 400px;
    }
    .product-card-image {
      aspect-ratio: 1;
      min-height: 200px;
    }
    .dynamic-content-placeholder {
      min-height: 100px;
    }
  `
  document.head.appendChild(style)
}

// SEO-Optimized Image Component
interface SEOImageProps {
  src: string
  alt: string
  priority?: boolean
  width?: number
  height?: number
  className?: string
}

export function SEOOptimizedImage({ 
  src, 
  alt, 
  priority = false, 
  width, 
  height, 
  className = '' 
}: SEOImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

// Local Business Schema Generator for Ottawa locations
export function generateLocalBusinessSchema(location: string) {
  const locations = {
    ottawa: { lat: '45.4215', lng: '-75.6972' },
    kanata: { lat: '45.3017', lng: '-75.9130' },
    nepean: { lat: '45.3467', lng: '-75.7275' },
    orleans: { lat: '45.4542', lng: '-75.5206' },
    barrhaven: { lat: '45.2633', lng: '-75.7390' }
  }

  const coords = locations[location as keyof typeof locations] || locations.ottawa

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://www.pgclosets.com/${location}#business`,
    name: `PG Closets ${location.charAt(0).toUpperCase() + location.slice(1)}`,
    description: `Professional closet door installation in ${location.charAt(0).toUpperCase() + location.slice(1)}, Ontario. Official Renin dealer with lifetime warranty.`,
    url: `https://www.pgclosets.com/${location}`,
    telephone: "+1-613-729-7400",
    email: "info@pgclosets.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.charAt(0).toUpperCase() + location.slice(1),
      addressRegion: "ON",
      addressCountry: "CA"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coords.lat,
      longitude: coords.lng
    },
    areaServed: {
      "@type": "City",
      name: location.charAt(0).toUpperCase() + location.slice(1),
      addressRegion: "ON",
      addressCountry: "CA"
    },
    serviceType: [
      "Closet Door Installation",
      "Barn Door Installation", 
      "Bypass Door Installation",
      "Bifold Door Installation",
      "Custom Closet Solutions"
    ],
    priceRange: "$259-$1115",
    paymentAccepted: ["Cash", "Credit Card", "Debit Card", "Interac"],
    currenciesAccepted: "CAD",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${location.charAt(0).toUpperCase() + location.slice(1)} Closet Door Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Professional Installation",
            description: "Expert closet door installation with 2-week delivery guarantee"
          },
          priceRange: "$299-$899",
          priceCurrency: "CAD"
        }
      ]
    }
  }
}

// Advanced Meta Tag Generator
export function generateAdvancedMetaTags(page: {
  title: string
  description: string
  location?: string
  service?: string
  price?: string
}) {
  const baseTitle = page.location 
    ? `${page.title} | ${page.location} | PG Closets`
    : `${page.title} | PG Closets Ottawa`
  
  return {
    title: baseTitle,
    description: page.description,
    keywords: [
      page.service && `${page.service} ${page.location || 'Ottawa'}`,
      `closet doors ${page.location || 'Ottawa'}`,
      `professional installation ${page.location || 'Ottawa'}`,
      'Renin dealer Ottawa',
      'lifetime warranty',
      page.price && `${page.service} price ${page.price}`
    ].filter(Boolean).join(', '),
    openGraph: {
      title: baseTitle,
      description: page.description,
      type: 'website',
      locale: 'en_CA',
      siteName: 'PG Closets Ottawa'
    },
    twitter: {
      card: 'summary_large_image',
      title: baseTitle,
      description: page.description
    }
  }
}