"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [configuratorStep, setConfiguratorStep] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState("")
  const [selectedDoor, setSelectedDoor] = useState("")
  const [selectedFinish, setSelectedFinish] = useState("")
  const [dimensions, setDimensions] = useState({ width: 72, height: 80 })
  const [quotePrice, setQuotePrice] = useState(0)
  const [projectCount, setProjectCount] = useState(0)
  const [showBooking, setShowBooking] = useState(false)
  const [showExitPopup, setShowExitPopup] = useState(false)

  const heroSlides = [
    {
      title: "Ottawa's Premier Custom Closet Systems",
      subtitle: "From Design to Install in 14 Days",
      image: "/images/arcat/renin_199065_hd.jpg",
      trustBadge: "500+ Homes Transformed",
    },
    {
      title: "Award-Winning Design Excellence",
      subtitle: "15+ Years of Premium Craftsmanship",
      image: "/images/arcat/renin_199063_hd.jpg",
      trustBadge: "5-Star Google Rating",
    },
    {
      title: "Custom Solutions for Every Space",
      subtitle: "Professional Installation Guaranteed",
      image: "/images/arcat/renin_199064_hd.jpg",
      trustBadge: "A+ BBB Rating",
    },
  ]

  const doorStyles = [
    { name: "Ashbury 2 Panel Bifold", image: "/images/arcat/renin_199065_hd.jpg", basePrice: 419 },
    { name: "Georgian 6 Panel Bifold", image: "/images/arcat/renin_199063_hd.jpg", basePrice: 485 },
    { name: "Parsons Flush Panel", image: "/images/arcat/renin_199064_hd.jpg", basePrice: 365 },
    {
      name: "Euro 1-Lite Bifold",
      image: "/images/arcat/renin_155701_Bifold_Closet_Door_Euro_1_Lite_v2.jpg",
      basePrice: 445,
    },
  ]

  const finishes = [
    { name: "White", color: "#FFFFFF", price: 0 },
    { name: "Driftwood", color: "#8B7355", price: 50 },
    { name: "Espresso", color: "#3C2415", price: 75 },
    { name: "Natural Oak", color: "#DEB887", price: 100 },
  ]

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(slideTimer)
  }, [heroSlides.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectCount((prev) => (prev < 500 ? prev + 5 : 500))
    }, 50)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (selectedDoor && selectedFinish) {
      const doorPrice = doorStyles.find((d) => d.name === selectedDoor)?.basePrice || 0
      const finishPrice = finishes.find((f) => f.name === selectedFinish)?.price || 0
      const sizeMultiplier = (dimensions.width * dimensions.height) / 5760 // Base size 72x80
      setQuotePrice(Math.round((doorPrice + finishPrice) * sizeMultiplier))
    }
  }, [selectedDoor, selectedFinish, dimensions])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true)
      }
    }
    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/98 backdrop-blur-md border-b-2 border-[#1e3a8a] shadow-xl">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1e3a8a] to-[#87ceeb] text-white text-center py-3 text-sm font-bold tracking-wide">
            🏆 AWARD WINNING: Ottawa's #1 Rated Closet Specialists - Book Free Consultation Today!
          </div>

          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 overflow-hidden border-2 border-[#87ceeb] shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-[#1e3a8a] tracking-tight">PG CLOSETS</h1>
                  <p className="text-xs text-[#87ceeb] font-bold tracking-wider">PREMIUM SOLUTIONS</p>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { name: "Products", href: "/products" },
                { name: "Gallery", href: "/gallery" },
                { name: "Process", href: "/process" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-gray-800 hover:text-[#1e3a8a] px-4 py-2 text-sm font-bold uppercase tracking-wide transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#87ceeb] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <div className="flex items-center space-x-4">
                <a href="tel:6135550123" className="text-[#1e3a8a] font-bold hover:text-[#87ceeb] transition-colors">
                  📞 (613) 555-0123
                </a>
                <button className="bg-[#87ceeb] text-white px-8 py-3 font-black uppercase tracking-wide hover:bg-[#1e3a8a] hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#87ceeb] hover:border-[#1e3a8a]">
                  FREE QUOTE
                </button>
              </div>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#1e3a8a] hover:text-[#87ceeb] p-3 hover:bg-blue-50 transition-all duration-300 border border-[#1e3a8a] hover:border-[#87ceeb]"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden border-t-2 border-[#87ceeb] py-6 space-y-4 bg-white/98 backdrop-blur-sm">
              {[
                { name: "Products", href: "/products" },
                { name: "Gallery", href: "/gallery" },
                { name: "Process", href: "/process" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-4 text-gray-800 hover:text-[#1e3a8a] hover:bg-[#87ceeb]/10 font-bold uppercase tracking-wide transition-all duration-300 border-l-4 border-transparent hover:border-[#87ceeb]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-6 space-y-3">
                <a href="tel:6135550123" className="block text-[#1e3a8a] font-bold text-lg">
                  📞 (613) 555-0123
                </a>
                <button
                  className="w-full bg-[#87ceeb] text-white py-4 font-black uppercase tracking-wide hover:bg-[#1e3a8a] transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  GET FREE QUOTE
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/95 via-[#1e3a8a]/85 to-[#87ceeb]/75 z-10"></div>
            <Image
              src={slide.image || "/placeholder.svg?height=1080&width=1920&query=premium closet doors"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="relative z-20 text-center text-white px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="inline-block bg-[#87ceeb] text-white px-6 py-2 text-sm font-black uppercase tracking-wider mb-6">
              {heroSlides[currentSlide].trustBadge}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl lg:text-2xl mb-12 font-medium max-w-4xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].subtitle}
          </p>

          <div className="flex justify-center space-x-12 mb-16 text-[#87ceeb]">
            <div className="text-center">
              <div className="text-4xl font-black mb-2">{projectCount}+</div>
              <div className="text-sm font-bold uppercase tracking-wide">HOMES</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">15+</div>
              <div className="text-sm font-bold uppercase tracking-wide">YEARS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">5⭐</div>
              <div className="text-sm font-bold uppercase tracking-wide">GOOGLE</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black mb-2">A+</div>
              <div className="text-sm font-bold uppercase tracking-wide">BBB</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => setShowBooking(true)}
              className="bg-[#87ceeb] text-white hover:bg-white hover:text-[#87ceeb] font-black px-16 py-5 text-xl uppercase tracking-wide shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border-4 border-[#87ceeb] hover:border-white"
            >
              GET INSTANT QUOTE
            </button>
            <button className="border-4 border-[#87ceeb] text-[#87ceeb] hover:bg-[#87ceeb] hover:text-white font-black px-16 py-5 text-xl uppercase tracking-wide backdrop-blur-sm hover:scale-105 transition-all duration-300">
              BOOK CONSULTATION
            </button>
          </div>

          <div className="mt-8 text-lg font-bold">💳 0% FINANCING AVAILABLE • 📞 CALL NOW: (613) 555-0123</div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 transition-all duration-300 ${
                index === currentSlide ? "bg-[#87ceeb] scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 text-[#1e3a8a] font-dm-sans">Design Your Perfect Closet</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use our interactive configurator to visualize your custom closet and get instant pricing
            </p>
          </div>

          <div className="bg-white rounded-none shadow-2xl p-8">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      configuratorStep >= step ? "bg-[#87ceeb] text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {configuratorStep === 1 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Choose Room Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Bedroom", "Hall", "Pantry"].map((room) => (
                    <button
                      key={room}
                      onClick={() => {
                        setSelectedRoom(room)
                        setConfiguratorStep(2)
                      }}
                      className={`p-8 border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedRoom === room ? "border-[#87ceeb] bg-[#87ceeb]/10" : "border-gray-200"
                      }`}
                    >
                      <div className="text-6xl mb-4">{room === "Bedroom" ? "🛏️" : room === "Hall" ? "🚪" : "🥫"}</div>
                      <div className="text-xl font-semibold text-[#1e3a8a]">{room}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 2 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Select Door Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {doorStyles.map((door) => (
                    <button
                      key={door.name}
                      onClick={() => {
                        setSelectedDoor(door.name)
                        setConfiguratorStep(3)
                      }}
                      className={`border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedDoor === door.name ? "border-[#87ceeb]" : "border-gray-200"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <Image src={door.image || "/placeholder.svg"} alt={door.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#1e3a8a]">{door.name}</div>
                        <div className="text-[#87ceeb]">From ${door.basePrice}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 3 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Pick Finish</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {finishes.map((finish) => (
                    <button
                      key={finish.name}
                      onClick={() => {
                        setSelectedFinish(finish.name)
                        setConfiguratorStep(4)
                      }}
                      className={`p-6 border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedFinish === finish.name ? "border-[#87ceeb]" : "border-gray-200"
                      }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 border" style={{ backgroundColor: finish.color }}></div>
                      <div className="font-semibold text-[#1e3a8a]">{finish.name}</div>
                      <div className="text-[#87ceeb]">+${finish.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 4 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Enter Dimensions</h3>
                <div className="max-w-md mx-auto space-y-6">
                  <div>
                    <label className="block text-left font-semibold mb-2">Width (inches)</label>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-[#87ceeb] font-bold">{dimensions.width}"</div>
                  </div>
                  <div>
                    <label className="block text-left font-semibold mb-2">Height (inches)</label>
                    <input
                      type="range"
                      min="60"
                      max="96"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-[#87ceeb] font-bold">{dimensions.height}"</div>
                  </div>

                  {quotePrice > 0 && (
                    <div className="bg-[#87ceeb] text-white p-8 mt-8">
                      <div className="text-3xl font-bold mb-2">${quotePrice}</div>
                      <div className="text-lg">Estimated Price</div>
                      <div className="text-sm mt-2">*Professional installation included</div>
                      <button className="bg-white text-[#87ceeb] px-8 py-3 font-bold mt-4 hover:bg-gray-100 transition-all duration-300">
                        Book Measurement
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <span className="inline-block bg-[#1e3a8a] text-white px-6 py-2 text-sm font-black uppercase tracking-wider mb-6">
              INTERACTIVE DESIGN TOOL
            </span>
            <h2 className="text-6xl font-black mb-8 text-[#1e3a8a] tracking-tight">Design Your Perfect Closet</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Use our advanced configurator to visualize your custom closet system and get instant professional pricing
            </p>
          </div>

          <div className="bg-white shadow-2xl p-12 border-t-8 border-[#87ceeb]">
            <div className="flex justify-center mb-12">
              <div className="flex space-x-6">
                {[
                  { step: 1, label: "Room" },
                  { step: 2, label: "Style" },
                  { step: 3, label: "Finish" },
                  { step: 4, label: "Size" },
                ].map(({ step, label }) => (
                  <div key={step} className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto flex items-center justify-center font-black text-lg border-4 transition-all duration-300 ${
                        configuratorStep >= step
                          ? "bg-[#87ceeb] text-white border-[#87ceeb] scale-110"
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                    >
                      {step}
                    </div>
                    <div
                      className={`mt-2 text-sm font-bold uppercase tracking-wide ${
                        configuratorStep >= step ? "text-[#1e3a8a]" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {configuratorStep === 1 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Choose Room Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Bedroom", "Hall", "Pantry"].map((room) => (
                    <button
                      key={room}
                      onClick={() => {
                        setSelectedRoom(room)
                        setConfiguratorStep(2)
                      }}
                      className={`p-8 border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedRoom === room ? "border-[#87ceeb] bg-[#87ceeb]/10" : "border-gray-200"
                      }`}
                    >
                      <div className="text-6xl mb-4">{room === "Bedroom" ? "🛏️" : room === "Hall" ? "🚪" : "🥫"}</div>
                      <div className="text-xl font-semibold text-[#1e3a8a]">{room}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 2 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Select Door Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {doorStyles.map((door) => (
                    <button
                      key={door.name}
                      onClick={() => {
                        setSelectedDoor(door.name)
                        setConfiguratorStep(3)
                      }}
                      className={`border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedDoor === door.name ? "border-[#87ceeb]" : "border-gray-200"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <Image src={door.image || "/placeholder.svg"} alt={door.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#1e3a8a]">{door.name}</div>
                        <div className="text-[#87ceeb]">From ${door.basePrice}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 3 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Pick Finish</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {finishes.map((finish) => (
                    <button
                      key={finish.name}
                      onClick={() => {
                        setSelectedFinish(finish.name)
                        setConfiguratorStep(4)
                      }}
                      className={`p-6 border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedFinish === finish.name ? "border-[#87ceeb]" : "border-gray-200"
                      }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 border" style={{ backgroundColor: finish.color }}></div>
                      <div className="font-semibold text-[#1e3a8a]">{finish.name}</div>
                      <div className="text-[#87ceeb]">+${finish.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {configuratorStep === 4 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Enter Dimensions</h3>
                <div className="max-w-md mx-auto space-y-6">
                  <div>
                    <label className="block text-left font-semibold mb-2">Width (inches)</label>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-[#87ceeb] font-bold">{dimensions.width}"</div>
                  </div>
                  <div>
                    <label className="block text-left font-semibold mb-2">Height (inches)</label>
                    <input
                      type="range"
                      min="60"
                      max="96"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-[#87ceeb] font-bold">{dimensions.height}"</div>
                  </div>

                  {quotePrice > 0 && (
                    <div className="bg-[#87ceeb] text-white p-8 mt-8">
                      <div className="text-3xl font-bold mb-2">${quotePrice}</div>
                      <div className="text-lg">Estimated Price</div>
                      <div className="text-sm mt-2">*Professional installation included</div>
                      <button className="bg-white text-[#87ceeb] px-8 py-3 font-bold mt-4 hover:bg-gray-100 transition-all duration-300">
                        Book Measurement
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#1e3a8a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#87ceeb] mb-4">{projectCount}+</div>
              <div className="text-xl font-semibold mb-2">Homes Transformed</div>
              <div className="text-gray-300">Across Ottawa & Surrounding Areas</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#87ceeb] mb-4">15+</div>
              <div className="text-xl font-semibold mb-2">Years Experience</div>
              <div className="text-gray-300">Professional Installation Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#87ceeb] mb-4">A+</div>
              <div className="text-xl font-semibold mb-2">BBB Rating</div>
              <div className="text-gray-300">Fully Licensed & Insured</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#87ceeb] to-[#1e3a8a] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-8 font-dm-sans">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-12 leading-relaxed">
            Join 500+ satisfied Ottawa homeowners. Professional design, premium materials, expert installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-[#87ceeb] hover:bg-gray-100 font-bold px-12 py-4 text-xl shadow-2xl hover:scale-105 transition-all duration-300 rounded-none">
              Get Free Quote Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#87ceeb] font-bold px-12 py-4 text-xl hover:scale-105 transition-all duration-300 rounded-none">
              📞 (613) 555-0123
            </button>
          </div>
          <div className="mt-8 text-lg">💳 Financing Available • 0% Interest for 12 Months</div>
        </div>
      </section>

      <footer className="bg-[#1e3a8a] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative w-16 h-16 overflow-hidden border-2 border-[#87ceeb]">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">PG CLOSETS</h3>
                  <p className="text-[#87ceeb] font-bold">PREMIUM SOLUTIONS</p>
                </div>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-lg text-lg">
                Ottawa's premier closet door specialists, transforming homes with premium Renin solutions and
                award-winning professional installation services since 2009.
              </p>
              <div className="flex space-x-4">
                {["Facebook", "Instagram", "LinkedIn", "Google"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-14 h-14 bg-gray-800 flex items-center justify-center hover:bg-[#87ceeb] transition-all duration-300 border-2 border-[#87ceeb] hover:scale-110"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-current"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 text-[#87ceeb] uppercase tracking-wide">Navigation</h4>
              <div className="space-y-4">
                {[
                  { name: "Products", href: "/products" },
                  { name: "Gallery", href: "/gallery" },
                  { name: "Process", href: "/process" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 font-semibold"
                  >
                    → {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black mb-8 text-[#87ceeb] uppercase tracking-wide">Contact</h4>
              <div className="space-y-6 text-gray-300">
                <div className="flex items-center space-x-4">
                  <span className="text-[#87ceeb] text-xl">📧</span>
                  <div>
                    <div className="font-bold text-white">Email</div>
                    <div>spencer@peoplesgrp.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[#87ceeb] text-xl">📱</span>
                  <div>
                    <div className="font-bold text-white">Phone</div>
                    <div>(613) 555-0123</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-[#87ceeb] text-xl">📍</span>
                  <div>
                    <div className="font-bold text-white">Service Area</div>
                    <div>Ottawa & Surrounding Areas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-[#87ceeb]/30 mt-16 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; 2024 PG Closets. All rights reserved. | Licensed & Insured | A+ BBB Rating
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Warranty
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {showExitPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-[#1e3a8a] p-8 max-w-md w-full">
            <button onClick={() => setShowExitPopup(false)} className="float-right text-2xl">
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-[#87ceeb]">Wait! Don't Leave Yet!</h3>
            <p className="mb-6">Get 10% off your custom closet system when you book a free consultation today.</p>
            <button className="w-full bg-[#87ceeb] text-white py-3 font-bold hover:bg-[#1e3a8a] transition-all duration-300">
              Claim 10% Discount
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        <button className="bg-[#87ceeb] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
          💬 Design Help
        </button>
      </div>
    </div>
  )
}
