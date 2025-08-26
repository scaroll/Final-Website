import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { reninProducts } from "../../data/renin-products"

// ISR: Revalidate every 12 hours for location-specific pages
export const revalidate = 43200

const hardwareProducts = reninProducts.filter(product => 
  product.category?.toLowerCase() === "hardware" || 
  product.name.toLowerCase().includes("hardware") ||
  product.name.toLowerCase().includes("track")
)

export const metadata: Metadata = {
  title: "Closet Hardware Ottawa | Premium Door Tracks & Components | PG Closets",
  description: "Professional closet hardware installation in Ottawa. Premium tracks, soft-close systems, InvisiGlide & more. Complete hardware solutions with expert service.",
  keywords: "closet hardware Ottawa, door tracks Ottawa, soft close hardware Ottawa, barn door hardware Ottawa, closet door hardware Ottawa",
  openGraph: {
    title: "Closet Hardware Ottawa | Premium Door Tracks & Components | PG Closets",
    description: "Professional closet hardware installation in Ottawa. Premium tracks, soft-close systems, InvisiGlide & more.",
    images: [{ url: "/og-hardware-ottawa.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/closet-hardware-ottawa" },
}

export default function ClosetHardwareOttawaPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extralight mb-6 text-slate-900 tracking-tight">
              Closet Hardware Ottawa
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              The foundation of smooth, reliable door operation. From <span className="text-slate-900 font-normal">premium track systems</span> to 
              <span className="text-slate-900 font-normal"> innovative soft-close technology</span>, we install the hardware that makes the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-slate-900 text-white px-8 py-4 text-lg font-light tracking-wide hover:bg-slate-800 transition-all duration-300">
                  Get Free Quote
                </button>
              </Link>
              <Link href="/products">
                <button className="border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 px-8 py-4 text-lg font-light tracking-wide transition-all duration-300">
                  View All Hardware
                </button>
              </Link>
            </div>
          </div>

          {/* Hardware Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚪</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">Barn Door Hardware</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Heavy-duty track systems with smooth ball-bearing operation for barn doors up to 200 lbs.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">Soft-Close Systems</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Premium damping technology that ensures doors close gently and quietly every time.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-slate-200/50 text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-light text-slate-900 mb-4">InvisiGlide Technology</h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Hidden track systems that provide smooth operation while maintaining clean, minimal aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Professional Hardware Collection
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Every component engineered for <span className="text-slate-900 font-normal">durability and performance</span> in Ottawa homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hardwareProducts.map((product) => (
              <div key={product.id} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.name} - Closet Hardware Ottawa Installation`}
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

      {/* Quality Standards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extralight mb-6 text-slate-900">
              Quality That Lasts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-light text-slate-900 mb-6">Engineered for Ottawa Conditions</h3>
              <div className="space-y-4 text-slate-600 font-light">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Temperature Resistant:</strong> All hardware tested to perform reliably through Ottawa's extreme temperature variations.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Humidity Control:</strong> Corrosion-resistant finishes that withstand seasonal humidity changes.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Heavy Duty Construction:</strong> Commercial-grade components that handle daily residential use.
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Lifetime Warranty:</strong> Mechanical warranty coverage on all premium hardware systems.
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg">
              <h4 className="text-xl font-light text-slate-900 mb-4">Installation Standards</h4>
              <p className="text-slate-600 font-light leading-relaxed mb-4">
                Our certified installers follow strict protocols to ensure every hardware component is properly aligned, 
                securely mounted, and thoroughly tested before completion.
              </p>
              <p className="text-slate-600 font-light leading-relaxed">
                Each installation includes precision measurements, structural assessment, and final quality inspection 
                to guarantee smooth operation for years to come.
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
            "name": "Closet Hardware Installation Ottawa",
            "description": "Professional closet hardware installation services in Ottawa with premium track systems, soft-close mechanisms, and expert installation.",
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
            "serviceType": "Closet Hardware Installation",
            "offers": {
              "@type": "Offer",
              "description": "Premium closet hardware installation with lifetime warranty",
              "priceCurrency": "CAD",
              "priceRange": "$169-$399"
            }
          })
        }}
      />
    </div>
  )
}