"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import PgHeader from "@/components/PgHeader"
import PgFooter from "@/components/PgFooter"
import { ProductCard } from "@/components/store/product-card"
import { ProductFilters } from "@/components/store/product-filters"
import { Button } from "@/components/ui/button"
import { reninProducts } from "@/data/renin-products"


export default function ProductsPageClient() {
  const [filteredProducts, setFilteredProducts] = useState(reninProducts)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleFilterChange = (filters: { category: string; search: string }) => {
    let filtered = reninProducts

    if (filters.category !== "all") {
      filtered = filtered.filter((product) => product.category?.toLowerCase() === filters.category.toLowerCase())
    }

    if (filters.search) {
      filtered = filtered.filter(
        (product) =>
          (product.name && product.name.toLowerCase().includes(filters.search.toLowerCase())) ||
          (product.description && product.description.toLowerCase().includes(filters.search.toLowerCase())),
      )
    }

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
            <Link href="/contact">
              <Button className="btn-primary px-8 py-4 text-lg rounded-full">Request Work</Button>
            </Link>
            <Link href="/contact">
              <Button className="btn-secondary px-8 py-4 text-lg rounded-full">Get Quote</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-pg-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-pg-gray">
              Showing <span className="font-semibold text-pg-dark">{filteredProducts.length}</span> of{" "}
              <span className="font-semibold text-pg-dark">{reninProducts.length}</span> products
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
                <ProductCard {...product} product={product} />
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-pg-gray mb-4">No products found matching your criteria.</p>
              <Button className="btn-secondary" onClick={() => setFilteredProducts(reninProducts)}>
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
