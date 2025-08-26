import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { reninProducts } from "../../data/renin-products"

// ISR: Revalidate every 12 hours for location-specific pages
export const revalidate = 43200

const bypassDoors = reninProducts.filter(product => 
  product.category?.toLowerCase() === "bypass doors" || 
  product.name.toLowerCase().includes("bypass")
)

export const metadata: Metadata = {
  title: "Bypass Doors Ottawa | Space-Saving Sliding Closet Doors | PG Closets",
  description: "Professional bypass door installation in Ottawa. Space-saving sliding closet doors with smooth operation. Euro Series, Harmony Steel & more. Free quotes.",
  keywords: "bypass doors Ottawa, sliding closet doors Ottawa, bypass door installation Ottawa, space saving doors Ottawa, closet doors Ottawa",
  openGraph: {
    title: "Bypass Doors Ottawa | Space-Saving Sliding Closet Doors | PG Closets",
    description: "Professional bypass door installation in Ottawa. Space-saving sliding closet doors with smooth operation.",
    images: [{ url: "/og-bypass-doors-ottawa.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/bypass-doors-ottawa" },
}

export default function BypassDoorsOttawaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 text-slate-900 tracking-tight">
              Bypass Doors Ottawa
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              Maximize your space with smooth-sliding bypass doors. Perfect for tight spaces in Ottawa homes. 
              <span className="text-slate-900 font-normal"> Professional installation</span> with 
              <span className="text-slate-900 font-normal"> lifetime warranty support</span>.
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

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-2">Space Efficient</h3>
              <p className="text-sm text-slate-600">Perfect for rooms where swing doors won't work</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-2">Smooth Operation</h3>
              <p className="text-sm text-slate-600">Ball-bearing track systems for effortless sliding</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">💎</span>
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-2">Premium Materials</h3>
              <p className="text-sm text-slate-600">Engineered wood core with durable finishes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bypass Door Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Bypass Door Collection
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Space-saving solutions designed for <span className="text-slate-900 font-normal">Ottawa living</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bypassDoors.map((product) => (
              <div key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Bypass Door Ottawa Installation`}
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

      {/* Installation Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Professional Installation Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-3">Free Consultation</h3>
              <p className="text-slate-600 font-light text-sm">
                In-home assessment and measurement with design recommendations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-3">Custom Quote</h3>
              <p className="text-slate-600 font-light text-sm">
                Detailed pricing with all materials and installation included
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-3">Professional Install</h3>
              <p className="text-slate-600 font-light text-sm">
                Expert installation with precision fitting and smooth operation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-3">Quality Assurance</h3>
              <p className="text-slate-600 font-light text-sm">
                Final inspection and warranty coverage for complete peace of mind
              </p>
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
            "name": "Bypass Door Installation Ottawa",
            "description": "Professional bypass door installation services in Ottawa with space-saving sliding closet doors and expert installation.",
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
            "serviceType": "Bypass Door Installation",
            "offers": {
              "@type": "Offer",
              "description": "Space-saving bypass door installation with professional service",
              "priceCurrency": "CAD",
              "priceRange": "$459-$589"
            }
          })
        }}
      />
    </div>
  )
}