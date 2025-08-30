"use client"

import { useEffect, useCallback, useState } from "react"

interface UserBehaviorAnalyticsProps {
  gaId: string
  enableHeatmaps?: boolean
  enableScrollTracking?: boolean
  enableClickTracking?: boolean
}

interface ScrollData {
  maxScroll: number
  milestones: number[]
  timeOnPage: number
  scrollEvents: Array<{
    timestamp: number
    scrollY: number
    scrollPercent: number
  }>
}

interface ClickData {
  x: number
  y: number
  timestamp: number
  element: string
  text: string
  url?: string
}

// Advanced user behavior analytics with heat mapping and engagement tracking
export function UserBehaviorAnalytics({ 
  gaId,
  enableHeatmaps = true,
  enableScrollTracking = true,
  enableClickTracking = true 
}: UserBehaviorAnalyticsProps) {
  const [sessionData, setSessionData] = useState({
    scrollData: {
      maxScroll: 0,
      milestones: [],
      timeOnPage: 0,
      scrollEvents: []
    } as ScrollData,
    clickData: [] as ClickData[],
    sessionStartTime: Date.now()
  })

  useEffect(() => {
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      const gtag = window.gtag

      // SCROLL DEPTH TRACKING
      const setupScrollTracking = () => {
        if (!enableScrollTracking) return

        let maxScrollPercent = 0
        let milestonesSent = new Set<number>()
        const scrollEvents: Array<{timestamp: number, scrollY: number, scrollPercent: number}> = []

        const trackScrollDepth = useCallback(() => {
          const scrollTop = window.scrollY
          const documentHeight = document.documentElement.scrollHeight - window.innerHeight
          const scrollPercent = Math.round((scrollTop / documentHeight) * 100)

          // Store scroll event
          scrollEvents.push({
            timestamp: Date.now(),
            scrollY: scrollTop,
            scrollPercent: scrollPercent
          })

          // Update max scroll
          if (scrollPercent > maxScrollPercent) {
            maxScrollPercent = scrollPercent
          }

          // Track milestone achievements
          const milestones = [10, 25, 50, 75, 90, 100]
          milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !milestonesSent.has(milestone)) {
              milestonesSent.add(milestone)
              
              gtag("event", "scroll_depth", {
                event_category: "User Behavior",
                event_label: `${milestone}% Scrolled`,
                value: milestone,
                scroll_depth: milestone,
                page_url: window.location.pathname,
                custom_map: { 
                  scroll_milestone: milestone,
                  time_to_scroll: Date.now() - sessionData.sessionStartTime
                }
              })

              // Track engagement quality based on scroll speed
              const timeToReachMilestone = Date.now() - sessionData.sessionStartTime
              const engagementQuality = timeToReachMilestone > (milestone * 500) ? "engaged" : "rapid_scroll"
              
              gtag("event", "scroll_engagement_quality", {
                event_category: "User Behavior",
                event_label: engagementQuality,
                milestone: milestone,
                time_to_milestone: timeToReachMilestone,
                engagement_type: engagementQuality
              })
            }
          })

          // Update session data
          setSessionData(prev => ({
            ...prev,
            scrollData: {
              ...prev.scrollData,
              maxScroll: maxScrollPercent,
              scrollEvents: scrollEvents.slice(-50) // Keep last 50 events
            }
          }))
        }, [])

        // Throttled scroll listener
        let scrollTimeout: NodeJS.Timeout
        const handleScroll = () => {
          clearTimeout(scrollTimeout)
          scrollTimeout = setTimeout(trackScrollDepth, 100)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        // Track reading pattern
        const trackReadingPattern = () => {
          const readingTime = Date.now() - sessionData.sessionStartTime
          const avgScrollSpeed = maxScrollPercent / (readingTime / 1000) // percent per second
          
          let readingPattern = "unknown"
          if (avgScrollSpeed < 2) readingPattern = "thorough_reader"
          else if (avgScrollSpeed < 5) readingPattern = "normal_reader" 
          else if (avgScrollSpeed < 15) readingPattern = "scanner"
          else readingPattern = "bouncer"

          gtag("event", "reading_pattern", {
            event_category: "User Behavior",
            event_label: readingPattern,
            reading_time: readingTime,
            max_scroll: maxScrollPercent,
            avg_scroll_speed: avgScrollSpeed,
            pattern_type: readingPattern
          })
        }

        // Track reading pattern after some time
        setTimeout(trackReadingPattern, 30000) // After 30 seconds

        return () => {
          window.removeEventListener("scroll", handleScroll)
          clearTimeout(scrollTimeout)
        }
      }

      // CLICK HEAT MAP TRACKING
      const setupClickTracking = () => {
        if (!enableClickTracking) return

        const trackClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement
          if (!target) return

          const clickData: ClickData = {
            x: event.clientX,
            y: event.clientY,
            timestamp: Date.now(),
            element: target.tagName.toLowerCase(),
            text: target.textContent?.slice(0, 100) || "",
            url: target.closest("a")?.href
          }

          // Store click data
          setSessionData(prev => ({
            ...prev,
            clickData: [...prev.clickData.slice(-99), clickData] // Keep last 100 clicks
          }))

          // Track specific element types
          const elementType = target.tagName.toLowerCase()
          const isInteractive = ["button", "a", "input", "select", "textarea"].includes(elementType)
          
          gtag("event", "click_tracking", {
            event_category: "User Behavior",
            event_label: `Click on ${elementType}`,
            element_type: elementType,
            is_interactive: isInteractive,
            click_x: event.clientX,
            click_y: event.clientY,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight,
            element_text: target.textContent?.slice(0, 50) || ""
          })

          // Track click context
          const section = target.closest("header, main, footer, nav, aside, section")?.tagName.toLowerCase() || "unknown"
          gtag("event", "click_context", {
            event_category: "User Behavior",
            event_label: `Click in ${section}`,
            page_section: section,
            element_type: elementType
          })

          // Track frustrated clicks (multiple rapid clicks)
          const recentClicks = sessionData.clickData.filter(
            click => Date.now() - click.timestamp < 2000
          ).length

          if (recentClicks > 3) {
            gtag("event", "frustrated_clicking", {
              event_category: "User Experience Issues",
              event_label: "Rapid Multiple Clicks",
              click_count: recentClicks,
              element_type: elementType,
              element_text: target.textContent?.slice(0, 50) || ""
            })
          }
        }

        document.addEventListener("click", trackClick, { passive: true })

        return () => {
          document.removeEventListener("click", trackClick)
        }
      }

      // MOUSE MOVEMENT HEAT MAP
      const setupMouseTracking = () => {
        if (!enableHeatmaps) return

        let mouseEvents: Array<{x: number, y: number, timestamp: number}> = []
        let lastMouseEvent = 0

        const trackMouseMovement = (event: MouseEvent) => {
          const now = Date.now()
          
          // Throttle mouse tracking
          if (now - lastMouseEvent < 100) return
          lastMouseEvent = now

          mouseEvents.push({
            x: event.clientX,
            y: event.clientY,
            timestamp: now
          })

          // Keep only recent events
          mouseEvents = mouseEvents.filter(e => now - e.timestamp < 10000) // Last 10 seconds
        }

        // Track mouse hovers on important elements
        const trackElementHovers = () => {
          const importantSelectors = [
            "button", 
            "a", 
            ".product-card", 
            ".quote-builder", 
            "[data-track-hover]"
          ]

          importantSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
              let hoverStartTime: number

              element.addEventListener("mouseenter", () => {
                hoverStartTime = Date.now()
              })

              element.addEventListener("mouseleave", () => {
                if (hoverStartTime) {
                  const hoverDuration = Date.now() - hoverStartTime
                  
                  gtag("event", "element_hover", {
                    event_category: "User Behavior",
                    event_label: `Hover on ${selector}`,
                    element_selector: selector,
                    hover_duration: hoverDuration,
                    element_text: element.textContent?.slice(0, 50) || ""
                  })

                  // Track long hovers as high interest
                  if (hoverDuration > 2000) {
                    gtag("event", "high_interest_hover", {
                      event_category: "User Engagement",
                      event_label: "Extended Hover",
                      element_selector: selector,
                      hover_duration: hoverDuration,
                      interest_level: "high"
                    })
                  }
                }
              })
            })
          })
        }

        document.addEventListener("mousemove", trackMouseMovement, { passive: true })
        
        // Initialize hover tracking after DOM is ready
        setTimeout(trackElementHovers, 1000)

        return () => {
          document.removeEventListener("mousemove", trackMouseMovement)
        }
      }

      // PAGE ENGAGEMENT SCORING
      const setupEngagementScoring = () => {
        const calculateEngagementScore = () => {
          const timeOnPage = Date.now() - sessionData.sessionStartTime
          const scrollPercent = sessionData.scrollData.maxScroll
          const clickCount = sessionData.clickData.length

          // Base scoring algorithm
          let score = 0
          
          // Time on page scoring (max 40 points)
          score += Math.min(timeOnPage / 1000 / 60 * 10, 40) // 10 points per minute, max 4 minutes
          
          // Scroll depth scoring (max 30 points)  
          score += (scrollPercent / 100) * 30
          
          // Interaction scoring (max 30 points)
          score += Math.min(clickCount * 2, 30)
          
          // Normalize to 0-100
          score = Math.min(Math.round(score), 100)

          gtag("event", "engagement_score", {
            event_category: "User Engagement",
            event_label: "Page Engagement Score",
            value: score,
            engagement_score: score,
            time_on_page: timeOnPage,
            scroll_percent: scrollPercent,
            click_count: clickCount,
            engagement_level: score > 70 ? "high" : score > 40 ? "medium" : "low"
          })

          return score
        }

        // Calculate engagement periodically
        const engagementInterval = setInterval(() => {
          calculateEngagementScore()
        }, 30000) // Every 30 seconds

        // Calculate final engagement on page unload
        window.addEventListener("beforeunload", () => {
          const finalScore = calculateEngagementScore()
          
          // Track session summary
          gtag("event", "session_summary", {
            event_category: "User Behavior",
            event_label: "Session End",
            final_engagement_score: finalScore,
            session_duration: Date.now() - sessionData.sessionStartTime,
            max_scroll_reached: sessionData.scrollData.maxScroll,
            total_clicks: sessionData.clickData.length,
            page_url: window.location.pathname
          })
        })

        return () => {
          clearInterval(engagementInterval)
        }
      }

      // VIEWPORT AND DEVICE ANALYTICS
      const setupViewportTracking = () => {
        const trackViewportInfo = () => {
          const viewport = {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
            orientation: window.screen?.orientation?.type || "unknown"
          }

          gtag("event", "viewport_info", {
            event_category: "Device Analytics",
            event_label: "Viewport Dimensions",
            viewport_width: viewport.width,
            viewport_height: viewport.height,
            device_pixel_ratio: viewport.devicePixelRatio,
            orientation: viewport.orientation,
            is_mobile: viewport.width < 768,
            is_tablet: viewport.width >= 768 && viewport.width < 1024,
            is_desktop: viewport.width >= 1024
          })
        }

        // Track initial viewport
        trackViewportInfo()

        // Track viewport changes
        window.addEventListener("resize", trackViewportInfo)
        window.addEventListener("orientationchange", trackViewportInfo)

        return () => {
          window.removeEventListener("resize", trackViewportInfo)
          window.removeEventListener("orientationchange", trackViewportInfo)
        }
      }

      // ATTENTION ANALYTICS
      const setupAttentionTracking = () => {
        let isVisible = true
        let focusStartTime = Date.now()
        let totalFocusTime = 0

        const handleVisibilityChange = () => {
          if (document.hidden) {
            if (isVisible) {
              totalFocusTime += Date.now() - focusStartTime
              isVisible = false
              
              gtag("event", "page_blur", {
                event_category: "Attention Analytics",
                event_label: "Page Lost Focus",
                focus_duration: Date.now() - focusStartTime,
                total_focus_time: totalFocusTime
              })
            }
          } else {
            if (!isVisible) {
              focusStartTime = Date.now()
              isVisible = true
              
              gtag("event", "page_focus", {
                event_category: "Attention Analytics", 
                event_label: "Page Gained Focus",
                total_focus_time: totalFocusTime
              })
            }
          }
        }

        const handleWindowFocus = () => {
          if (!isVisible) {
            focusStartTime = Date.now()
            isVisible = true
          }
        }

        const handleWindowBlur = () => {
          if (isVisible) {
            totalFocusTime += Date.now() - focusStartTime
            isVisible = false
          }
        }

        document.addEventListener("visibilitychange", handleVisibilityChange)
        window.addEventListener("focus", handleWindowFocus)
        window.addEventListener("blur", handleWindowBlur)

        // Track final attention metrics on unload
        window.addEventListener("beforeunload", () => {
          if (isVisible) {
            totalFocusTime += Date.now() - focusStartTime
          }
          
          const sessionDuration = Date.now() - sessionData.sessionStartTime
          const attentionRate = (totalFocusTime / sessionDuration) * 100

          gtag("event", "attention_metrics", {
            event_category: "Attention Analytics",
            event_label: "Session Attention Summary",
            session_duration: sessionDuration,
            total_focus_time: totalFocusTime,
            attention_rate: attentionRate,
            attention_quality: attentionRate > 80 ? "high" : attentionRate > 50 ? "medium" : "low"
          })
        })

        return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange)
          window.removeEventListener("focus", handleWindowFocus)
          window.removeEventListener("blur", handleWindowBlur)
        }
      }

      // Initialize all behavior tracking
      const cleanup: Array<(() => void) | void> = []
      
      cleanup.push(setupScrollTracking())
      cleanup.push(setupClickTracking())
      cleanup.push(setupMouseTracking())
      cleanup.push(setupEngagementScoring())
      cleanup.push(setupViewportTracking())
      cleanup.push(setupAttentionTracking())

      // Cleanup function
      return () => {
        cleanup.forEach(fn => fn && fn())
      }
    }
  }, [gaId, enableHeatmaps, enableScrollTracking, enableClickTracking, sessionData])

  return null
}

// Export helper functions
export const trackCustomBehavior = (eventName: string, data: Record<string, any>) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    // @ts-ignore
    window.gtag("event", eventName, {
      event_category: "Custom Behavior",
      ...data
    })
  }
}

export const getEngagementData = () => {
  // Return current engagement data for external use
  if (typeof window !== "undefined") {
    return {
      scrollPercent: Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100),
      timeOnPage: Date.now() - (window as any).pageStartTime || 0,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }
  return null
}