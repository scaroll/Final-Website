"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const heroSlides = [
    {
      title: "Ottawa's Premier Closet Door Experts",
      subtitle: "Official Renin Dealer • Professional Installation",
      image: "/images/arcat/renin_205739_Bypass_Closet_Doors_Euro_3_Lite.jpg",
      cta: "Transform Your Space",
    },
    {
      title: "Premium Barn Door Collections",
      subtitle: "25+ Styles • Custom Hardware • Expert Installation",
      image: "/images/arcat/renin_205731_Mix_Match_Hardware_Driftwood_K_Design.jpg",
      cta: "Explore Barn Doors",
    },
    {
      title: "Modern Bifold Solutions",
      subtitle: "Space-Saving Design • Contemporary Styles",
      image: "/images/arcat/renin_205746_Bifold_Closet_Door_Euro_1_Lite.jpg",
      cta: "View Bifold Doors",
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/95 border-b-4 border-[#1e3a8a] shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative w-16 h-16 overflow-hidden shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#1e3a8a]">PG Closets</h1>
                  <p className="text-xs text-[#87ceeb] font-medium">Official Renin Dealer</p>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              {["Home", "Products", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="relative text-gray-900 hover:text-[#1e3a8a] px-3 py-2 text-sm font-semibold transition-all duration-300 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#87ceeb] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button className="bg-[#1e3a8a] text-[#87ceeb] px-8 py-3 font-bold hover:bg-[#87ceeb] hover:text-[#1e3a8a] hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-[#1e3a8a]">
                Get Free Quote
              </button>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-900 hover:text-[#1e3a8a] p-2 hover:bg-blue-50 transition-all duration-300"
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
            <div className="md:hidden border-t-4 border-[#87ceeb] py-4 space-y-2 bg-white/98 backdrop-blur-sm">
              {["Home", "Products", "Gallery", "Contact"].map((item) => (
                <a
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="block px-4 py-3 text-gray-900 hover:text-[#1e3a8a] hover:bg-[#87ceeb]/10 font-semibold transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                className="mx-4 w-full bg-[#1e3a8a] text-[#87ceeb] py-3 font-bold hover:bg-[#87ceeb] hover:text-[#1e3a8a] transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Free Quote
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/90 to-[#1e3a8a]/80 z-10"></div>
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Hero content */}
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          <div
            className="transform transition-all duration-1000"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom duration-1000">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
              <button className="bg-[#87ceeb] text-[#1e3a8a] hover:bg-white font-bold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                {heroSlides[currentSlide].cta}
              </button>
              <button className="border-2 border-[#87ceeb] text-[#87ceeb] hover:bg-[#87ceeb] hover:text-[#1e3a8a] font-bold px-10 py-4 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
                View Gallery
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-8 right-8 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1e3a8a] to-[#87ceeb] bg-clip-text text-transparent">
              Premium Door Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our curated selection of premium closet doors, each crafted with precision and designed to
              transform your space
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Sliding Doors",
                subtitle: "12+ Premium Styles",
                description: "Space-saving bypass doors with contemporary elegance",
                image: "/images/arcat/renin_205739_Bypass_Closet_Doors_Euro_3_Lite.jpg",
                features: ["Space Efficient", "Modern Design", "Easy Installation"],
                color: "from-[#1e3a8a] to-[#87ceeb]",
                specs: {
                  material: "Premium MDF with laminate finish",
                  sizes: '24", 30", 36", 48", 60", 72", 80", 96" widths',
                  hardware: "Soft-close bypass track system included",
                  warranty: "5-year manufacturer warranty",
                  installation: "Professional installation available",
                },
              },
              {
                title: "Bifold Doors",
                subtitle: "8+ Classic Designs",
                description: "Traditional folding design meets modern functionality",
                image: "/images/arcat/renin_205746_Bifold_Closet_Door_Euro_1_Lite.jpg",
                features: ["Classic Style", "Versatile", "Durable"],
                color: "from-[#87ceeb] to-[#1e3a8a]",
                specs: {
                  material: "Solid wood core with veneer finish",
                  sizes: '24", 30", 32", 36" widths (pairs available)',
                  hardware: "Heavy-duty pivot hinges and track",
                  warranty: "10-year structural warranty",
                  installation: "DIY-friendly with pro installation option",
                },
              },
              {
                title: "Barn Doors",
                subtitle: "25+ Trending Styles",
                description: "Statement-making sliding barn door systems",
                image: "/images/arcat/renin_205731_Mix_Match_Hardware_Driftwood_K_Design.jpg",
                features: ["Trendy Design", "Custom Hardware", "Statement Piece"],
                color: "from-[#1e3a8a] to-[#87ceeb]",
                specs: {
                  material: "Reclaimed wood look with engineered core",
                  sizes: '30", 32", 36", 42" widths, custom heights',
                  hardware: "Premium steel track with multiple finishes",
                  warranty: "Lifetime hardware warranty",
                  installation: "Professional installation recommended",
                },
              },
              {
                title: "Hardware & Accessories",
                subtitle: "15+ Premium Options",
                description: "Professional-grade hardware and finishing touches",
                image: "/images/arcat/renin_205752_Barn_Door_Hardware_Kits_Cadium_Bent_Strap.jpg",
                features: ["Premium Quality", "Multiple Finishes", "Professional Grade"],
                color: "from-[#87ceeb] to-[#1e3a8a]",
                specs: {
                  material: "Stainless steel and powder-coated finishes",
                  finishes: "Black, Bronze, Stainless, Brushed Nickel",
                  capacity: "Supports doors up to 200 lbs",
                  warranty: "Lifetime mechanical warranty",
                  installation: "Complete installation kit included",
                },
              },
            ].map((product, index) => (
              <div
                key={index}
                className="group relative bg-white shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-[#87ceeb]"
              >
                <div className="aspect-video overflow-hidden relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1e3a8a] transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-[#87ceeb] font-semibold mb-3">{product.subtitle}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

                  <div className="mb-6 p-4 bg-gray-50 border-l-4 border-[#87ceeb]">
                    <h4 className="font-semibold text-[#1e3a8a] mb-3">Specifications:</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Material:</span> {product.specs.material}
                      </div>
                      <div>
                        <span className="font-medium">Sizes:</span> {product.specs.sizes}
                      </div>
                      <div>
                        <span className="font-medium">Hardware:</span> {product.specs.hardware}
                      </div>
                      <div>
                        <span className="font-medium">Warranty:</span> {product.specs.warranty}
                      </div>
                      <div>
                        <span className="font-medium">Installation:</span> {product.specs.installation}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#87ceeb]/20 text-[#1e3a8a] text-sm font-medium border border-[#87ceeb]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#87ceeb] text-white py-3 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Explore Collection
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1e3a8a] to-[#87ceeb]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#87ceeb] mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[#87ceeb] mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
            Join thousands of satisfied customers who have transformed their spaces with our premium closet door
            solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <button className="bg-[#87ceeb] text-[#1e3a8a] hover:bg-white font-bold px-12 py-4 text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
              Get Your Free Quote
            </button>
            <button className="border-2 border-[#87ceeb] text-[#87ceeb] hover:bg-[#87ceeb] hover:text-[#1e3a8a] font-bold px-12 py-4 text-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
              📱 Call (613) 555-0123
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-14 h-14 overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">PG Closets</h3>
                  <p className="text-[#87ceeb]">Official Renin Dealer</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Ottawa's premier closet door specialists, transforming homes with premium Renin solutions and
                professional installation services.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-12 h-12 bg-gray-800 flex items-center justify-center hover:bg-[#1e3a8a] transition-colors duration-300 border border-[#87ceeb]"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-[#87ceeb]">Quick Links</h4>
              <div className="space-y-3">
                {["Products", "Gallery", "Installation", "Contact"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6 text-[#87ceeb]">Contact Info</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <span className="text-[#87ceeb]">📧</span>
                  <span>spencer@peoplesgrp.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#87ceeb]">📱</span>
                  <span>(613) 555-0123</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[#87ceeb]">📍</span>
                  <span>Ottawa, Ontario</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#87ceeb]/30 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PG Closets. All rights reserved. | Official Renin Dealer</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
