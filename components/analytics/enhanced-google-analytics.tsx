"use client"

import Script from "next/script"
import { PerformanceAnalytics, SEOAnalytics, ConversionTracking, SpeedInsights } from "./performance-analytics"
import { ConversionTracking as EnhancedConversionTracking } from "./ConversionTracking"
import { EcommerceAnalytics } from "./EcommerceAnalytics"
import { UserBehaviorAnalytics } from "./UserBehaviorAnalytics"
import { LocalBusinessAnalytics } from "./LocalBusinessAnalytics"
import { AttributionAnalytics } from "./AttributionAnalytics"

interface EnhancedGoogleAnalyticsProps {
  gaId: string
  enableAdvancedTracking?: boolean
  enableHeatmaps?: boolean
  enableAttributionTracking?: boolean
}

export function EnhancedGoogleAnalytics({ 
  gaId,
  enableAdvancedTracking = true,
  enableHeatmaps = true,
  enableAttributionTracking = true
}: EnhancedGoogleAnalyticsProps) {
  return (
    <>
      {/* Core Google Analytics */}
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script
        id="google-analytics-enhanced"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true,
              // Enhanced ecommerce tracking
              custom_map: {
                'metric_value': 'custom_metric_1'
              },
              // SEO-specific tracking
              content_group1: 'SEO Traffic',
              content_group2: window.location.pathname,
              // Performance tracking
              site_speed_sample_rate: 100,
              // Enhanced link attribution
              link_attribution: true,
              // Cross-domain tracking for subdomains
              linker: {
                domains: ['pgclosets.com', 'www.pgclosets.com']
              },
              // Advanced attribution settings
              attribution_reporting_origin: window.location.origin,
              enhanced_conversions: true,
              // Custom dimensions for advanced tracking
              custom_parameter_name: 'page_section',
              custom_parameter_value: document.body.className || 'default'
            });

            // Track 404 errors for SEO
            if (document.title.includes('404') || document.title.includes('Not Found')) {
              gtag('event', 'page_not_found', {
                event_category: 'SEO',
                event_label: window.location.pathname,
                value: 1
              });
            }

            // Track external link clicks
            document.addEventListener('click', function(e) {
              const link = e.target.closest('a');
              if (link && link.hostname !== window.location.hostname) {
                gtag('event', 'external_link_click', {
                  event_category: 'SEO',
                  event_label: link.href,
                  transport_type: 'beacon'
                });
              }
            });

            // Track file downloads
            document.addEventListener('click', function(e) {
              const link = e.target.closest('a');
              if (link && link.href.match(/\\.(pdf|doc|docx|xls|xlsx|ppt|pptx|zip|rar|7z|exe|dmg)$/i)) {
                gtag('event', 'file_download', {
                  event_category: 'SEO',
                  event_label: link.href,
                  transport_type: 'beacon'
                });
              }
            });

            // Enhanced error tracking
            window.addEventListener('error', function(e) {
              gtag('event', 'javascript_error', {
                event_category: 'Technical Issues',
                event_label: e.message,
                error_filename: e.filename,
                error_line: e.lineno,
                error_column: e.colno
              });
            });

            // Track page performance issues
            window.addEventListener('load', function() {
              setTimeout(function() {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation && navigation.loadEventEnd > 3000) {
                  gtag('event', 'slow_page_load', {
                    event_category: 'Performance Issues',
                    event_label: 'Slow Load Time',
                    load_time: Math.round(navigation.loadEventEnd),
                    page_url: window.location.pathname
                  });
                }
              }, 1000);
            });
          `,
        }}
      />

      {/* Core Analytics Components */}
      <PerformanceAnalytics gaId={gaId} />
      <SEOAnalytics gaId={gaId} />
      <ConversionTracking gaId={gaId} />

      {/* Advanced Analytics Components */}
      {enableAdvancedTracking && (
        <>
          <EnhancedConversionTracking gaId={gaId} />
          <EcommerceAnalytics gaId={gaId} />
          <UserBehaviorAnalytics 
            gaId={gaId} 
            enableHeatmaps={enableHeatmaps}
            enableScrollTracking={true}
            enableClickTracking={true}
          />
          <LocalBusinessAnalytics 
            gaId={gaId}
            businessLocation={{
              lat: 45.4215,
              lng: -75.6972,
              city: "Ottawa",
              province: "ON"
            }}
            serviceAreas={["Ottawa", "Kanata", "Nepean", "Orleans", "Barrhaven", "Gloucester", "Gatineau"]}
          />
          {enableAttributionTracking && (
            <AttributionAnalytics 
              gaId={gaId}
              trackingWindow={30}
              enableCrossDomain={true}
            />
          )}
        </>
      )}

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </>
  )
}
