import ProductsPageClient from "./ProductsPageClient"

// ISR: Revalidate every hour for products page
export const revalidate = 3600

export default function ProductsPage() {
  // Pre-fetch comprehensive product data for ISR
  return <ProductsPageClient />
}
