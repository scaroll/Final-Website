"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  const [selectedProduct, setSelectedProduct] = useState("")
  const [quotePrice, setQuotePrice] = useState(459)

  const products = [
    {
      name: "Continental",
      type: "bypass",
      price: 459,
      image: "/images/arcat/renin_176732_hd.jpg",
      category: "Bypass",
      specs: "Premium engineered wood core, durable laminate surface",
    },
    {
      name: "Provincial",
      type: "bifold",
      price: 549,
      image: "/images/arcat/renin_205750_hd.jpg",
      category: "Bifold",
      specs: "Traditional styling, heavy-duty pivot hinges",
    },
    {
      name: "Gatsby",
      type: "barn",
      price: 799,
      image: "/images/arcat/renin_205729_hd.jpg",
      category: "Barn",
      specs: "Modern barn door design, premium hardware included",
    },
    {
      name: "Euro",
      type: "pivot",
      price: 899,
      image: "/images/arcat/renin_199063_hd.jpg",
      category: "Pivot",
      specs: "Contemporary European styling, soft-close mechanism",
    },
  ]

  const siteStats = {
    installations: "500+",
    rating: "5.0",
    experience: "15+",
    satisfaction: "98%",
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectCount((prev) => (prev < 500 ? prev + 10 : 500))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const video = document.querySelector("video")
    if (video) {
      video.addEventListener("error", () => {
        console.warn("Video failed to load, using gradient background fallback")
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1B4A9C] to-[#4A5F8A] text-white text-center py-2 text-sm font-semibold">
            ⭐ {siteStats.rating} • 🏠 {siteStats.installations} Installations • ⏰ {siteStats.experience} Years •{" "}
            {siteStats.satisfaction} Satisfaction
          </div>

          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                  alt="PG Closets Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1B4A9C]">PG CLOSETS</h1>
                <p className="text-xs text-[#9BC4E2] font-medium">Premium Solutions</p>
              </div>
            </a>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="/" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Home
              </a>
              <a href="/products" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Products
              </a>
              <a href="/about" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="/services" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Services
              </a>
              <a href="/contact" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Contact
              </a>

              <div className="flex items-center space-x-4 ml-6">
                <a href="tel:6135550123" className="text-[#9BC4E2] font-semibold hover:text-[#1B4A9C]">
                  (613) 555-0123
                </a>
                <button
                  onClick={() => setQuoteStep(1)}
                  className="bg-[#9BC4E2] text-[#1B4A9C] px-6 py-2 font-semibold hover:bg-[#1B4A9C] hover:text-white transition-all"
                >
                  Get Quote
                </button>
              </div>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#1B4A9C] hover:text-[#9BC4E2] p-2"
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
              <a href="/" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Home
              </a>
              <a href="/products" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Products
              </a>
              <a href="/about" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                About
              </a>
              <a href="/services" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Services
              </a>
              <a href="/contact" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Contact
              </a>

              <div className="px-4 pt-4 grid grid-cols-2 gap-2">
                <a href="tel:6135550123" className="bg-[#1B4A9C] text-white py-3 text-center font-semibold">
                  Call Now
                </a>
                <button
                  onClick={() => {
                    setQuoteStep(1)
                    setMobileMenuOpen(false)
                  }}
                  className="bg-[#9BC4E2] text-[#1B4A9C] py-3 font-semibold"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #1B4A9C, #4A5F8A)",
        }}
      >
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-10">
          <source src="/hero-video.mp4" type="video/mp4" />
          <source src="/hero-video.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-40 z-15"></div>

        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-[#9BC4E2] text-[#1B4A9C] px-4 py-2 text-sm font-semibold">
              ⚡ December: 3 Slots Left
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">Premium Closet Doors for Ottawa Homes</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
            Official Renin Dealer • {siteStats.installations} Installations • Free Measurement
          </p>

          <div className="flex justify-center space-x-8 mb-8 text-[#9BC4E2]">
            <div className="text-center">
              <div className="text-2xl font-bold">{projectCount}+</div>
              <div className="text-sm">Ottawa Homes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{siteStats.rating}★</div>
              <div className="text-sm">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{siteStats.experience}</div>
              <div className="text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{siteStats.satisfaction}</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setQuoteStep(1)}
              className="bg-[#9BC4E2] text-[#1B4A9C] hover:bg-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Quote →
            </button>
            <a
              href="/products"
              className="border-2 border-[#9BC4E2] text-[#9BC4E2] hover:bg-[#9BC4E2] hover:text-[#1B4A9C] font-semibold px-8 py-4 transition-all text-center"
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1B4A9C]">Premium Door Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete selection of premium closet doors with instant pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all border border-[#E0E0E0]"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-[#1B4A9C] text-white px-3 py-1 text-xs font-semibold">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">{product.name}</h3>
                  <p className="text-[#6B7280] text-sm mb-4">{product.specs}</p>
                  <div className="text-3xl font-bold text-[#1B4A9C] mb-6">${product.price}.00</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product.name)
                        setQuotePrice(product.price)
                        setQuoteStep(2)
                      }}
                      className="flex-1 bg-[#1B4A9C] text-white py-3 font-semibold hover:bg-[#153A7E] transition-all text-sm uppercase tracking-wide"
                    >
                      Get Quote
                    </button>
                    <a
                      href="/products"
                      className="px-4 py-3 border-2 border-[#1B4A9C] text-[#1B4A9C] hover:bg-[#1B4A9C] hover:text-white transition-all text-sm uppercase tracking-wide text-center"
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

      {quoteStep > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1B4A9C]">Get Your Quote</h2>
              <p className="text-lg text-gray-600">Professional installation included</p>
            </div>

            <div className="bg-[#F5F5F5] p-8 border-2 border-[#E0E0E0]">
              {quoteStep === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Choose Your Door Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <button
                        key={product.name}
                        onClick={() => {
                          setSelectedProduct(product.name)
                          setQuotePrice(product.price)
                          setQuoteStep(2)
                        }}
                        className="p-4 bg-white border-2 border-[#E0E0E0] hover:border-[#1B4A9C] transition-all"
                      >
                        <div className="aspect-square relative mb-3 overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-semibold text-[#1B4A9C] mb-1 text-sm">{product.name}</div>
                        <div className="text-[#1B4A9C] font-bold text-lg">${product.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {quoteStep === 2 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Your Quote: {selectedProduct}</h3>
                  <div className="bg-white p-8 border-2 border-[#E0E0E0] mb-6">
                    <div className="text-4xl font-bold text-[#1B4A9C] mb-6">${quotePrice}</div>
                    <div className="text-sm text-gray-600 mb-6">
                      ✓ Professional installation included
                      <br />✓ Lifetime warranty
                      <br />✓ 2-week delivery guarantee
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="bg-[#1B4A9C] text-white px-8 py-3 font-semibold hover:bg-[#153A7E] transition-all uppercase tracking-wide inline-block"
                  >
                    Book Consultation
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#1B4A9C] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <a href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PG CLOSETS</h3>
                  <p className="text-[#9BC4E2]">Premium Solutions</p>
                </div>
              </a>
              <p className="text-gray-300 mb-6">
                Ottawa's premier closet door specialists, transforming homes with premium solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Sitemap</h4>
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
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div>(613) 555-0123</div>
                <div>info@pgclosets.com</div>
                <div>Ottawa & Surrounding Areas</div>
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-sm">
                    <div className="font-semibold text-[#9BC4E2] mb-2">Business Hours:</div>
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
            <p>&copy; 2025 PG Closets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
