"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: 1,
    name: "Heritage Herringbone Chevron",
    category: "Barn Doors",
    price: "$899",
    image: "/images/arcat/renin_192861_Heritage_Herringbone_Chevron_Design.jpg",
    description: "Rustic barn door with authentic chevron pattern",
  },
  {
    id: 2,
    name: "Continental Pavilion 5-Lite",
    category: "Sliding Doors",
    price: "$649",
    image: "/images/arcat/renin_176733_Continental_Pavilion_5_Lite.jpg",
    description: "Modern 5-panel glass design for contemporary homes",
  },
  {
    id: 3,
    name: "Euro 3-Lite Georgian",
    category: "Bifold Doors",
    price: "$549",
    image: "/images/arcat/renin_176737_Euro_3_Lite_Georgian_6_Panel_Design.jpg",
    description: "Classic Georgian styling with premium glass panels",
  },
  {
    id: 4,
    name: "Continental Hall 3-Lite",
    category: "Pivot Doors",
    price: "$729",
    image: "/images/arcat/renin_176732_Continental_Hall_3_Lite.jpg",
    description: "Elegant pivot door with triple glass configuration",
  },
]

export default function FeaturedProductsShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)

  return (
    <section className="section-apple bg-gradient-to-br from-gray-50 to-white">
      <div className="container-apple">
        <div className="text-center mb-16">
          <h2 className="text-h2 mb-4">Featured Renin Products</h2>
          <p className="text-body-m text-pg-dark opacity-80">
            Discover our most popular closet door designs, crafted for Canadian homes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeProduct === index
                    ? "bg-white shadow-lg border-2 border-pg-sky"
                    : "bg-white/50 hover:bg-white hover:shadow-md"
                }`}
                onClick={() => setActiveProduct(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-pg-navy">{product.name}</h3>
                    <p className="text-sm text-pg-gray mb-1">{product.category}</p>
                    <p className="text-sm text-pg-dark opacity-80">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-pg-navy">{product.price}</div>
                    <div className="text-sm text-pg-gray">Starting at</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={featuredProducts[activeProduct].image || "/placeholder.svg"}
                alt={featuredProducts[activeProduct].name}
                className="w-full h-full object-cover transition-all duration-500"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-pg-navy mb-1">{featuredProducts[activeProduct].price}</div>
                <Button variant="primary" size="sm" href="/products">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
