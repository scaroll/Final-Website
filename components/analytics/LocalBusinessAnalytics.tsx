"use client"

import { useEffect, useState } from "react"

interface LocalBusinessAnalyticsProps {
  gaId: string
  businessLocation: {
    lat: number
    lng: number
    city: string
    province: string
  }
  serviceAreas: string[]
}

interface LocationData {
  city?: string
  region?: string
  country?: string
  coordinates?: {
    lat: number
    lng: number
  }
  timezone?: string
  isServiceArea?: boolean
  distanceFromBusiness?: number
}

// Local business performance metrics and geographic analysis for PG Closets Ottawa
export function LocalBusinessAnalytics({
  gaId,
  businessLocation = { lat: 45.4215, lng: -75.6972, city: "Ottawa", province: "ON" },
  serviceAreas = ["Ottawa", "Kanata", "Nepean", "Orleans", "Barrhaven", "Gloucester", "Gatineau"]
}: LocalBusinessAnalyticsProps) {
  const [userLocation, setUserLocation] = useState<LocationData | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      const gtag = window.gtag

      // GEOGRAPHIC VISITOR ANALYSIS
      const setupGeographicTracking = async () => {
        try {
          // Get user's location (requires user permission)
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userCoords = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }

                // Calculate distance from business
                const distance = calculateDistance(
                  businessLocation.lat,
                  businessLocation.lng,
                  userCoords.lat,
                  userCoords.lng
                )

                // Reverse geocode to get location details
                reverseGeocode(userCoords.lat, userCoords.lng).then(locationData => {
                  const enrichedLocation: LocationData = {
                    ...locationData,
                    coordinates: userCoords,
                    distanceFromBusiness: distance,
                    isServiceArea: serviceAreas.some(area => 
                      locationData.city?.toLowerCase().includes(area.toLowerCase()) ||
                      locationData.region?.toLowerCase().includes(area.toLowerCase())
                    )
                  }

                  setUserLocation(enrichedLocation)
                  trackGeographicVisit(enrichedLocation)
                })
              },
              (error) => {
                // Fallback to IP-based location
                getIPLocation().then(locationData => {
                  if (locationData) {
                    setUserLocation(locationData)
                    trackGeographicVisit(locationData)
                  }
                })
              },
              { enableHighAccuracy: false, timeout: 10000, maximumAge: 3600000 }
            )
          } else {
            // No geolocation support, use IP-based location
            const locationData = await getIPLocation()
            if (locationData) {
              setUserLocation(locationData)
              trackGeographicVisit(locationData)
            }
          }
        } catch (error) {
          console.warn("Location tracking failed:", error)
        }
      }

      // Calculate distance between two coordinates using Haversine formula
      const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
        const R = 6371 // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLng = (lng2 - lng1) * Math.PI / 180
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLng/2) * Math.sin(dLng/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
      }

      // Reverse geocode coordinates to location details
      const reverseGeocode = async (lat: number, lng: number): Promise<LocationData> => {
        try {
          // Note: In production, you'd use a proper geocoding service like Google Maps API
          // This is a simplified example
          return {
            city: "Ottawa", // Placeholder - implement actual reverse geocoding
            region: "Ontario",
            country: "Canada",
            timezone: "America/Toronto"
          }
        } catch (error) {
          return {}
        }
      }

      // Get IP-based location (fallback)
      const getIPLocation = async (): Promise<LocationData | null> => {
        try {
          // Note: Use a service like ipapi.co, ipinfo.io, or similar
          // This is a simplified example
          return {
            city: "Unknown",
            region: "Unknown", 
            country: "Unknown",
            isServiceArea: false
          }
        } catch (error) {
          return null
        }
      }

      // Track geographic visit
      const trackGeographicVisit = (location: LocationData) => {
        gtag("event", "geographic_visit", {
          event_category: "Local Business",
          event_label: `Visit from ${location.city || "Unknown"}, ${location.region || "Unknown"}`,
          visitor_city: location.city || "Unknown",
          visitor_region: location.region || "Unknown", 
          visitor_country: location.country || "Unknown",
          is_service_area: location.isServiceArea || false,
          distance_from_business: location.distanceFromBusiness || 0,
          custom_map: {
            local_visitor: location.isServiceArea,
            visitor_distance: location.distanceFromBusiness
          }
        })

        // Track service area performance
        if (location.isServiceArea) {
          gtag("event", "service_area_visit", {
            event_category: "Local Business",
            event_label: "Service Area Visitor",
            service_area: location.city || "Unknown",
            visitor_type: "local",
            value: 10 // Higher value for local visitors
          })
        } else {
          gtag("event", "outside_service_area_visit", {
            event_category: "Local Business", 
            event_label: "Outside Service Area",
            distance: location.distanceFromBusiness || 0,
            visitor_type: "remote",
            expansion_opportunity: (location.distanceFromBusiness || 0) < 100 ? "potential" : "unlikely"
          })
        }

        // Track local search intent
        const referrer = document.referrer
        if (referrer.includes("google.com") && location.isServiceArea) {
          gtag("event", "local_search_visit", {
            event_category: "Local SEO",
            event_label: "Local Google Search",
            search_source: "google",
            visitor_location: location.city,
            is_local: true
          })
        }
      }

      // LOCAL SEARCH PERFORMANCE TRACKING
      const setupLocalSearchTracking = () => {
        // Track local business keywords
        const localKeywords = [
          "closets ottawa",
          "closet doors ottawa", 
          "custom closets ottawa",
          "closet installation ottawa",
          "barn doors ottawa",
          "kanata closets",
          "nepean closets",
          "barrhaven closets",
          "orleans closets"
        ]

        // Check if visitor came from local search
        const referrer = document.referrer.toLowerCase()
        const searchParams = new URLSearchParams(window.location.search)
        const utm_term = searchParams.get("utm_term")?.toLowerCase()

        if (referrer.includes("google.com") || utm_term) {
          const searchTerm = utm_term || "organic_search"
          const isLocalKeyword = localKeywords.some(keyword => 
            searchTerm.includes(keyword) || referrer.includes(keyword.replace(" ", "+"))
          )

          gtag("event", "search_traffic_analysis", {
            event_category: "Local SEO",
            event_label: isLocalKeyword ? "Local Keyword" : "Generic Keyword",
            search_term: searchTerm,
            is_local_keyword: isLocalKeyword,
            referrer_source: referrer.includes("google.com") ? "google" : "other",
            visitor_intent: isLocalKeyword ? "local_service" : "general_research"
          })
        }

        // Track local business directory traffic
        const localDirectories = [
          "yelp.com",
          "yellowpages.ca",
          "google.com/maps",
          "foursquare.com",
          "bbb.org",
          "angieslist.com"
        ]

        localDirectories.forEach(directory => {
          if (referrer.includes(directory)) {
            gtag("event", "local_directory_referral", {
              event_category: "Local Business",
              event_label: `Traffic from ${directory}`,
              directory_source: directory,
              referral_type: "local_directory",
              value: 25 // Higher value for local directory traffic
            })
          }
        })
      }

      // COMPETITOR ANALYSIS TRACKING
      const setupCompetitorTracking = () => {
        const competitors = [
          "customclosets.ca",
          "closetworks.com", 
          "californiaclosets.com",
          "organizeitall.ca",
          "spacesolutions.ca"
        ]

        // Track if visitor came from competitor sites
        const referrer = document.referrer.toLowerCase()
        competitors.forEach(competitor => {
          if (referrer.includes(competitor)) {
            gtag("event", "competitor_referral", {
              event_category: "Competitive Analysis",
              event_label: `From ${competitor}`,
              competitor_source: competitor,
              visitor_intent: "comparison_shopping",
              value: 50 // High value for competitor comparison traffic
            })
          }
        })

        // Track competitor-related searches
        const searchParams = new URLSearchParams(window.location.search)
        const utm_term = searchParams.get("utm_term")?.toLowerCase()
        
        if (utm_term && competitors.some(comp => utm_term.includes(comp.split(".")[0]))) {
          gtag("event", "competitor_comparison_search", {
            event_category: "Competitive Analysis",
            event_label: "Competitor Comparison",
            search_term: utm_term,
            visitor_intent: "price_comparison"
          })
        }
      }

      // SERVICE AREA PERFORMANCE ANALYSIS
      const setupServiceAreaTracking = () => {
        if (userLocation && userLocation.isServiceArea) {
          const serviceArea = serviceAreas.find(area => 
            userLocation.city?.toLowerCase().includes(area.toLowerCase())
          ) || userLocation.city || "Unknown"

          // Track service area performance metrics
          gtag("event", "service_area_performance", {
            event_category: "Service Area Analytics",
            event_label: serviceArea,
            service_area: serviceArea,
            visitor_count: 1,
            performance_metric: "visit"
          })

          // Track time-based patterns for service areas
          const hour = new Date().getHours()
          const dayOfWeek = new Date().getDay()
          
          gtag("event", "service_area_timing", {
            event_category: "Service Area Analytics",
            event_label: `${serviceArea} - ${getTimeOfDay(hour)}`,
            service_area: serviceArea,
            hour_of_day: hour,
            day_of_week: dayOfWeek,
            time_period: getTimeOfDay(hour)
          })

          // Track service area conversion potential
          const conversionPotential = calculateConversionPotential(serviceArea, hour, dayOfWeek)
          gtag("event", "conversion_potential", {
            event_category: "Service Area Analytics", 
            event_label: `${serviceArea} - ${conversionPotential}`,
            service_area: serviceArea,
            conversion_potential: conversionPotential,
            potential_score: conversionPotential === "high" ? 100 : conversionPotential === "medium" ? 60 : 30
          })
        }
      }

      // Helper function to get time of day
      const getTimeOfDay = (hour: number): string => {
        if (hour < 6) return "early_morning"
        if (hour < 12) return "morning"
        if (hour < 17) return "afternoon"
        if (hour < 21) return "evening"
        return "night"
      }

      // Calculate conversion potential based on area and timing
      const calculateConversionPotential = (area: string, hour: number, dayOfWeek: number): "high" | "medium" | "low" => {
        // Ottawa/central areas during business hours = high potential
        if (["ottawa", "nepean", "gloucester"].some(a => area.toLowerCase().includes(a)) && 
            hour >= 9 && hour <= 17 && dayOfWeek >= 1 && dayOfWeek <= 5) {
          return "high"
        }
        
        // Service areas during reasonable hours = medium potential
        if (serviceAreas.some(a => area.toLowerCase().includes(a.toLowerCase())) && 
            hour >= 8 && hour <= 20) {
          return "medium"
        }
        
        return "low"
      }

      // LOCAL BUSINESS REVIEW AND REPUTATION TRACKING
      const setupReputationTracking = () => {
        // Track review-related page visits
        const reviewPages = ["/reviews", "/testimonials", "/gallery"]
        if (reviewPages.some(page => window.location.pathname.includes(page))) {
          gtag("event", "reputation_page_visit", {
            event_category: "Reputation Management",
            event_label: "Review Page Visit",
            page_type: "reviews",
            visitor_location: userLocation?.city || "Unknown",
            is_local_visitor: userLocation?.isServiceArea || false
          })
        }

        // Track social proof interactions
        const setupSocialProofTracking = () => {
          const socialProofElements = document.querySelectorAll('[data-review], .testimonial, .review-stars, .rating')
          socialProofElements.forEach(element => {
            element.addEventListener("click", () => {
              gtag("event", "social_proof_interaction", {
                event_category: "Social Proof",
                event_label: "Review Interaction",
                element_type: element.className,
                visitor_location: userLocation?.city || "Unknown",
                trust_signal: "review_engagement"
              })
            })
          })
        }

        setTimeout(setupSocialProofTracking, 1000)
      }

      // SEASONAL AND WEATHER IMPACT TRACKING
      const setupSeasonalTracking = () => {
        const month = new Date().getMonth() + 1
        const season = getSeason(month)
        
        gtag("event", "seasonal_visit", {
          event_category: "Seasonal Analytics",
          event_label: `${season} Visit`,
          season: season,
          month: month,
          is_peak_season: ["spring", "fall"].includes(season), // Home improvement seasons
          renovation_season: season === "spring" || season === "fall"
        })

        // Track holiday/special period impacts
        const specialPeriods = getSpecialPeriods()
        if (specialPeriods.length > 0) {
          specialPeriods.forEach(period => {
            gtag("event", "special_period_visit", {
              event_category: "Seasonal Analytics",
              event_label: period,
              special_period: period,
              marketing_opportunity: true
            })
          })
        }
      }

      // Helper function to determine season
      const getSeason = (month: number): string => {
        if (month >= 3 && month <= 5) return "spring"
        if (month >= 6 && month <= 8) return "summer"
        if (month >= 9 && month <= 11) return "fall"
        return "winter"
      }

      // Helper function to identify special periods
      const getSpecialPeriods = (): string[] => {
        const now = new Date()
        const month = now.getMonth() + 1
        const day = now.getDate()
        const periods: string[] = []

        // Add special periods relevant to home improvement
        if (month === 1 && day <= 31) periods.push("new_year_organization")
        if (month === 3 && day >= 15) periods.push("spring_renovation") 
        if (month === 9 && day >= 15) periods.push("fall_organization")
        if (month === 11 && day >= 15) periods.push("pre_holiday_prep")
        if (month === 12) periods.push("holiday_season")

        return periods
      }

      // Initialize all local business tracking
      setupGeographicTracking()
      setupLocalSearchTracking()
      setupCompetitorTracking()
      setupServiceAreaTracking()
      setupReputationTracking()
      setupSeasonalTracking()

      // Expose tracking functions globally
      // @ts-ignore
      window.localBusinessAnalytics = {
        trackServiceRequest: (serviceType: string, location: string) => {
          gtag("event", "service_request", {
            event_category: "Local Business",
            event_label: `${serviceType} in ${location}`,
            service_type: serviceType,
            service_location: location,
            is_service_area: serviceAreas.includes(location),
            value: 100
          })
        },
        
        trackLocalEngagement: (engagementType: string, location: string) => {
          gtag("event", "local_engagement", {
            event_category: "Local Business",
            event_label: engagementType,
            engagement_type: engagementType,
            location: location,
            is_local: serviceAreas.some(area => location.toLowerCase().includes(area.toLowerCase()))
          })
        }
      }
    }
  }, [gaId, businessLocation, serviceAreas, userLocation])

  return null
}

// Export helper functions for external use
export const trackServiceAreaEvent = (eventType: string, serviceArea: string, data?: any) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", eventType, {
      event_category: "Service Area Performance",
      event_label: serviceArea,
      service_area: serviceArea,
      ...data
    })
  }
}

export const trackLocalBusinessGoal = (goalType: string, value: number, location?: string) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", "local_business_goal", {
      event_category: "Local Business Goals",
      event_label: goalType,
      goal_type: goalType,
      value: value,
      location: location || "Unknown",
      currency: "CAD"
    })
  }
}