import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import PgHeader from "@/components/PgHeader"
import PgFooter from "@/components/PgFooter" 
import { AdvancedQuoteBuilder } from "@/components/quoting/AdvancedQuoteBuilder"

export const metadata: Metadata = {
  title: "Professional Quote Builder | Custom Closet Doors Ottawa | PG Closets",
  description: "Get instant pricing for your custom closet project. Professional quote builder with Renin products, Canadian pricing, and Jobber integration for seamless ordering.",
  keywords: "closet quote Ottawa, custom closet pricing, Renin door quotes, professional installation quotes, closet door calculator",
  openGraph: {
    title: "Professional Quote Builder | PG Closets Ottawa",
    description: "Configure your perfect closet solution and get instant professional pricing with our advanced quote builder.",
    images: [
      {
        url: `${siteConfig.url}/images/quote-builder-og.jpg`,
        width: 1200,
        height: 630,
        alt: "PG Closets Professional Quote Builder"
      }
    ]
  }
}

// ISR: Revalidate every hour for pricing updates
export const revalidate = 3600

export default function QuoteBuilderPage() {
  return (
    <>
      <PgHeader />
      <main className="min-h-screen bg-slate-50 py-8">
        <AdvancedQuoteBuilder />
      </main>
      <PgFooter />
    </>
  )
}