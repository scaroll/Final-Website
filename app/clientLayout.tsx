"use client"
import type React from "react"
import PgHeader from "../components/PgHeader"
import PgFooter from "../components/PgFooter"
import { WebsiteJSONLD, OrganizationJSONLD } from "../lib/seo"
import { AuthProvider } from "../contexts/AuthContext"
import Script from "next/script"
import { PerformanceMonitor } from "../components/analytics/performance-monitor"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-pg-offwhite text-pg-dark">
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-8THLNNP89K" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8THLNNP89K');
        `}
      </Script>

      <WebsiteJSONLD />
      <OrganizationJSONLD />

      <AuthProvider>
        <PgHeader />
        {children}
        <PgFooter />
      </AuthProvider>

      <PerformanceMonitor />
    </div>
  )
}
