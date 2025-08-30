"use client"

import { useEffect } from "react"

interface ConversionTrackingProps {
  gaId: string
}

// Advanced conversion tracking for PG Closets business goals
export function ConversionTracking({ gaId }: ConversionTrackingProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      const gtag = window.gtag

      // QUOTE BUILDER CONVERSION FUNNEL TRACKING
      const setupQuoteBuilderTracking = () => {
        // Track quote builder step completions
        const trackQuoteStep = (step: string, data?: any) => {
          gtag("event", "quote_step_completed", {
            event_category: "Quote Builder",
            event_label: step,
            quote_step: step,
            custom_map: { step_number: step },
            value: 1,
            ...data
          })
        }

        // Track product additions to quote
        const trackProductAddition = (productName: string, price: number, category: string) => {
          gtag("event", "add_to_quote", {
            event_category: "Quote Builder",
            event_label: productName,
            currency: "CAD",
            value: price,
            item_category: category,
            custom_map: { product_added: productName }
          })
        }

        // Track quote value milestones
        const trackQuoteValueMilestone = (value: number) => {
          const milestones = [500, 1000, 2000, 5000, 10000]
          const milestone = milestones.find(m => value >= m && value < (milestones[milestones.indexOf(m) + 1] || Infinity))
          
          if (milestone) {
            gtag("event", "quote_value_milestone", {
              event_category: "Quote Builder",
              event_label: `${milestone}+_quote`,
              currency: "CAD",
              value: value,
              milestone: milestone
            })
          }
        }

        // Track quote completion and generation
        const trackQuoteCompletion = (quoteValue: number, itemCount: number, customerInfo: any) => {
          gtag("event", "quote_completed", {
            event_category: "Conversions",
            event_label: "Quote Generated",
            currency: "CAD",
            value: quoteValue,
            quote_items: itemCount,
            customer_type: customerInfo.projectType,
            timeline: customerInfo.timeline,
            custom_map: { 
              quote_value: quoteValue,
              quote_items: itemCount
            }
          })

          // Also track as a conversion
          gtag("event", "conversion", {
            send_to: `${gaId}/quote_completion`,
            currency: "CAD",
            value: quoteValue
          })
        }

        // Expose tracking functions globally for quote builder
        // @ts-ignore
        window.pgAnalytics = {
          trackQuoteStep,
          trackProductAddition,
          trackQuoteValueMilestone,
          trackQuoteCompletion
        }
      }

      // PHONE CALL CONVERSION TRACKING
      const setupPhoneTracking = () => {
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
        phoneLinks.forEach((link) => {
          link.addEventListener("click", (e) => {
            const phoneNumber = (e.target as HTMLAnchorElement).href.replace("tel:", "")
            gtag("event", "phone_call_initiated", {
              event_category: "Conversions",
              event_label: "Phone Call Click",
              phone_number: phoneNumber,
              value: 100, // Estimated value of a phone call lead
              custom_map: { lead_source: "phone_click" }
            })

            // Track as conversion
            gtag("event", "conversion", {
              send_to: `${gaId}/phone_call`,
              value: 100
            })
          })
        })
      }

      // EMAIL CLICK TRACKING
      const setupEmailTracking = () => {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]')
        emailLinks.forEach((link) => {
          link.addEventListener("click", (e) => {
            const email = (e.target as HTMLAnchorElement).href.replace("mailto:", "")
            gtag("event", "email_contact_initiated", {
              event_category: "Conversions",
              event_label: "Email Click",
              email_address: email,
              value: 75, // Estimated value of an email lead
              custom_map: { lead_source: "email_click" }
            })
          })
        })
      }

      // FORM SUBMISSION TRACKING
      const setupFormTracking = () => {
        const forms = document.querySelectorAll("form")
        forms.forEach((form) => {
          form.addEventListener("submit", (e) => {
            const formName = form.getAttribute("name") || form.getAttribute("id") || "unknown_form"
            const formAction = form.getAttribute("action") || "no_action"
            
            gtag("event", "form_submission", {
              event_category: "Conversions",
              event_label: formName,
              form_name: formName,
              form_action: formAction,
              value: 50, // Base value for form submissions
              custom_map: { form_type: formName }
            })

            // Track specific form types with higher values
            if (formName.includes("contact") || formName.includes("quote")) {
              gtag("event", "conversion", {
                send_to: `${gaId}/form_submission`,
                value: 150
              })
            }
          })
        })
      }

      // LUXURY CONSULTATION REQUEST TRACKING
      const setupLuxuryConsultationTracking = () => {
        const consultationButtons = document.querySelectorAll(
          'button:contains("consultation"), a:contains("consultation"), [data-consultation]'
        )
        
        consultationButtons.forEach((button) => {
          button.addEventListener("click", () => {
            gtag("event", "luxury_consultation_request", {
              event_category: "High Value Conversions",
              event_label: "Luxury Consultation",
              value: 500, // High value for luxury consultations
              custom_map: { lead_quality: "high_value" }
            })

            gtag("event", "conversion", {
              send_to: `${gaId}/luxury_consultation`,
              value: 500
            })
          })
        })
      }

      // PRODUCT INTERACTION TRACKING
      const setupProductInteractionTracking = () => {
        // Track product page views with enhanced data
        if (window.location.pathname.includes("/products/")) {
          const productName = document.querySelector("h1")?.textContent || "Unknown Product"
          const productPrice = document.querySelector('[data-price]')?.getAttribute('data-price') || "0"
          
          gtag("event", "product_view_detailed", {
            event_category: "E-commerce",
            event_label: productName,
            currency: "CAD",
            value: parseFloat(productPrice),
            item_name: productName,
            custom_map: { product_engagement: "detailed_view" }
          })
        }

        // Track product image clicks (360° views, gallery)
        const productImages = document.querySelectorAll('[data-product-image], .product-image')
        productImages.forEach((image) => {
          image.addEventListener("click", () => {
            gtag("event", "product_image_interaction", {
              event_category: "E-commerce",
              event_label: "Product Image Click",
              value: 1,
              custom_map: { engagement_type: "image_interaction" }
            })
          })
        })
      }

      // EXIT INTENT TRACKING
      const setupExitIntentTracking = () => {
        let exitIntentTriggered = false
        
        const handleExitIntent = () => {
          if (!exitIntentTriggered) {
            exitIntentTriggered = true
            gtag("event", "exit_intent_detected", {
              event_category: "User Behavior",
              event_label: "Exit Intent",
              page_url: window.location.pathname,
              custom_map: { 
                time_on_page: Date.now() - (window as any).pageStartTime || 0,
                exit_intent: "detected"
              }
            })
          }
        }

        // Track exit intent on mouse movement
        document.addEventListener("mouseleave", (e) => {
          if (e.clientY <= 0) {
            handleExitIntent()
          }
        })

        // Track page visibility changes
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            handleExitIntent()
          }
        })
      }

      // CUSTOMER JOURNEY MILESTONES
      const setupCustomerJourneyTracking = () => {
        const journeyMilestones = [
          { path: "/", milestone: "homepage_visit" },
          { path: "/products", milestone: "products_browsing" },
          { path: "/quote-builder", milestone: "quote_initiation" },
          { path: "/contact", milestone: "contact_consideration" },
          { path: "/gallery", milestone: "inspiration_seeking" }
        ]

        const currentPath = window.location.pathname
        const milestone = journeyMilestones.find(m => currentPath.includes(m.path))
        
        if (milestone) {
          gtag("event", "customer_journey_milestone", {
            event_category: "Customer Journey",
            event_label: milestone.milestone,
            journey_stage: milestone.milestone,
            custom_map: { journey_step: milestone.milestone }
          })
        }
      }

      // MICRO-CONVERSION TRACKING
      const setupMicroConversionTracking = () => {
        // Track video plays (hero videos, product demos)
        const videos = document.querySelectorAll("video")
        videos.forEach((video) => {
          video.addEventListener("play", () => {
            gtag("event", "video_engagement", {
              event_category: "Micro Conversions",
              event_label: "Video Play",
              value: 10
            })
          })
        })

        // Track PDF downloads
        const pdfLinks = document.querySelectorAll('a[href$=".pdf"]')
        pdfLinks.forEach((link) => {
          link.addEventListener("click", () => {
            gtag("event", "resource_download", {
              event_category: "Micro Conversions",
              event_label: "PDF Download",
              resource_type: "pdf",
              value: 25
            })
          })
        })

        // Track social media clicks
        const socialLinks = document.querySelectorAll('[href*="facebook.com"], [href*="instagram.com"], [href*="twitter.com"]')
        socialLinks.forEach((link) => {
          link.addEventListener("click", () => {
            gtag("event", "social_media_click", {
              event_category: "Micro Conversions",
              event_label: "Social Media",
              value: 5
            })
          })
        })
      }

      // Initialize all tracking when DOM is ready
      const initializeTracking = () => {
        setupQuoteBuilderTracking()
        setupPhoneTracking()
        setupEmailTracking()
        setupFormTracking()
        setupLuxuryConsultationTracking()
        setupProductInteractionTracking()
        setupExitIntentTracking()
        setupCustomerJourneyTracking()
        setupMicroConversionTracking()

        // Set page start time for exit intent calculations
        ;(window as any).pageStartTime = Date.now()
      }

      // Wait for DOM and gtag to be ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTracking)
      } else {
        initializeTracking()
      }

      // Re-initialize tracking on navigation (for SPA behavior)
      const originalPushState = history.pushState
      history.pushState = function (...args) {
        originalPushState.apply(history, args)
        setTimeout(initializeTracking, 100) // Re-initialize after navigation
      }
    }
  }, [gaId])

  return null
}

// Helper function to track custom events from components
export const trackConversionEvent = (eventName: string, data: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", eventName, {
      event_category: "Custom Conversions",
      ...data
    })
  }
}

// Enhanced e-commerce tracking for product interactions
export const trackEcommerceEvent = (action: string, items: any[], transactionData?: any) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", action, {
      currency: "CAD",
      items: items,
      ...transactionData
    })
  }
}