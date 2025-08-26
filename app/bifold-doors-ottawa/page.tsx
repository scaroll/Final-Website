import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { reninProducts } from "../../data/renin-products"

// ISR: Revalidate every 12 hours for location-specific pages
export const revalidate = 43200

const bifoldDoors = reninProducts.filter(product => 
  product.category?.toLowerCase() === "bifold doors" || 
  product.name.toLowerCase().includes("bifold")
)

export const metadata: Metadata = {
  title: "Bifold Doors Ottawa | Folding Closet Doors | PG Closets",
  description: "Premium bifold doors in Ottawa with professional installation. Georgian, Euro 1-Lite & more folding door systems. Space-efficient solutions with expert service.",
  keywords: "bifold doors Ottawa, folding doors Ottawa, bifold closet doors Ottawa, folding closet doors Ottawa, closet doors Ottawa",
  openGraph: {
    title: "Bifold Doors Ottawa | Folding Closet Doors | PG Closets",
    description: "Premium bifold doors in Ottawa with professional installation. Georgian, Euro 1-Lite & more folding door systems.",
    images: [{ url: "/og-bifold-doors-ottawa.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/bifold-doors-ottawa" },
}

export default function BifoldDoorsOttawaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 text-slate-900 tracking-tight">
              Bifold Doors Ottawa
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              Classic folding closet doors that provide <span className="text-slate-900 font-normal">full access</span> to your closet space. 
              Traditional and contemporary styles with <span className="text-slate-900 font-normal">professional installation</span> across Ottawa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-slate-900 text-white px-8 py-4 text-lg font-light tracking-wide hover:bg-slate-800 transition-all duration-300">
                  Get Free Quote
                </button>
              </Link>
              <Link href="/products">
                <button className="border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 px-8 py-4 text-lg font-light tracking-wide transition-all duration-300">
                  View All Products
                </button>
              </Link>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50">
              <h3 className="text-xl font-light text-slate-900 mb-4">Full Closet Access</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Unlike sliding doors that only provide half access, bifold doors open completely to give you full access to your entire closet space.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50">
              <h3 className="text-xl font-light text-slate-900 mb-4">Compact Operation</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Bifold doors require minimal clearance to operate, making them perfect for tight spaces and narrow hallways in Ottawa homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bifold Door Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Bifold Door Collection
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Traditional and contemporary folding doors for <span className="text-slate-900 font-normal">every Ottawa home style</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bifoldDoors.map((product) => (
              <div key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Bifold Door Ottawa Installation`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-light text-slate-900">
                      From ${product.price.toLocaleString()} CAD
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link href={`/products/${product.id}`}>
                      <button className="w-full bg-slate-900 text-white py-3 font-light text-sm tracking-wide hover:bg-slate-800 transition-all duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Guide */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Choosing the Right Style
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Traditional Styles</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6">
                Our Georgian and Provincial collections offer timeless appeal with raised panels and classic proportions. 
                Perfect for heritage homes and traditional décor throughout Ottawa's established neighborhoods.
              </p>
              <ul className="space-y-2 text-slate-600 font-light">
                <li>• Georgian raised panel design</li>
                <li>• Provincial 8-lite glass options</li>
                <li>• Classic proportions and detailing</li>
                <li>• Available in multiple finishes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-4">Contemporary Styles</h3>
              <p className="text-slate-600 font-light leading-relaxed mb-6">
                The Euro collection features clean lines and modern proportions. Ideal for contemporary Ottawa homes 
                and minimalist interior designs that emphasize simplicity and function.
              </p>
              <ul className="space-y-2 text-slate-600 font-light">
                <li>• Euro 1-lite and 3-lite configurations</li>
                <li>• Clean, minimalist design</li>
                <li>• Modern hardware and finishes</li>
                <li>• Seamless integration with contemporary interiors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Bifold Door Installation Ottawa",
            "description": "Professional bifold door installation services in Ottawa with premium folding closet doors and expert craftsmanship.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "PG Closets",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ottawa",
                "addressRegion": "ON",
                "addressCountry": "CA"
              }
            },
            "areaServed": ["Ottawa", "Kanata", "Nepean", "Orleans", "Gloucester", "Barrhaven"],
            "serviceType": "Bifold Door Installation",
            "offers": {
              "@type": "Offer",
              "description": "Premium bifold door installation with professional service",
              "priceCurrency": "CAD",
              "priceRange": "$365-$499"
            }
          })
        }}
      />
    </div>
  )
}