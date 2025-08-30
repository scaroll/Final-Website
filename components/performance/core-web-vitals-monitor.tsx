"use client"

import { useEffect, useState } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

interface WebVitalsMetrics {
  lcp?: number
  fid?: number
  cls?: number
  fcp?: number
  ttfb?: number
}

interface WebVitalsRating {
  lcp: 'good' | 'needs-improvement' | 'poor'
  fid: 'good' | 'needs-improvement' | 'poor'
  cls: 'good' | 'needs-improvement' | 'poor'
  fcp: 'good' | 'needs-improvement' | 'poor'
  ttfb: 'good' | 'needs-improvement' | 'poor'
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 }
}

function getRating(metric: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[metric as keyof typeof THRESHOLDS]
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

export function CoreWebVitalsMonitor() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({})
  const [ratings, setRatings] = useState<Partial<WebVitalsRating>>({})

  useEffect(() => {
    // Initialize Web Vitals monitoring
    const sendToAnalytics = (metric: any) => {
      const rating = getRating(metric.name.toLowerCase(), metric.value)
      
      // Update state
      setMetrics(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: metric.value
      }))
      
      setRatings(prev => ({
        ...prev,
        [metric.name.toLowerCase()]: rating
      }))

      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && 'gtag' in window) {
        ;(window as any).gtag('event', metric.name, {
          event_category: 'Core Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          rating: rating,
          page_location: window.location.href,
          non_interaction: true
        })
      }

      // Send to Vercel Analytics
      if (typeof window !== 'undefined' && 'va' in window) {
        ;(window as any).va('track', 'Core Web Vital', {
          metric: metric.name,
          value: metric.value,
          rating: rating,
          page: window.location.pathname
        })
      }

      // Performance optimization alerts
      if (rating === 'poor') {
        console.warn(`🚨 Poor ${metric.name} performance:`, {
          value: metric.value,
          threshold: THRESHOLDS[metric.name.toLowerCase() as keyof typeof THRESHOLDS],
          suggestions: getOptimizationSuggestions(metric.name, metric.value)
        })
      }
    }

    // Monitor all Core Web Vitals
    onLCP(sendToAnalytics)
    onINP(sendToAnalytics)
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)

    // Additional performance monitoring
    monitorResourceLoading()
    monitorNavigationTiming()
    
  }, [])

  // Development performance dashboard (only in dev)
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-0 right-0 z-50 bg-white border border-gray-300 p-4 m-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Core Web Vitals</h3>
        <div className="space-y-1 text-xs">
          {Object.entries(metrics).map(([metric, value]) => {
            const rating = ratings[metric as keyof WebVitalsRating]
            const color = rating === 'good' ? 'text-green-600' : 
                         rating === 'needs-improvement' ? 'text-yellow-600' : 'text-red-600'
            
            return (
              <div key={metric} className="flex justify-between">
                <span className="uppercase">{metric}:</span>
                <span className={color}>
                  {metric === 'cls' ? value?.toFixed(3) : Math.round(value || 0)}
                  {metric !== 'cls' && 'ms'}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}

// Resource loading monitoring
function monitorResourceLoading() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          
          // Monitor critical resources
          if (resource.name.includes('.woff2') || 
              resource.name.includes('.jpg') || 
              resource.name.includes('.png') ||
              resource.name.includes('.webp')) {
            
            // Track slow loading resources
            if (resource.duration > 1000) {
              console.warn('Slow resource loading:', {
                resource: resource.name,
                duration: Math.round(resource.duration),
                size: resource.transferSize
              })
              
              // Send to analytics
              if ('gtag' in window) {
                ;(window as any).gtag('event', 'slow_resource', {
                  event_category: 'Performance',
                  event_label: resource.name,
                  value: Math.round(resource.duration)
                })
              }
            }
          }
        }
      }
    })
    
    observer.observe({ entryTypes: ['resource'] })
  }
}

// Navigation timing monitoring
function monitorNavigationTiming() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            tcp: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            domProcessing: navigation.domContentLoadedEventStart - navigation.responseEnd,
            domComplete: navigation.loadEventStart - navigation.domContentLoadedEventStart
          }
          
          // Send detailed timing to analytics
          if ('gtag' in window) {
            Object.entries(metrics).forEach(([metric, value]) => {
              ;(window as any).gtag('event', `navigation_${metric}`, {
                event_category: 'Navigation Timing',
                value: Math.round(value)
              })
            })
          }
        }
      }, 1000)
    })
  }
}

// Optimization suggestions based on poor metrics
function getOptimizationSuggestions(metric: string, value: number): string[] {
  switch (metric.toLowerCase()) {
    case 'lcp':
      return [
        'Optimize hero images with WebP/AVIF formats',
        'Use rel="preload" for critical images',
        'Minimize render-blocking CSS/JS',
        'Use CDN for static assets',
        'Implement lazy loading for below-fold images'
      ]
    
    case 'inp':
    case 'fid':
      return [
        'Reduce JavaScript execution time',
        'Split long tasks into smaller chunks',
        'Use web workers for heavy computations',
        'Defer non-critical JavaScript',
        'Optimize event handlers'
      ]
    
    case 'cls':
      return [
        'Set explicit dimensions for images',
        'Reserve space for dynamic content',
        'Avoid inserting content above existing content',
        'Use transform animations instead of layout changes',
        'Preload fonts to prevent layout shifts'
      ]
    
    case 'fcp':
      return [
        'Inline critical CSS',
        'Remove unused CSS',
        'Optimize font loading',
        'Reduce server response times',
        'Use HTTP/2 server push for critical resources'
      ]
    
    case 'ttfb':
      return [
        'Optimize server response times',
        'Use CDN for static assets',
        'Implement caching strategies',
        'Optimize database queries',
        'Use service workers for caching'
      ]
    
    default:
      return ['Monitor performance metrics and optimize accordingly']
  }
}

// Performance-optimized image loading hook
export function usePerformantImageLoading() {
  useEffect(() => {
    // Implement intersection observer for lazy loading
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('lazy-loading')
              imageObserver.unobserve(img)
            }
          }
        })
      }, {
        rootMargin: '50px'
      })
      
      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
      
      return () => imageObserver.disconnect()
    }
  }, [])
}