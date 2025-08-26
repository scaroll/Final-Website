import ProductsPageClient from "./ProductsPageClient"
import { reninProducts } from "../data/renin-products"

// ISR: Revalidate every hour for products page
export const revalidate = 3600

export default function ProductsPage() {
  // Pre-fetch comprehensive product data for ISR
  return <ProductsPageClient />
}
