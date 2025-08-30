"use client"

import { useEffect, useState, createContext, useContext, ReactNode } from "react"

interface ABTest {
  id: string
  name: string
  description: string
  variants: ABVariant[]
  status: "draft" | "running" | "paused" | "completed"
  startDate: Date
  endDate?: Date
  targetMetric: string
  minimumSampleSize: number
  confidenceLevel: number
  trafficAllocation: number // Percentage of traffic to include
  segments?: string[] // User segments to target
}

interface ABVariant {
  id: string
  name: string
  weight: number // Traffic allocation percentage
  config: Record<string, any>
}

interface ABTestResult {
  testId: string
  variantId: string
  metric: string
  value: number
  conversions: number
  visitors: number
  conversionRate: number
  confidence: number
  isWinner?: boolean
  isStatisticallySignificant?: boolean
}

interface ABTestingContextType {
  currentTests: ABTest[]
  getVariant: (testId: string) => ABVariant | null
  trackConversion: (testId: string, metric: string, value?: number) => void
  trackExposure: (testId: string) => void
}

const ABTestingContext = createContext<ABTestingContextType | null>(null)

interface ABTestingProviderProps {
  gaId: string
  children: ReactNode
  userId?: string
  segmentData?: Record<string, string>
}

// A/B Testing Framework for PG Closets conversion optimization
export function ABTestingProvider({
  gaId,
  children,
  userId,
  segmentData = {}
}: ABTestingProviderProps) {
  const [currentTests, setCurrentTests] = useState<ABTest[]>([])
  const [userAssignments, setUserAssignments] = useState<Record<string, string>>({})
  const [exposureTracked, setExposureTracked] = useState<Set<string>>(new Set())

  useEffect(() => {
    initializeABTesting()
  }, [gaId, userId])

  const initializeABTesting = () => {
    // Load existing user assignments from localStorage
    const savedAssignments = localStorage.getItem("pg_ab_assignments")
    if (savedAssignments) {
      setUserAssignments(JSON.parse(savedAssignments))
    }

    // Load active tests configuration
    const activeTests = loadActiveTests()
    setCurrentTests(activeTests)

    // Assign user to test variants
    activeTests.forEach(test => {
      if (!userAssignments[test.id] && shouldIncludeUser(test)) {
        const assignment = assignUserToVariant(test)
        if (assignment) {
          setUserAssignments(prev => {
            const updated = { ...prev, [test.id]: assignment.id }
            localStorage.setItem("pg_ab_assignments", JSON.stringify(updated))
            return updated
          })
        }
      }
    })

    // Track test initialization
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "ab_testing_initialized", {
        event_category: "A/B Testing",
        event_label: "Framework Loaded",
        active_tests_count: activeTests.length,
        user_id: userId || "anonymous"
      })
    }
  }

  // Load active test configurations
  const loadActiveTests = (): ABTest[] => {
    // In production, this would load from your test management system
    // For now, we'll return predefined tests for PG Closets
    return [
      {
        id: "quote_builder_layout",
        name: "Quote Builder Layout Test",
        description: "Test vertical vs horizontal quote builder layout",
        variants: [
          {
            id: "vertical_control",
            name: "Vertical Layout (Control)",
            weight: 50,
            config: { 
              layout: "vertical",
              stepDisplay: "progressive",
              sidebarPosition: "right"
            }
          },
          {
            id: "horizontal_variant",
            name: "Horizontal Layout",
            weight: 50,
            config: { 
              layout: "horizontal",
              stepDisplay: "tabs",
              sidebarPosition: "bottom"
            }
          }
        ],
        status: "running",
        startDate: new Date("2024-01-15"),
        targetMetric: "quote_completion_rate",
        minimumSampleSize: 1000,
        confidenceLevel: 95,
        trafficAllocation: 100
      },
      {
        id: "hero_cta_test",
        name: "Hero Section CTA Test", 
        description: "Test different call-to-action buttons on homepage",
        variants: [
          {
            id: "get_quote_control",
            name: "Get Quote (Control)",
            weight: 33.33,
            config: {
              ctaText: "Get Free Quote",
              ctaColor: "blue",
              urgencyText: "Free consultation included"
            }
          },
          {
            id: "start_project_variant",
            name: "Start Your Project",
            weight: 33.33,
            config: {
              ctaText: "Start Your Project",
              ctaColor: "green", 
              urgencyText: "Transform your space today"
            }
          },
          {
            id: "design_consultation_variant",
            name: "Design Consultation",
            weight: 33.34,
            config: {
              ctaText: "Book Design Consultation",
              ctaColor: "purple",
              urgencyText: "Expert design advice"
            }
          }
        ],
        status: "running",
        startDate: new Date("2024-01-20"),
        targetMetric: "cta_click_rate",
        minimumSampleSize: 1500,
        confidenceLevel: 95,
        trafficAllocation: 80, // Only 80% of traffic
        segments: ["new_visitors"] // Only new visitors
      },
      {
        id: "pricing_display_test",
        name: "Pricing Display Test",
        description: "Test showing prices vs 'starting from' vs contact for pricing",
        variants: [
          {
            id: "full_pricing_control",
            name: "Full Pricing (Control)",
            weight: 40,
            config: {
              priceDisplay: "full",
              showSalePrices: true,
              showInstallationCost: true
            }
          },
          {
            id: "starting_from_variant",
            name: "Starting From Pricing",
            weight: 40,
            config: {
              priceDisplay: "starting_from",
              showSalePrices: true,
              showInstallationCost: false
            }
          },
          {
            id: "contact_pricing_variant", 
            name: "Contact for Pricing",
            weight: 20,
            config: {
              priceDisplay: "contact",
              showSalePrices: false,
              showInstallationCost: false
            }
          }
        ],
        status: "running",
        startDate: new Date("2024-01-10"),
        targetMetric: "product_to_quote_rate",
        minimumSampleSize: 800,
        confidenceLevel: 90,
        trafficAllocation: 100
      },
      {
        id: "consultation_form_test",
        name: "Consultation Form Length Test",
        description: "Test short vs detailed consultation request form",
        variants: [
          {
            id: "short_form_control",
            name: "Short Form (Control)",
            weight: 50,
            config: {
              formFields: ["name", "email", "phone"],
              formSteps: 1,
              estimatedTime: "30 seconds"
            }
          },
          {
            id: "detailed_form_variant",
            name: "Detailed Form",
            weight: 50,
            config: {
              formFields: ["name", "email", "phone", "address", "projectType", "timeline", "budget"],
              formSteps: 2,
              estimatedTime: "2 minutes"
            }
          }
        ],
        status: "running", 
        startDate: new Date("2024-01-25"),
        targetMetric: "consultation_request_completion",
        minimumSampleSize: 600,
        confidenceLevel: 95,
        trafficAllocation: 100
      }
    ]
  }

  // Check if user should be included in test
  const shouldIncludeUser = (test: ABTest): boolean => {
    // Check traffic allocation
    if (Math.random() * 100 > test.trafficAllocation) {
      return false
    }

    // Check user segments
    if (test.segments && test.segments.length > 0) {
      const userSegment = determineUserSegment()
      if (!test.segments.includes(userSegment)) {
        return false
      }
    }

    return test.status === "running"
  }

  // Determine user segment
  const determineUserSegment = (): string => {
    const isReturning = localStorage.getItem("pg_customer_return")
    const referrer = document.referrer
    
    if (isReturning) return "returning_visitors"
    if (!referrer || referrer.includes(window.location.hostname)) return "direct_visitors"
    if (referrer.includes("google.")) return "search_visitors"
    if (referrer.includes("facebook.") || referrer.includes("instagram.")) return "social_visitors"
    
    return "new_visitors"
  }

  // Assign user to test variant
  const assignUserToVariant = (test: ABTest): ABVariant | null => {
    // Use consistent hashing based on user ID or create stable identifier
    const userIdentifier = userId || getStableUserId()
    const hash = simpleHash(userIdentifier + test.id)
    
    // Convert hash to percentage
    const percentage = (hash % 10000) / 100
    
    // Find variant based on weight distribution
    let cumulativeWeight = 0
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight
      if (percentage < cumulativeWeight) {
        return variant
      }
    }
    
    // Fallback to first variant
    return test.variants[0]
  }

  // Generate stable user ID for consistent test assignment
  const getStableUserId = (): string => {
    let stableId = localStorage.getItem("pg_stable_user_id")
    if (!stableId) {
      stableId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("pg_stable_user_id", stableId)
    }
    return stableId
  }

  // Simple hash function for consistent assignment
  const simpleHash = (str: string): number => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
  }

  // Get assigned variant for a test
  const getVariant = (testId: string): ABVariant | null => {
    const test = currentTests.find(t => t.id === testId)
    if (!test || !userAssignments[testId]) return null
    
    const variantId = userAssignments[testId]
    return test.variants.find(v => v.id === variantId) || null
  }

  // Track test exposure
  const trackExposure = (testId: string) => {
    if (exposureTracked.has(testId)) return
    
    const test = currentTests.find(t => t.id === testId)
    const variant = getVariant(testId)
    
    if (!test || !variant) return

    setExposureTracked(prev => new Set([...prev, testId]))

    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "ab_test_exposure", {
        event_category: "A/B Testing",
        event_label: `${test.name}: ${variant.name}`,
        test_id: testId,
        test_name: test.name,
        variant_id: variant.id,
        variant_name: variant.name,
        user_segment: determineUserSegment(),
        custom_map: {
          ab_test: testId,
          ab_variant: variant.id
        }
      })
    }

    console.log(`A/B Test Exposure: ${test.name} -> ${variant.name}`)
  }

  // Track conversion for test
  const trackConversion = (testId: string, metric: string, value: number = 1) => {
    const test = currentTests.find(t => t.id === testId)
    const variant = getVariant(testId)
    
    if (!test || !variant) return

    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "ab_test_conversion", {
        event_category: "A/B Testing",
        event_label: `${test.name}: ${variant.name}`,
        test_id: testId,
        test_name: test.name,
        variant_id: variant.id,
        variant_name: variant.name,
        conversion_metric: metric,
        conversion_value: value,
        target_metric: test.targetMetric,
        is_target_metric: metric === test.targetMetric,
        custom_map: {
          ab_test: testId,
          ab_variant: variant.id,
          ab_conversion: metric
        }
      })
    }

    console.log(`A/B Test Conversion: ${test.name} -> ${variant.name} -> ${metric}: ${value}`)
  }

  const contextValue: ABTestingContextType = {
    currentTests,
    getVariant,
    trackConversion,
    trackExposure
  }

  return (
    <ABTestingContext.Provider value={contextValue}>
      {children}
    </ABTestingContext.Provider>
  )
}

// Hook for using A/B testing
export function useABTesting() {
  const context = useContext(ABTestingContext)
  if (!context) {
    throw new Error("useABTesting must be used within ABTestingProvider")
  }
  return context
}

// Hook for using a specific test
export function useABTest(testId: string) {
  const { getVariant, trackExposure, trackConversion } = useABTesting()
  
  useEffect(() => {
    // Auto-track exposure when component mounts
    trackExposure(testId)
  }, [testId])

  const variant = getVariant(testId)
  
  return {
    variant,
    isInTest: variant !== null,
    config: variant?.config || {},
    trackConversion: (metric: string, value?: number) => trackConversion(testId, metric, value)
  }
}

// Component for conditional rendering based on A/B test
interface ABTestComponentProps {
  testId: string
  variantId: string
  children: ReactNode
  fallback?: ReactNode
}

export function ABTestComponent({
  testId,
  variantId,
  children,
  fallback = null
}: ABTestComponentProps) {
  const { variant } = useABTest(testId)
  
  if (variant?.id === variantId) {
    return <>{children}</>
  }
  
  return <>{fallback}</>
}

// Analytics helper functions
export const trackABTestEvent = (testId: string, eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", eventName, {
      event_category: "A/B Testing",
      test_id: testId,
      ...data
    })
  }
}

// Test configuration management
export const getABTestResults = async (testId: string): Promise<ABTestResult[]> => {
  // In production, this would fetch from your analytics system
  // For now, return mock results for demonstration
  return [
    {
      testId,
      variantId: "control",
      metric: "conversion_rate",
      value: 3.2,
      conversions: 32,
      visitors: 1000,
      conversionRate: 3.2,
      confidence: 95,
      isStatisticallySignificant: true
    },
    {
      testId,
      variantId: "variant",
      metric: "conversion_rate", 
      value: 4.1,
      conversions: 41,
      visitors: 1000,
      conversionRate: 4.1,
      confidence: 98,
      isWinner: true,
      isStatisticallySignificant: true
    }
  ]
}

// Statistical significance calculation
export const calculateStatisticalSignificance = (
  controlConversions: number,
  controlVisitors: number,
  variantConversions: number,
  variantVisitors: number,
  confidenceLevel: number = 95
): { isSignificant: boolean; confidence: number; pValue: number } => {
  // Simplified chi-square test
  const controlRate = controlConversions / controlVisitors
  const variantRate = variantConversions / variantVisitors
  
  const pooledRate = (controlConversions + variantConversions) / (controlVisitors + variantVisitors)
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1/controlVisitors + 1/variantVisitors))
  
  if (standardError === 0) {
    return { isSignificant: false, confidence: 0, pValue: 1 }
  }
  
  const zScore = (variantRate - controlRate) / standardError
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore))) // Two-tailed test
  
  const isSignificant = pValue < (1 - confidenceLevel / 100)
  const confidence = (1 - pValue) * 100
  
  return { isSignificant, confidence, pValue }
}

// Normal cumulative distribution function approximation
const normalCDF = (z: number): number => {
  return 0.5 * (1 + erf(z / Math.sqrt(2)))
}

// Error function approximation
const erf = (x: number): number => {
  const a1 =  0.254829592
  const a2 = -0.284496736
  const a3 =  1.421413741
  const a4 = -1.453152027
  const a5 =  1.061405429
  const p  =  0.3275911
  
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x)
  
  const t = 1.0 / (1.0 + p * x)
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  
  return sign * y
}