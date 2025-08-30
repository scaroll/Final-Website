import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import PgHeader from "@/components/PgHeader"
import PgFooter from "@/components/PgFooter"
import { LuxuryWalkInClient } from "./LuxuryWalkInClient"

export const metadata: Metadata = {
  title: "Luxury Walk-In Closet Renovations | Premium Custom Closets Ottawa",
  description: "Transform your space with luxury walk-in closet renovations. Custom design, premium materials, and expert craftsmanship. Free consultation for projects $10K+.",
  keywords: "luxury walk-in closets Ottawa, custom closet renovation, premium closet design, walk-in closet makeover, luxury storage solutions",
  openGraph: {
    title: "Luxury Walk-In Closet Renovations | PG Closets Ottawa",
    description: "Premium custom walk-in closet renovations with luxury finishes and expert design. Transform your space into a designer showcase.",
    images: [
      {
        url: `${siteConfig.url}/images/luxury-walkin-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury Walk-In Closet Renovation by PG Closets Ottawa"
      }
    ]
  }
}

export default function LuxuryWalkInClosetsPage() {
  return (
    <>
      <PgHeader />
      <LuxuryWalkInClient />
      <PgFooter />
    </>
  )
}