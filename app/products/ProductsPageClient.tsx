"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import PgHeader from "@/components/PgHeader"
import PgFooter from "@/components/PgFooter"
import { ProductCard } from "@/components/store/product-card"
// import { ProductFilters } from "@/components/store/product-filters"
import { Button } from "@/components/ui/button"
import { enhancedReninCatalog, formatPrice, filterProducts } from "@/data/enhanced-renin-catalog"


export default function ProductsPageClient() {
  const [filteredProducts, setFilteredProducts] = useState(enhancedReninCatalog)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleFilterChange = (filters: { category: string; search: string }) => {
    const filtered = filterProducts(
      enhancedReninCatalog,
      filters.category === "all" ? undefined : filters.category,
      undefined, // price range
      undefined, // in stock filter
      filters.search
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen bg-pg-offwhite">
      <PgHeader />

      {/* Hero Section */}
      <section className="section-padding-lg bg-gradient-to-br from-pg-offwhite to-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="headline-large text-4xl md:text-6xl text-pg-dark mb-6">Renin Door Systems</h1>
          <p className="text-xl text-pg-gray mb-8 max-w-3xl mx-auto">
            Official Renin dealer offering premium barn doors, closet systems, and hardware with professional
            installation across Ottawa. All prices in Canadian dollars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/quote-builder">
              <Button className="btn-primary px-8 py-4 text-lg rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg">⚡ Instant Quote Builder</Button>
            </Link>
            <Link href="/luxury-walk-in-closets">
              <Button className="btn-secondary px-8 py-4 text-lg rounded-full border-amber-500 text-amber-600 hover:bg-amber-50">👑 Luxury Renovations</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-pg-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-pg-border rounded-lg focus:outline-none focus:ring-2 focus:ring-pg-sky"
              onChange={(e) => handleFilterChange({ category: "all", search: e.target.value })}
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-pg-gray">
              Showing <span className="font-semibold text-pg-dark">{filteredProducts.length}</span> of{" "}
              <span className="font-semibold text-pg-dark">{enhancedReninCatalog.length}</span> products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`transition-all duration-500 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-slate-600 mb-4 font-light">No products found matching your criteria.</p>
              <Button className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all font-light tracking-wide uppercase px-6 py-3 rounded-lg" onClick={() => setFilteredProducts(enhancedReninCatalog)}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <PgFooter />
    </div>
  )
}
