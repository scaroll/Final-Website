import type { MetadataRoute } from "next"
import { reninProducts } from "../data/renin-products"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.pgclosets.com"
  const currentDate = new Date().toISOString()

  // Core business pages with highest priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/custom-walk-in-closets`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/walk-in-closet-design-guide`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Dynamic product pages - high SEO value
  const productPages = reninProducts.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Category pages for Ottawa market
  const categoryPages = [
    {
      url: `${baseUrl}/barn-doors-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bypass-doors-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/bifold-doors-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/closet-hardware-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  // Ottawa location pages for local SEO - EXPANDED
  const locationPages = [
    "ottawa",
    "kanata", 
    "nepean",
    "gloucester",
    "orleans",
    "barrhaven",
    "westboro",
    "the-glebe",
    "hintonburg",
    "vanier",
    "south-keys",
    "riverside-south",
    "manotick",
    "stittsville",
    "carp"
  ].map(location => ({
    url: `${baseUrl}/${location}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Service + Location combinations for maximum local SEO coverage
  const serviceLocationPages = []
  const services = ['barn-doors', 'bypass-doors', 'bifold-doors', 'closet-hardware', 'installation']
  const primaryLocations = ['ottawa', 'kanata', 'nepean', 'orleans', 'barrhaven']
  
  for (const service of services) {
    for (const location of primaryLocations) {
      serviceLocationPages.push({
        url: `${baseUrl}/${service}-${location}`,
        lastModified: currentDate,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })
    }
  }

  // Long-tail keyword pages
  const longTailPages = [
    {
      url: `${baseUrl}/custom-closet-doors-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/professional-closet-installation-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/renin-doors-ottawa`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/closet-door-repair-ottawa`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }
  ]

  return [
    ...staticPages, 
    ...productPages, 
    ...categoryPages, 
    ...locationPages, 
    ...serviceLocationPages, 
    ...longTailPages
  ]
}
