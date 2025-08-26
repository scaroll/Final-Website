import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { reninProducts } from "../../data/renin-products"

// ISR: Revalidate every 12 hours for location-specific pages
export const revalidate = 43200

const barnDoors = reninProducts.filter(product => 
  product.category?.toLowerCase() === "barn doors" || 
  product.name.toLowerCase().includes("barn")
)

export const metadata: Metadata = {
  title: "Barn Doors Ottawa | Professional Installation | PG Closets",
  description: "Premium barn doors in Ottawa with professional installation. Gatsby Chevron, Sherwood InvisiGlide, and more. Free quotes from local experts serving Ottawa & NCR.",
  keywords: "barn doors Ottawa, barn door installation Ottawa, sliding doors Ottawa, closet barn doors Ottawa, Renin barn doors Ottawa",
  openGraph: {
    title: "Barn Doors Ottawa | Professional Installation | PG Closets",
    description: "Premium barn doors in Ottawa with professional installation. Gatsby Chevron, Sherwood InvisiGlide, and more.",
    images: [{ url: "/og-barn-doors-ottawa.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/barn-doors-ottawa" },
}

export default function BarnDoorsOttawaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 text-slate-900 tracking-tight">
              Barn Doors Ottawa
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              Transform your space with premium barn doors. Professional installation across Ottawa, Kanata, Nepean, and the entire NCR. 
              <span className="text-slate-900 font-normal"> Official Renin dealer</span> with 
              <span className="text-slate-900 font-normal"> 15+ years experience</span>.
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

          {/* Service Areas */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50">
            <h2 className="text-2xl font-light text-slate-900 mb-6 text-center">Serving Ottawa & Surrounding Areas</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm text-slate-600">
              <div>Ottawa</div>
              <div>Kanata</div>
              <div>Nepean</div>
              <div>Orleans</div>
              <div>Gloucester</div>
            </div>
          </div>
        </div>
      </section>

      {/* Barn Door Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Premium Barn Door Collection
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Carefully selected barn doors that combine <span className="text-slate-900 font-normal">style and functionality</span> for your Ottawa home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {barnDoors.map((product) => (
              <div key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Barn Door Ottawa Installation`}
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

      {/* Why Choose PG Closets */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Why Ottawa Chooses PG Closets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-3">Local Expertise</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                15+ years serving Ottawa homes. We understand local building codes and installation requirements.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-3">Premium Quality</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Official Renin dealer offering only the highest quality doors with professional-grade hardware.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-3">Complete Service</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                From initial consultation to final installation and warranty support. One team, complete solution.
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
            "name": "Barn Door Installation Ottawa",
            "description": "Professional barn door installation services in Ottawa with premium Renin doors and expert craftsmanship.",
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
            "serviceType": "Barn Door Installation",
            "offers": {
              "@type": "Offer",
              "description": "Premium barn door installation with professional service",
              "priceCurrency": "CAD",
              "priceRange": "$679-$1049"
            }
          })
        }}
      />
    </div>
  )
}