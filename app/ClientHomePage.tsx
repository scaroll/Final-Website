"use client"

import { useState } from "react"
import Image from "next/image"

interface Product {
  name: string
  price: number
  image: string
  specs: string
}

interface ClientHomePageProps {
  products: Product[]
}

export default function ClientHomePage({ products }: ClientHomePageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quotePrice, setQuotePrice] = useState(459)

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white text-center py-2 text-sm font-light tracking-wide">
            ⭐ 5.0 • 🏠 500+ INSTALLATIONS • ⏰ 15+ YEARS • 98% SATISFACTION
          </div>

          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-blue-800 flex items-center justify-center text-white font-light text-lg shadow-lg">
                PG
              </div>
              <div>
                <h1 className="text-xl font-light tracking-wide text-slate-800 uppercase">Ottawa Design Atelier</h1>
                <p className="text-xs text-sky-400 font-light tracking-widest uppercase">Master Collection</p>
              </div>
            </a>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="/" className="text-slate-800 hover:text-sky-400 px-3 py-2 text-sm font-light tracking-wide uppercase transition-all">
                Home
              </a>
              <a href="/products" className="text-slate-800 hover:text-sky-400 px-3 py-2 text-sm font-light tracking-wide uppercase transition-all">
                Collection
              </a>
              <a href="/about" className="text-slate-800 hover:text-sky-400 px-3 py-2 text-sm font-light tracking-wide uppercase transition-all">
                Atelier
              </a>
              <a href="/services" className="text-slate-800 hover:text-sky-400 px-3 py-2 text-sm font-light tracking-wide uppercase transition-all">
                Services
              </a>
              <a href="/contact" className="text-slate-800 hover:text-sky-400 px-3 py-2 text-sm font-light tracking-wide uppercase transition-all">
                Contact
              </a>

              <div className="flex items-center space-x-4 ml-6">
                <a href="tel:613-729-7400" className="text-sky-400 font-light hover:text-slate-800 tracking-wide">
                  (613) 729-7400
                </a>
                <button
                  onClick={() => setQuoteStep(1)}
                  className="bg-sky-400 text-slate-800 px-6 py-2 font-light tracking-wide uppercase hover:bg-slate-800 hover:text-white transition-all shadow-lg"
                >
                  Consultation
                </button>
              </div>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-800 hover:text-sky-400 p-2"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t py-4 space-y-2 bg-white">
              <a href="/" className="block px-4 py-2 text-slate-800 hover:text-sky-400 font-light tracking-wide uppercase">
                Home
              </a>
              <a href="/products" className="block px-4 py-2 text-slate-800 hover:text-sky-400 font-light tracking-wide uppercase">
                Collection
              </a>
              <a href="/about" className="block px-4 py-2 text-slate-800 hover:text-sky-400 font-light tracking-wide uppercase">
                Atelier
              </a>
              <a href="/services" className="block px-4 py-2 text-slate-800 hover:text-sky-400 font-light tracking-wide uppercase">
                Services
              </a>
              <a href="/contact" className="block px-4 py-2 text-slate-800 hover:text-sky-400 font-light tracking-wide uppercase">
                Contact
              </a>

              <div className="px-4 pt-4 grid grid-cols-2 gap-2">
                <a href="tel:613-729-7400" className="bg-slate-800 text-white py-3 text-center font-light tracking-wide uppercase">
                  Call Now
                </a>
                <button
                  onClick={() => {
                    setQuoteStep(1)
                    setMobileMenuOpen(false)
                  }}
                  className="bg-sky-400 text-slate-800 py-3 font-light tracking-wide uppercase"
                >
                  Consultation
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden gradient-overlay">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-shapes.png')] opacity-10 bg-cover bg-center"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block glass-dark text-white px-8 py-4 text-sm font-bold rounded-2xl animate-float shadow-premium backdrop-blur-md">
              🔥 DECEMBER SPECIAL: $500 OFF Installation • Only 2 Slots Left!
            </span>
          </div>

          <h1 className="text-h1 font-light mb-8 leading-tight animate-slide-up-fade tracking-wide uppercase">
            Artisan Closet Doors for <span className="gradient-text-primary bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Ottawa Homes</span>
          </h1>
          <p className="text-body-l mb-10 max-w-3xl mx-auto text-gray-100 animate-slide-up-fade font-light tracking-wide" style={{ animationDelay: '200ms' }}>
            Official Renin Dealer • 500+ Installations • Complimentary Consultation
          </p>

          <div className="flex justify-center space-x-8 mb-8 text-[#9BC4E2]">
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm">Ottawa Homes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">5.0★</div>
              <div className="text-sm">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">15+</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up-fade" style={{ animationDelay: '400ms' }}>
            <button
              onClick={() => setQuoteStep(1)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-12 py-6 shadow-premium hover:shadow-amber-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 active:scale-[1.02] active:translate-y-0 text-lg rounded-2xl touch-target glass-dark backdrop-blur-md border border-amber-400/20 group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200 inline-block mr-2">🔥</span>
              Get My $500 Bonus Quote →
            </button>
            <a
              href="tel:613-729-7400"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-[var(--pg-navy)] font-bold px-12 py-6 transition-all duration-300 text-center text-lg rounded-2xl shadow-premium backdrop-blur-md glass-dark hover:scale-105 hover:-translate-y-2 active:scale-[1.02] active:translate-y-0 touch-target group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200 inline-block mr-2">📞</span>
              Call (613) 729-7400
            </a>
          </div>
          
          {/* Trust Signals */}
          <div className="mt-8 text-center">
            <div className="text-amber-200 text-sm font-medium mb-2">
              🏆 Why 500+ Ottawa families chose PG Closets:
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-amber-100">
              <div>✓ Licensed & Insured</div>
              <div>✓ 5.0★ Google Rating</div>
              <div>✓ Lifetime Warranty</div>
              <div>✓ Same-Day Quotes</div>
              <div>✓ Free Installation</div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4 text-slate-800 tracking-wide uppercase">Signature Door Collection</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Curated selection of artisan-crafted closet doors with refined pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all border border-slate-200 hover:border-sky-400"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={65}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkaGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknysbliyjqTzSlT54b6bk+h0R//Z"
                  />
                  <div className="absolute top-2 left-2 bg-slate-800 text-white px-3 py-1 text-xs font-light tracking-widest uppercase">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-light text-slate-800 mb-2 tracking-wide uppercase">{product.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 font-light">{product.specs}</p>
                  <div className="text-3xl font-light text-slate-800 mb-6">${product.price}.00</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product.name)
                        setQuotePrice(product.price)
                        setQuoteStep(2)
                      }}
                      className="flex-1 bg-slate-800 text-white py-3 font-light hover:bg-sky-400 hover:text-slate-800 transition-all text-sm uppercase tracking-widest"
                    >
                      Select
                    </button>
                    <a
                      href="/products"
                      className="px-4 py-3 border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white transition-all text-sm uppercase tracking-widest text-center"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4 text-slate-800 tracking-wide uppercase">Client Testimonials</h2>
            <p className="text-lg text-slate-600 font-light">500+ satisfied Ottawa homeowners trust our atelier</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 border-l-4 border-sky-400">
              <div className="flex items-center mb-4">
                <div className="text-[#FFD700] text-lg">★★★★★</div>
                <div className="ml-2 text-sm text-gray-600">5.0 Google Review</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Exceptional quality and service. The Continental doors transformed our master bedroom closet
                completely. Professional installation and great communication throughout."
              </p>
              <div className="font-light text-slate-800 tracking-wide">- Sarah M., Kanata</div>
            </div>

            <div className="bg-slate-50 p-6 border-l-4 border-sky-400">
              <div className="flex items-center mb-4">
                <div className="text-[#FFD700] text-lg">★★★★★</div>
                <div className="ml-2 text-sm text-gray-600">5.0 Google Review</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Best investment we made in our home renovation. The Gatsby barn doors are stunning and the installation
                was flawless. Highly recommend PG Closets!"
              </p>
              <div className="font-light text-slate-800 tracking-wide">- Michael R., Orleans</div>
            </div>

            <div className="bg-slate-50 p-6 border-l-4 border-sky-400">
              <div className="flex items-center mb-4">
                <div className="text-[#FFD700] text-lg">★★★★★</div>
                <div className="ml-2 text-sm text-gray-600">5.0 Google Review</div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                "From quote to installation, everything was perfect. The Euro doors with soft-close are exactly what we
                wanted. Professional team, fair pricing."
              </p>
              <div className="font-light text-slate-800 tracking-wide">- Jennifer L., Nepean</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.google.com/search?q=PG+Closets+Ottawa+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-slate-800 hover:text-sky-400 font-light tracking-wide"
            >
              Read All 127 Google Reviews →
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light mb-4 text-slate-800 tracking-wide uppercase">Recent Atelier Projects</h2>
            <p className="text-lg text-slate-600 font-light">Discover how we transform Ottawa homes with artisan craftsmanship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_176732_hd.jpg"
                  alt="Continental doors in master bedroom closet"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#1B4A9C] text-white px-3 py-1 text-xs font-semibold">
                  BEFORE/AFTER
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1B4A9C] mb-2">Master Bedroom Makeover</h3>
                <p className="text-gray-600 text-sm mb-3">Continental doors • Kanata • 2024</p>
                <p className="text-gray-700 text-sm">
                  Complete closet transformation with premium Continental doors and professional installation.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_205729_hd.jpg"
                  alt="Gatsby barn doors in modern home"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#1B4A9C] text-white px-3 py-1 text-xs font-semibold">
                  BEFORE/AFTER
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1B4A9C] mb-2">Modern Barn Door Install</h3>
                <p className="text-gray-600 text-sm mb-3">Gatsby doors • Orleans • 2024</p>
                <p className="text-gray-700 text-sm">
                  Stunning barn door installation with premium hardware and flawless finish work.
                </p>
              </div>
            </div>

            <div className="bg-white shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_199063_hd.jpg"
                  alt="Euro doors with soft-close mechanism"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-[#1B4A9C] text-white px-3 py-1 text-xs font-semibold">
                  BEFORE/AFTER
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#1B4A9C] mb-2">Contemporary Upgrade</h3>
                <p className="text-gray-600 text-sm mb-3">Euro doors • Nepean • 2024</p>
                <p className="text-gray-700 text-sm">
                  European-style doors with soft-close technology for a luxury feel.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/gallery"
              className="bg-slate-800 text-white px-8 py-3 font-light hover:bg-sky-400 hover:text-slate-800 transition-all uppercase tracking-widest inline-block shadow-lg"
            >
              View Full Gallery
            </a>
          </div>
        </div>
      </section>

      {quoteStep > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light mb-4 text-slate-800 tracking-wide uppercase">Request Consultation</h2>
              <p className="text-lg text-slate-600 font-light">Expert installation included</p>
            </div>

            <div className="bg-[#F5F5F5] p-8 border-2 border-[#E0E0E0]">
              {quoteStep === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-light mb-8 text-slate-800 tracking-wide uppercase">Select From Collection</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <button
                        key={product.name}
                        onClick={() => {
                          setSelectedProduct(product.name)
                          setQuotePrice(product.price)
                          setQuoteStep(2)
                        }}
                        className="p-4 bg-white border-2 border-slate-200 hover:border-sky-400 transition-all shadow-lg hover:shadow-xl"
                      >
                        <div className="aspect-square relative mb-3 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-light text-slate-800 mb-1 text-sm tracking-wide uppercase">{product.name}</div>
                        <div className="text-slate-800 font-light text-lg">${product.price}.00</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quoteStep === 2 && (
                <div className="text-center">
                  <h3 className="text-2xl font-light mb-8 text-slate-800 tracking-wide uppercase">Your Selection: {selectedProduct}</h3>
                  <div className="bg-white p-8 border-2 border-slate-200 mb-6 shadow-lg">
                    <div className="text-4xl font-light text-slate-800 mb-6">${quotePrice}.00</div>
                    <div className="text-sm text-gray-600 mb-6">
                      ✓ Professional installation included
                      <br />✓ Lifetime warranty
                      <br />✓ 2-week delivery guarantee
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="bg-slate-800 text-white px-8 py-3 font-light hover:bg-sky-400 hover:text-slate-800 transition-all uppercase tracking-widest inline-block shadow-lg"
                  >
                    Book Consultation
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-slate-800 text-white py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "PG Closets",
              description:
                "Premium closet door specialists serving Ottawa and surrounding areas. Official Renin dealer with 15+ years experience and 500+ installations.",
              url: "https://www.pgclosets.com",
              telephone: "(613) 729-7400",
              email: "info@pgclosets.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Ottawa",
                addressRegion: "ON",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "45.4215",
                longitude: "-75.6972",
              },
              openingHours: ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00", "Su by appointment"],
              priceRange: "$459-$899",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "127",
                bestRating: "5",
                worstRating: "1",
              },
              areaServed: ["Ottawa", "Kanata", "Orleans", "Nepean", "Barrhaven", "Gloucester"],
              serviceType: [
                "Closet Door Installation",
                "Barn Door Installation",
                "Bifold Door Installation",
                "Bypass Door Installation",
              ],
            }),
          }}
        />

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <a href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-sky-400 flex items-center justify-center text-slate-800 font-light text-lg">
                  PG
                </div>
                <div>
                  <h3 className="text-2xl font-light tracking-wide uppercase">Ottawa Design Atelier</h3>
                  <p className="text-sky-400 font-light tracking-widest uppercase">Master Collection</p>
                </div>
              </a>
              <p className="text-gray-300 mb-6">
                Ottawa's premier closet door specialists, transforming homes with premium solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-light mb-4 text-sky-400 tracking-wide uppercase">Navigation</h4>
              <div className="space-y-2">
                <a href="/" className="block text-gray-300 hover:text-white">
                  Home
                </a>
                <a href="/products" className="block text-gray-300 hover:text-white">
                  Products
                </a>
                <a href="/about" className="block text-gray-300 hover:text-white">
                  About
                </a>
                <a href="/services" className="block text-gray-300 hover:text-white">
                  Services
                </a>
                <a href="/contact" className="block text-gray-300 hover:text-white">
                  Contact
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-light mb-4 text-sky-400 tracking-wide uppercase">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div>(613) 729-7400</div>
                <div>info@pgclosets.com</div>
                <div>Ottawa & Surrounding Areas</div>
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-sm">
                    <div className="font-light text-sky-400 mb-2 tracking-wide uppercase">Business Hours:</div>
                    <div>Mon-Fri: 8:00 AM - 6:00 PM</div>
                    <div>Sat: 9:00 AM - 4:00 PM</div>
                    <div>Sun: By Appointment</div>
                  </div>
                </div>
                <div className="mt-2">Licensed & Insured</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ottawa Design Atelier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
