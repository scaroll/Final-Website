"use client"

import { useEffect, useState } from "react"

interface TouchPoint {
  timestamp: number
  source: string
  medium: string
  campaign?: string
  content?: string
  term?: string
  page: string
  value: number
  conversionType?: string
}

interface AttributionData {
  sessionId: string
  touchPoints: TouchPoint[]
  conversions: Array<{
    type: string
    value: number
    timestamp: number
    attribution: Record<string, number>
  }>
  customerLifetimeValue: number
  firstTouchAttribution: Record<string, number>
  lastTouchAttribution: Record<string, number>
  linearAttribution: Record<string, number>
  timeDecayAttribution: Record<string, number>
}

interface ROIData {
  channel: string
  cost: number
  revenue: number
  conversions: number
  roi: number
  cpa: number
  ltv: number
}

interface AttributionAnalyticsProps {
  gaId: string
  trackingWindow?: number // Days to track attribution
  enableCrossDomain?: boolean
}

// Multi-touch attribution modeling and ROI tracking
export function AttributionAnalytics({
  gaId,
  trackingWindow = 30,
  enableCrossDomain = false
}: AttributionAnalyticsProps) {
  const [attributionData, setAttributionData] = useState<AttributionData>({
    sessionId: generateSessionId(),
    touchPoints: [],
    conversions: [],
    customerLifetimeValue: 0,
    firstTouchAttribution: {},
    lastTouchAttribution: {},
    linearAttribution: {},
    timeDecayAttribution: {}
  })

  // Generate unique session ID
  function generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      const gtag = window.gtag

      // MULTI-TOUCH ATTRIBUTION SETUP
      const setupAttributionTracking = () => {
        // Load existing attribution data from localStorage
        const existingData = loadAttributionData()
        if (existingData) {
          setAttributionData(prev => ({
            ...prev,
            ...existingData,
            sessionId: generateSessionId() // New session but keep historical data
          }))
        }

        // Track current touch point
        const currentTouchPoint = identifyTouchPoint()
        if (currentTouchPoint) {
          addTouchPoint(currentTouchPoint)
        }

        // Set up conversion tracking
        setupConversionAttributionTracking()
      }

      // Identify current traffic source and create touch point
      const identifyTouchPoint = (): TouchPoint | null => {
        const urlParams = new URLSearchParams(window.location.search)
        const referrer = document.referrer
        const timestamp = Date.now()
        const page = window.location.pathname

        // UTM parameter tracking (highest priority)
        const utmSource = urlParams.get("utm_source")
        const utmMedium = urlParams.get("utm_medium")
        const utmCampaign = urlParams.get("utm_campaign")
        const utmContent = urlParams.get("utm_content")
        const utmTerm = urlParams.get("utm_term")

        if (utmSource && utmMedium) {
          return {
            timestamp,
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign || undefined,
            content: utmContent || undefined,
            term: utmTerm || undefined,
            page,
            value: calculateTouchPointValue(utmSource, utmMedium)
          }
        }

        // Referrer-based attribution
        if (referrer && !referrer.includes(window.location.hostname)) {
          const { source, medium } = categorizeReferrer(referrer)
          return {
            timestamp,
            source,
            medium,
            page,
            value: calculateTouchPointValue(source, medium)
          }
        }

        // Direct traffic (first touch only)
        const isFirstVisit = !localStorage.getItem("pg_attribution_data")
        if (!referrer && isFirstVisit) {
          return {
            timestamp,
            source: "direct",
            medium: "none",
            page,
            value: calculateTouchPointValue("direct", "none")
          }
        }

        return null
      }

      // Categorize referrer into source/medium
      const categorizeReferrer = (referrer: string): { source: string; medium: string } => {
        const referrerHost = new URL(referrer).hostname.toLowerCase()

        // Search engines
        if (referrerHost.includes("google.")) return { source: "google", medium: "organic" }
        if (referrerHost.includes("bing.")) return { source: "bing", medium: "organic" }
        if (referrerHost.includes("yahoo.")) return { source: "yahoo", medium: "organic" }
        if (referrerHost.includes("duckduckgo.")) return { source: "duckduckgo", medium: "organic" }

        // Social media
        if (referrerHost.includes("facebook.")) return { source: "facebook", medium: "social" }
        if (referrerHost.includes("instagram.")) return { source: "instagram", medium: "social" }
        if (referrerHost.includes("twitter.") || referrerHost.includes("t.co")) return { source: "twitter", medium: "social" }
        if (referrerHost.includes("linkedin.")) return { source: "linkedin", medium: "social" }
        if (referrerHost.includes("pinterest.")) return { source: "pinterest", medium: "social" }
        if (referrerHost.includes("youtube.")) return { source: "youtube", medium: "social" }

        // Local directories
        if (referrerHost.includes("yelp.")) return { source: "yelp", medium: "local-directory" }
        if (referrerHost.includes("yellowpages.")) return { source: "yellowpages", medium: "local-directory" }
        if (referrerHost.includes("google.com/maps")) return { source: "google-maps", medium: "local-directory" }
        if (referrerHost.includes("bbb.org")) return { source: "bbb", medium: "local-directory" }

        // Email
        if (referrerHost.includes("mail.") || referrerHost.includes("gmail.") || referrerHost.includes("outlook.")) {
          return { source: "email", medium: "email" }
        }

        // Default referral
        return { source: referrerHost, medium: "referral" }
      }

      // Calculate touch point value based on source and medium
      const calculateTouchPointValue = (source: string, medium: string): number => {
        const valueMap: Record<string, number> = {
          // High-value sources
          "google:organic": 100,
          "google:cpc": 120,
          "direct:none": 90,
          "email:email": 110,
          
          // Medium-value sources
          "facebook:social": 60,
          "instagram:social": 55,
          "yelp:local-directory": 80,
          "yellowpages:local-directory": 70,
          "google-maps:local-directory": 85,
          
          // Lower-value sources
          "twitter:social": 45,
          "linkedin:social": 50,
          "referral": 40
        }

        const key = `${source}:${medium}`
        return valueMap[key] || valueMap[medium] || 30
      }

      // Add touch point to attribution data
      const addTouchPoint = (touchPoint: TouchPoint) => {
        setAttributionData(prev => {
          const updatedData = {
            ...prev,
            touchPoints: [...prev.touchPoints, touchPoint]
          }
          
          // Update attribution models
          updateAttributionModels(updatedData)
          
          // Save to localStorage
          saveAttributionData(updatedData)
          
          // Track touch point event
          gtag("event", "attribution_touchpoint", {
            event_category: "Attribution",
            event_label: `${touchPoint.source}:${touchPoint.medium}`,
            touchpoint_source: touchPoint.source,
            touchpoint_medium: touchPoint.medium,
            touchpoint_value: touchPoint.value,
            touchpoint_sequence: updatedData.touchPoints.length,
            custom_map: {
              attribution_source: touchPoint.source,
              attribution_medium: touchPoint.medium
            }
          })

          return updatedData
        })
      }

      // Update attribution models
      const updateAttributionModels = (data: AttributionData) => {
        const touchPoints = data.touchPoints
        
        if (touchPoints.length === 0) return

        // First Touch Attribution
        const firstTouch = touchPoints[0]
        data.firstTouchAttribution = {
          [`${firstTouch.source}:${firstTouch.medium}`]: 100
        }

        // Last Touch Attribution
        const lastTouch = touchPoints[touchPoints.length - 1]
        data.lastTouchAttribution = {
          [`${lastTouch.source}:${lastTouch.medium}`]: 100
        }

        // Linear Attribution
        data.linearAttribution = {}
        const linearValue = 100 / touchPoints.length
        touchPoints.forEach(tp => {
          const key = `${tp.source}:${tp.medium}`
          data.linearAttribution[key] = (data.linearAttribution[key] || 0) + linearValue
        })

        // Time Decay Attribution (more recent touchpoints get higher weight)
        data.timeDecayAttribution = {}
        const now = Date.now()
        let totalWeight = 0
        
        const weights = touchPoints.map(tp => {
          const daysSince = (now - tp.timestamp) / (1000 * 60 * 60 * 24)
          return Math.exp(-daysSince / 7) // 7-day half-life
        })
        
        totalWeight = weights.reduce((sum, w) => sum + w, 0)
        
        touchPoints.forEach((tp, index) => {
          const key = `${tp.source}:${tp.medium}`
          const attribution = (weights[index] / totalWeight) * 100
          data.timeDecayAttribution[key] = (data.timeDecayAttribution[key] || 0) + attribution
        })
      }

      // Set up conversion attribution tracking
      const setupConversionAttributionTracking = () => {
        // Track quote completion conversions
        const originalQuoteComplete = (window as any).pgAnalytics?.trackQuoteCompletion
        if (originalQuoteComplete) {
          (window as any).pgAnalytics.trackQuoteCompletion = (value: number, items: number, customerInfo: any) => {
            // Call original function
            originalQuoteComplete(value, items, customerInfo)
            
            // Add attribution tracking
            trackConversion("quote_completion", value, customerInfo)
          }
        }

        // Track phone call conversions
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
        phoneLinks.forEach(link => {
          link.addEventListener("click", () => {
            trackConversion("phone_call", 150) // Estimated phone call value
          })
        })

        // Track form submission conversions
        const forms = document.querySelectorAll("form")
        forms.forEach(form => {
          form.addEventListener("submit", () => {
            const formName = form.getAttribute("name") || form.getAttribute("id") || "unknown"
            const value = formName.includes("contact") ? 100 : formName.includes("quote") ? 200 : 50
            trackConversion("form_submission", value, { formType: formName })
          })
        })

        // Track luxury consultation requests
        const consultationButtons = document.querySelectorAll('[data-consultation], button:contains("consultation")')
        consultationButtons.forEach(button => {
          button.addEventListener("click", () => {
            trackConversion("luxury_consultation", 500)
          })
        })
      }

      // Track conversion with full attribution
      const trackConversion = (type: string, value: number, additionalData?: any) => {
        const timestamp = Date.now()
        
        setAttributionData(prev => {
          const conversion = {
            type,
            value,
            timestamp,
            attribution: {
              firstTouch: prev.firstTouchAttribution,
              lastTouch: prev.lastTouchAttribution,
              linear: prev.linearAttribution,
              timeDecay: prev.timeDecayAttribution
            }
          }

          const updatedData = {
            ...prev,
            conversions: [...prev.conversions, conversion],
            customerLifetimeValue: prev.customerLifetimeValue + value
          }

          // Track attribution conversion
          gtag("event", "attribution_conversion", {
            event_category: "Attribution",
            event_label: type,
            conversion_type: type,
            conversion_value: value,
            currency: "CAD",
            customer_ltv: updatedData.customerLifetimeValue,
            touchpoint_count: prev.touchPoints.length,
            attribution_model: "multi_touch",
            ...additionalData
          })

          // Track ROI for each attribution model
          Object.entries(prev.timeDecayAttribution).forEach(([channel, attribution]) => {
            gtag("event", "channel_roi_attribution", {
              event_category: "ROI Attribution",
              event_label: channel,
              channel: channel,
              attributed_value: (value * (attribution / 100)),
              attribution_percentage: attribution,
              attribution_model: "time_decay"
            })
          })

          saveAttributionData(updatedData)
          return updatedData
        })
      }

      // CUSTOMER LIFETIME VALUE TRACKING
      const setupLTVTracking = () => {
        // Track returning customers
        const isReturningCustomer = localStorage.getItem("pg_customer_return")
        if (isReturningCustomer) {
          gtag("event", "returning_customer_visit", {
            event_category: "Customer Lifetime Value",
            event_label: "Return Visit",
            customer_type: "returning",
            previous_ltv: parseFloat(isReturningCustomer) || 0,
            value: 25 // Value of return visit
          })
        }

        // Update LTV on conversion
        const updateLTV = (newValue: number) => {
          const currentLTV = parseFloat(localStorage.getItem("pg_customer_ltv") || "0")
          const updatedLTV = currentLTV + newValue
          
          localStorage.setItem("pg_customer_ltv", updatedLTV.toString())
          localStorage.setItem("pg_customer_return", updatedLTV.toString())
          
          gtag("event", "customer_ltv_update", {
            event_category: "Customer Lifetime Value",
            event_label: "LTV Increase",
            previous_ltv: currentLTV,
            new_ltv: updatedLTV,
            ltv_increase: newValue,
            currency: "CAD"
          })
        }

        // Expose LTV tracking
        ;(window as any).updateCustomerLTV = updateLTV
      }

      // CAMPAIGN PERFORMANCE TRACKING
      const setupCampaignTracking = () => {
        const urlParams = new URLSearchParams(window.location.search)
        const campaign = urlParams.get("utm_campaign")
        const source = urlParams.get("utm_source")
        const medium = urlParams.get("utm_medium")

        if (campaign && source && medium) {
          gtag("event", "campaign_attribution", {
            event_category: "Campaign Performance",
            event_label: campaign,
            campaign_name: campaign,
            campaign_source: source,
            campaign_medium: medium,
            landing_page: window.location.pathname
          })

          // Track campaign engagement over time
          const trackCampaignEngagement = () => {
            const engagement = calculateEngagementScore()
            gtag("event", "campaign_engagement", {
              event_category: "Campaign Performance",
              event_label: campaign,
              campaign_name: campaign,
              engagement_score: engagement,
              source_medium: `${source}:${medium}`
            })
          }

          setTimeout(trackCampaignEngagement, 30000) // After 30 seconds
        }
      }

      // Calculate engagement score
      const calculateEngagementScore = (): number => {
        const timeOnPage = Date.now() - (window as any).pageStartTime || 0
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) || 0
        
        let score = 0
        score += Math.min(timeOnPage / 1000 / 60 * 20, 40) // Time score (max 40)
        score += Math.min(scrollPercent * 0.6, 60) // Scroll score (max 60)
        
        return Math.min(Math.round(score), 100)
      }

      // DATA PERSISTENCE FUNCTIONS
      const loadAttributionData = (): Partial<AttributionData> | null => {
        try {
          const data = localStorage.getItem("pg_attribution_data")
          if (data) {
            const parsed = JSON.parse(data)
            
            // Clean old touch points (outside tracking window)
            const cutoff = Date.now() - (trackingWindow * 24 * 60 * 60 * 1000)
            parsed.touchPoints = (parsed.touchPoints || []).filter((tp: TouchPoint) => tp.timestamp > cutoff)
            
            return parsed
          }
        } catch (error) {
          console.warn("Failed to load attribution data:", error)
        }
        return null
      }

      const saveAttributionData = (data: AttributionData) => {
        try {
          // Clean data before saving
          const cleanData = {
            ...data,
            touchPoints: data.touchPoints.slice(-50), // Keep last 50 touch points
            conversions: data.conversions.slice(-20) // Keep last 20 conversions
          }
          
          localStorage.setItem("pg_attribution_data", JSON.stringify(cleanData))
        } catch (error) {
          console.warn("Failed to save attribution data:", error)
        }
      }

      // CROSS-DOMAIN TRACKING SETUP
      const setupCrossDomainTracking = () => {
        if (!enableCrossDomain) return

        // Configure Google Analytics for cross-domain tracking
        gtag("config", gaId, {
          linker: {
            domains: ["pgclosets.com", "www.pgclosets.com", "shop.pgclosets.com"]
          }
        })

        // Track cross-domain navigation
        const links = document.querySelectorAll('a[href*="pgclosets.com"]:not([href*="' + window.location.hostname + '"])')
        links.forEach(link => {
          link.addEventListener("click", () => {
            gtag("event", "cross_domain_click", {
              event_category: "Cross Domain",
              event_label: link.getAttribute("href") || "",
              destination_domain: new URL(link.getAttribute("href") || "").hostname
            })
          })
        })
      }

      // Initialize all attribution tracking
      setupAttributionTracking()
      setupLTVTracking()
      setupCampaignTracking()
      setupCrossDomainTracking()

      // Expose attribution functions globally
      ;(window as any).attributionAnalytics = {
        trackConversion,
        getAttributionData: () => attributionData,
        updateLTV: (window as any).updateCustomerLTV
      }

      // Clean up old data periodically
      const cleanup = setInterval(() => {
        const data = loadAttributionData()
        if (data) {
          saveAttributionData(data as AttributionData)
        }
      }, 60000 * 60) // Every hour

      return () => {
        clearInterval(cleanup)
      }
    }
  }, [gaId, trackingWindow, enableCrossDomain])

  return null
}

// Export helper functions
export const trackAttributedConversion = (type: string, value: number, data?: any) => {
  if (typeof window !== "undefined" && (window as any).attributionAnalytics) {
    (window as any).attributionAnalytics.trackConversion(type, value, data)
  }
}

export const getAttributionInsights = () => {
  if (typeof window !== "undefined" && (window as any).attributionAnalytics) {
    return (window as any).attributionAnalytics.getAttributionData()
  }
  return null
}

export const updateCustomerLifetimeValue = (value: number) => {
  if (typeof window !== "undefined" && (window as any).updateCustomerLTV) {
    (window as any).updateCustomerLTV(value)
  }
}