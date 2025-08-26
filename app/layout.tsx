import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./clientLayout"
import type React from "react"
import { Suspense } from "react"
import Script from "next/script"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pgclosets.ca"),
  title: {
    default: "PG Closets | Custom Closets & Storage Solutions in Ottawa",
    template: "%s | PG Closets",
  },
  description:
    "Custom closets, pantries, and storage solutions in Ottawa and the NCR. Professional design, installation, and service by local experts. Request your free quote today.",
  keywords:
    "custom closets Ottawa, closet design Ottawa, storage solutions Ottawa, pantry organization, garage storage, closet installation, home organization Ottawa, custom storage NCR",
  authors: [{ name: "PG Closets" }],
  creator: "PG Closets",
  publisher: "PG Closets",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "PG Closets",
    url: "https://www.pgclosets.ca",
    title: "PG Closets | Custom Closets & Storage Solutions in Ottawa",
    description:
      "Custom closets, pantries, and storage solutions in Ottawa and the NCR. Professional design, installation, and service by local experts.",
    locale: "en_CA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PG Closets - Custom Storage Solutions Ottawa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PG Closets | Custom Closets & Storage Solutions in Ottawa",
    description:
      "Custom closets, pantries, and storage solutions in Ottawa and the NCR. Professional design, installation, and service by local experts.",
    images: ["/og-image.jpg"],
    creator: "@pgclosets",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GA_ID,
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Ottawa",
    "geo.position": "45.4215;-75.6972",
    ICBM: "45.4215, -75.6972",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font preloading for Core Web Vitals optimization */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          />
        </noscript>
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        
        {/* Resource hints for better performance */}
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>

        {/* Structured Data JSON-LD */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.pgclosets.ca/#organization",
              "name": "PG Closets",
              "alternateName": "PG Closets Ottawa",
              "url": "https://www.pgclosets.ca",
              "logo": "https://www.pgclosets.ca/images/pg-logo.jpg",
              "description": "Ottawa's premier closet door specialists, providing quality Renin doors and professional installation services since 2010.",
              "telephone": "+1-613-555-0123",
              "email": "info@pgclosets.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "CA",
                "addressRegion": "ON",
                "addressLocality": "Ottawa",
                "streetAddress": "Ottawa, Ontario"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "45.4215",
                "longitude": "-75.6972"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Ottawa",
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                },
                {
                  "@type": "City", 
                  "name": "Kanata",
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                },
                {
                  "@type": "City",
                  "name": "Nepean", 
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                },
                {
                  "@type": "City",
                  "name": "Gloucester",
                  "addressRegion": "ON", 
                  "addressCountry": "CA"
                },
                {
                  "@type": "City",
                  "name": "Orleans",
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                },
                {
                  "@type": "City",
                  "name": "Barrhaven",
                  "addressRegion": "ON",
                  "addressCountry": "CA"
                }
              ],
              "priceRange": "$200-$1500",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification", 
                  "dayOfWeek": "Saturday",
                  "opens": "09:00",
                  "closes": "16:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday", 
                  "opens": "10:00",
                  "closes": "15:00"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Closet Door Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Barn Door Installation",
                      "description": "Professional barn door installation with quality Renin doors"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Bypass Door Installation",
                      "description": "Space-saving bypass closet door installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Bifold Door Installation",
                      "description": "Folding bifold closet door installation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Free Consultation",
                      "description": "Complimentary in-home consultation and quote"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "98",
                "bestRating": "5",
                "worstRating": "1"
              },
              "foundingDate": "2010",
              "founder": {
                "@type": "Organization",
                "name": "PG Closets"
              },
              "sameAs": [
                "https://www.google.com/maps/place/PG+Closets+Ottawa"
              ]
            })
          }}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
