"use client"

import { useEffect } from "react"

interface EcommerceAnalyticsProps {
  gaId: string
}

// Advanced e-commerce analytics for product interactions and sales funnel
export function EcommerceAnalytics({ gaId }: EcommerceAnalyticsProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      const gtag = window.gtag

      // ENHANCED PRODUCT TRACKING
      const setupProductTracking = () => {
        // Track product list views (category pages, search results)
        const trackProductListView = (listName: string, products: any[]) => {
          gtag("event", "view_item_list", {
            item_list_id: listName,
            item_list_name: listName,
            items: products.map(product => ({
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              item_brand: "Renin",
              price: product.salePrice || product.price,
              currency: "CAD",
              index: products.indexOf(product)
            }))
          })
        }

        // Track detailed product views
        const trackProductView = (product: any) => {
          gtag("event", "view_item", {
            currency: "CAD",
            value: product.salePrice || product.price,
            items: [{
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              item_brand: "Renin",
              price: product.salePrice || product.price,
              quantity: 1
            }]
          })

          // Track product engagement score
          const engagementScore = calculateProductEngagement(product)
          gtag("event", "product_engagement_score", {
            event_category: "E-commerce",
            event_label: product.name,
            value: engagementScore,
            product_id: product.id,
            engagement_level: engagementScore > 80 ? "high" : engagementScore > 50 ? "medium" : "low"
          })
        }

        // Calculate product engagement score
        const calculateProductEngagement = (product: any) => {
          let score = 0
          
          // Base score for viewing
          score += 20
          
          // Bonus for sale items
          if (product.salePrice && product.salePrice < product.price) {
            score += 30
          }
          
          // Bonus for featured/bestseller
          if (product.featured) score += 25
          if (product.bestseller) score += 25
          
          // Bonus for premium products
          if ((product.salePrice || product.price) > 1000) {
            score += 20
          }
          
          return Math.min(score, 100)
        }

        // Track add to cart events
        const trackAddToCart = (product: any, quantity: number = 1, source: string = "product_page") => {
          gtag("event", "add_to_cart", {
            currency: "CAD",
            value: (product.salePrice || product.price) * quantity,
            items: [{
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              item_brand: "Renin",
              price: product.salePrice || product.price,
              quantity: quantity
            }],
            source: source
          })

          // Track cart value milestone
          trackCartValueMilestone((product.salePrice || product.price) * quantity)
        }

        // Track remove from cart
        const trackRemoveFromCart = (product: any, quantity: number = 1) => {
          gtag("event", "remove_from_cart", {
            currency: "CAD",
            value: (product.salePrice || product.price) * quantity,
            items: [{
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              item_brand: "Renin",
              price: product.salePrice || product.price,
              quantity: quantity
            }]
          })
        }

        // Track cart value milestones
        const trackCartValueMilestone = (cartValue: number) => {
          const milestones = [100, 500, 1000, 2000, 5000, 10000]
          const milestone = milestones.find(m => cartValue >= m)
          
          if (milestone) {
            gtag("event", "cart_value_milestone", {
              event_category: "E-commerce",
              event_label: `$${milestone}+ Cart Value`,
              currency: "CAD",
              value: cartValue,
              milestone: milestone
            })
          }
        }

        // Expose tracking functions globally
        // @ts-ignore
        window.ecommerceAnalytics = {
          trackProductListView,
          trackProductView,
          trackAddToCart,
          trackRemoveFromCart,
          trackCartValueMilestone
        }
      }

      // PURCHASE FUNNEL ANALYTICS
      const setupPurchaseFunnelTracking = () => {
        // Track checkout initiation
        const trackBeginCheckout = (cartItems: any[], cartValue: number) => {
          gtag("event", "begin_checkout", {
            currency: "CAD",
            value: cartValue,
            items: cartItems.map(item => ({
              item_id: item.product.id,
              item_name: item.product.name,
              item_category: item.product.category || "Closet Doors",
              item_brand: "Renin",
              price: item.product.salePrice || item.product.price,
              quantity: item.quantity
            }))
          })
        }

        // Track purchase completion
        const trackPurchase = (transactionId: string, cartItems: any[], cartValue: number, customerInfo?: any) => {
          gtag("event", "purchase", {
            transaction_id: transactionId,
            currency: "CAD",
            value: cartValue,
            tax: cartValue * 0.13, // HST
            shipping: 0, // Free shipping for closet doors
            items: cartItems.map(item => ({
              item_id: item.product.id,
              item_name: item.product.name,
              item_category: item.product.category || "Closet Doors",
              item_brand: "Renin",
              price: item.product.salePrice || item.product.price,
              quantity: item.quantity
            }))
          })

          // Track customer lifetime value
          if (customerInfo) {
            trackCustomerLifetimeValue(customerInfo, cartValue)
          }
        }

        // Track customer lifetime value
        const trackCustomerLifetimeValue = (customer: any, purchaseValue: number) => {
          gtag("event", "customer_lifetime_value", {
            event_category: "Customer Analytics",
            event_label: "Purchase Value",
            currency: "CAD",
            value: purchaseValue,
            customer_type: customer.isReturning ? "returning" : "new",
            custom_map: { 
              customer_segment: purchaseValue > 5000 ? "premium" : "standard",
              purchase_value: purchaseValue
            }
          })
        }

        // @ts-ignore
        window.purchaseFunnelAnalytics = {
          trackBeginCheckout,
          trackPurchase,
          trackCustomerLifetimeValue
        }
      }

      // PRODUCT RECOMMENDATION ANALYTICS
      const setupRecommendationTracking = () => {
        // Track recommendation views
        const trackRecommendationView = (recommendationType: string, products: any[]) => {
          gtag("event", "view_promotion", {
            creative_name: recommendationType,
            creative_slot: "product_recommendations",
            promotion_id: `rec_${recommendationType}`,
            promotion_name: `${recommendationType} Recommendations`,
            items: products.map(product => ({
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              price: product.salePrice || product.price
            }))
          })
        }

        // Track recommendation clicks
        const trackRecommendationClick = (recommendationType: string, product: any, position: number) => {
          gtag("event", "select_promotion", {
            creative_name: recommendationType,
            creative_slot: "product_recommendations",
            promotion_id: `rec_${recommendationType}`,
            promotion_name: `${recommendationType} Recommendations`,
            items: [{
              item_id: product.id,
              item_name: product.name,
              item_category: product.category || "Closet Doors",
              price: product.salePrice || product.price,
              index: position
            }]
          })

          // Track recommendation effectiveness
          gtag("event", "recommendation_effectiveness", {
            event_category: "Product Recommendations",
            event_label: recommendationType,
            recommendation_type: recommendationType,
            product_clicked: product.name,
            position: position,
            value: product.salePrice || product.price
          })
        }

        // @ts-ignore
        window.recommendationAnalytics = {
          trackRecommendationView,
          trackRecommendationClick
        }
      }

      // SEARCH AND FILTER ANALYTICS
      const setupSearchAnalytics = () => {
        // Track site search
        const trackSiteSearch = (searchTerm: string, resultsCount: number, filters?: any) => {
          gtag("event", "search", {
            search_term: searchTerm,
            search_results_count: resultsCount,
            filters_applied: filters ? Object.keys(filters).length : 0,
            ...filters
          })

          // Track search intent
          const intent = categorizeSearchIntent(searchTerm)
          gtag("event", "search_intent", {
            event_category: "Search Analytics",
            event_label: intent,
            search_term: searchTerm,
            intent_category: intent
          })
        }

        // Categorize search intent
        const categorizeSearchIntent = (searchTerm: string) => {
          const term = searchTerm.toLowerCase()
          
          if (term.includes("barn") || term.includes("bypass") || term.includes("bifold")) {
            return "product_type"
          } else if (term.includes("price") || term.includes("cost") || term.includes("$")) {
            return "pricing"
          } else if (term.includes("install") || term.includes("service")) {
            return "installation"
          } else if (term.includes("white") || term.includes("black") || term.includes("wood")) {
            return "style_color"
          } else {
            return "general"
          }
        }

        // Track filter usage
        const trackFilterUsage = (filterType: string, filterValue: string, resultsCount: number) => {
          gtag("event", "filter_applied", {
            event_category: "Search Analytics",
            event_label: `${filterType}: ${filterValue}`,
            filter_type: filterType,
            filter_value: filterValue,
            results_count: resultsCount
          })
        }

        // @ts-ignore
        window.searchAnalytics = {
          trackSiteSearch,
          trackFilterUsage
        }
      }

      // PERFORMANCE AND INVENTORY ANALYTICS
      const setupPerformanceTracking = () => {
        // Track product performance metrics
        const trackProductPerformance = (product: any, metrics: any) => {
          gtag("event", "product_performance", {
            event_category: "Product Analytics",
            event_label: product.name,
            product_id: product.id,
            views: metrics.views || 0,
            cart_additions: metrics.cartAdditions || 0,
            purchases: metrics.purchases || 0,
            conversion_rate: metrics.conversionRate || 0,
            revenue: metrics.revenue || 0
          })
        }

        // Track inventory alerts
        const trackInventoryAlert = (product: any, alertType: "low_stock" | "out_of_stock" | "back_in_stock") => {
          gtag("event", "inventory_alert", {
            event_category: "Inventory Analytics",
            event_label: alertType,
            product_id: product.id,
            product_name: product.name,
            alert_type: alertType,
            stock_level: product.stockLevel || 0
          })
        }

        // @ts-ignore
        window.performanceAnalytics = {
          trackProductPerformance,
          trackInventoryAlert
        }
      }

      // CUSTOMER BEHAVIOR ANALYTICS
      const setupCustomerBehaviorTracking = () => {
        // Track customer segments
        const trackCustomerSegment = (segment: string, value: number) => {
          gtag("event", "customer_segment", {
            event_category: "Customer Analytics",
            event_label: segment,
            segment_type: segment,
            segment_value: value
          })
        }

        // Track customer journey milestones
        const trackCustomerJourney = (milestone: string, data?: any) => {
          gtag("event", "customer_journey", {
            event_category: "Customer Journey",
            event_label: milestone,
            journey_stage: milestone,
            ...data
          })
        }

        // Track abandonment events
        const trackAbandonment = (abandonmentType: "cart" | "quote" | "checkout", data?: any) => {
          gtag("event", "abandonment", {
            event_category: "Abandonment Analytics",
            event_label: abandonmentType,
            abandonment_type: abandonmentType,
            ...data
          })
        }

        // @ts-ignore
        window.customerBehaviorAnalytics = {
          trackCustomerSegment,
          trackCustomerJourney,
          trackAbandonment
        }
      }

      // Initialize all e-commerce tracking
      const initializeEcommerceTracking = () => {
        setupProductTracking()
        setupPurchaseFunnelTracking()
        setupRecommendationTracking()
        setupSearchAnalytics()
        setupPerformanceTracking()
        setupCustomerBehaviorTracking()
      }

      // Initialize when DOM is ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeEcommerceTracking)
      } else {
        initializeEcommerceTracking()
      }

      // Auto-track product page views
      if (window.location.pathname.includes("/products/")) {
        const productName = document.querySelector("h1")?.textContent
        if (productName && (window as any).ecommerceAnalytics) {
          // Extract product data from page
          const product = {
            id: window.location.pathname.split("/").pop(),
            name: productName,
            price: parseFloat(document.querySelector('[data-price]')?.getAttribute('data-price') || "0"),
            category: "Closet Doors"
          }
          
          setTimeout(() => {
            (window as any).ecommerceAnalytics.trackProductView(product)
          }, 1000)
        }
      }
    }
  }, [gaId])

  return null
}

// Helper functions for external use
export const trackProductView = (product: any) => {
  if (typeof window !== "undefined" && (window as any).ecommerceAnalytics) {
    (window as any).ecommerceAnalytics.trackProductView(product)
  }
}

export const trackAddToCart = (product: any, quantity: number = 1, source?: string) => {
  if (typeof window !== "undefined" && (window as any).ecommerceAnalytics) {
    (window as any).ecommerceAnalytics.trackAddToCart(product, quantity, source)
  }
}

export const trackSearch = (searchTerm: string, resultsCount: number, filters?: any) => {
  if (typeof window !== "undefined" && (window as any).searchAnalytics) {
    (window as any).searchAnalytics.trackSiteSearch(searchTerm, resultsCount, filters)
  }
}