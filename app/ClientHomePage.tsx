"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [quoteStep, setQuoteStep] = useState(1)
  const [selectedDoorType, setSelectedDoorType] = useState("")
  const [dimensions, setDimensions] = useState({ width: 72, height: 80 })
  const [quantity, setQuantity] = useState(1)
  const [addOns, setAddOns] = useState<string[]>([])
  const [quotePrice, setQuotePrice] = useState(0)
  const [showJobberForm, setShowJobberForm] = useState(false)
  const [projectCount, setProjectCount] = useState(0)

  const doorTypes = [
    { name: "Sliding", price: 459, image: "/images/arcat/renin_199065_hd.jpg" },
    { name: "Bi-Fold", price: 549, image: "/images/arcat/renin_199063_hd.jpg" },
    { name: "Pivot", price: 699, image: "/images/arcat/renin_199064_hd.jpg" },
    { name: "Barn", price: 799, image: "/images/arcat/renin_155701_Bifold_Closet_Door_Euro_1_Lite_v2.jpg" },
  ]

  const premiumAddOns = [
    { name: "Mirror Inserts", price: 150 },
    { name: "Soft-close Mechanism", price: 75 },
    { name: "Premium Handles", price: 50 },
  ]

  const heroSlides = [
    {
      title: "Transform Your Ottawa Home with Premium Closet Doors",
      subtitle: "Official Renin Dealer • Professional Installation • Lifetime Warranty",
      image: "/images/arcat/renin_199065_hd.jpg",
      trustBadge: "500+ Ottawa Homes Transformed",
    },
    {
      title: "Ottawa's Only Official Renin Dealer",
      subtitle: "2-Week Delivery Guarantee • Licensed & Insured",
      image: "/images/arcat/renin_199063_hd.jpg",
      trustBadge: "4.9★ Google Rating",
    },
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
    if (selectedDoorType) {
      const doorPrice = doorTypes.find((d) => d.name === selectedDoorType)?.price || 0
      const addOnPrice = addOns.reduce((total, addOn) => {
        const addon = premiumAddOns.find((a) => a.name === addOn)
        return total + (addon?.price || 0)
      }, 0)

      // Size multipliers from specification
      const sqft = (dimensions.width * dimensions.height) / 144
      let sizeMultiplier = 1
      if (sqft > 40 && sqft <= 60)
        sizeMultiplier = 1.2 // +20%
      else if (sqft > 60) sizeMultiplier = 1.4 // +40%

      // Bulk discount
      const bulkDiscount = quantity >= 3 ? 0.9 : 1 // 10% off for 3+

      const totalPrice = Math.round((doorPrice + addOnPrice) * sizeMultiplier * quantity * bulkDiscount)
      setQuotePrice(totalPrice)
    }
  }, [selectedDoorType, dimensions, quantity, addOns])

  const loadJobberForm = () => {
    setShowJobberForm(true)
    // Load Jobber script dynamically
    const script = document.createElement("script")
    script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
    script.setAttribute("clienthub_id", "83a3d24e-c18d-441c-80d1-d85419ea28ae")
    script.setAttribute(
      "form_url",
      "https://clienthub.getjobber.com/client_hubs/83a3d24e-c18d-441c-80d1-d85419ea28ae/public/work_request/embedded_work_request_form",
    )
    document.head.appendChild(script)
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/98 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#3B4A7C] to-[#4A5F8A] text-white text-center py-2 text-sm font-semibold">
            500+ Ottawa Homes Transformed • 4.9★ Google Rating • Licensed & Insured
          </div>

          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative w-12 h-12 overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#3B4A7C]">PG CLOSETS</h1>
                  <p className="text-xs text-[#9BC4E2] font-medium">Premium Solutions</p>
                </div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              {[
                { name: "Products", href: "/products" },
                { name: "Gallery", href: "/gallery" },
                { name: "Pricing", href: "/pricing" },
                { name: "Reviews", href: "/reviews" },
                { name: "About", href: "/about" },
                { name: "Blog", href: "/blog" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[#3B4A7C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 ml-6">
                <a href="tel:6135550123" className="text-[#9BC4E2] font-semibold hover:text-[#3B4A7C]">
                  (613) 555-0123
                </a>
                <button
                  onClick={loadJobberForm}
                  className="bg-[#9BC4E2] text-[#3B4A7C] px-6 py-2 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                >
                  Book Consultation
                </button>
              </div>
            </nav>

            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#3B4A7C] hover:text-[#9BC4E2] p-2"
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
              {[
                { name: "Products", href: "/products" },
                { name: "Gallery", href: "/gallery" },
                { name: "Pricing", href: "/pricing" },
                { name: "Reviews", href: "/reviews" },
                { name: "About", href: "/about" },
                { name: "Blog", href: "/blog" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 pt-4 space-y-2">
                <a href="tel:6135550123" className="block text-[#9BC4E2] font-semibold">
                  (613) 555-0123
                </a>
                <button
                  onClick={() => {
                    loadJobberForm()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-[#9BC4E2] text-[#3B4A7C] py-3 rounded-lg font-semibold"
                >
                  Book Consultation
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
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B4A7C] to-[#4A5F8A] opacity-90 z-10"></div>
            <Image
              src={slide.image || "/placeholder.svg?height=1080&width=1920&query=premium closet doors"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-[#9BC4E2] text-[#3B4A7C] px-4 py-2 text-sm font-semibold rounded-lg">
              {heroSlides[currentSlide].trustBadge}
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">{heroSlides[currentSlide].title}</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto">{heroSlides[currentSlide].subtitle}</p>

          <div className="flex justify-center space-x-8 mb-8 text-[#9BC4E2]">
            <div className="text-center">
              <div className="text-2xl font-bold">Lifetime</div>
              <div className="text-sm">Warranty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">2-Week</div>
              <div className="text-sm">Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Ottawa's #1</div>
              <div className="text-sm">Dealer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{projectCount}+</div>
              <div className="text-sm">Installations</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setQuoteStep(1)}
              className="bg-[#9BC4E2] text-[#3B4A7C] hover:bg-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              style={{ height: "56px" }}
            >
              Get Free Consultation
            </button>
            <button className="border-2 border-[#9BC4E2] text-[#9BC4E2] hover:bg-[#9BC4E2] hover:text-[#3B4A7C] font-semibold px-8 py-4 rounded-lg transition-all">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#3B4A7C]">Interactive Quote Builder</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get instant pricing for your custom closet doors with our advanced quote calculator
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Quote Step 1: Door Style Selection */}
            {quoteStep === 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#3B4A7C] text-center">Step 1: Choose Door Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {doorTypes.map((door) => (
                    <button
                      key={door.name}
                      onClick={() => {
                        setSelectedDoorType(door.name)
                        setQuoteStep(2)
                      }}
                      className={`border-2 rounded-lg overflow-hidden hover:border-[#9BC4E2] transition-all ${
                        selectedDoorType === door.name ? "border-[#9BC4E2] bg-[#E8F4FD]" : "border-gray-200"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <Image src={door.image || "/placeholder.svg"} alt={door.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#3B4A7C]">{door.name}</div>
                        <div className="text-[#9BC4E2] font-bold">${door.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quote Step 2: Dimensions */}
            {quoteStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#3B4A7C] text-center">Step 2: Enter Dimensions</h3>
                <div className="max-w-md mx-auto space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Width (inches)</label>
                    <input
                      type="range"
                      min="24"
                      max="120"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center text-[#9BC4E2] font-bold">{dimensions.width}"</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Height (inches)</label>
                    <input
                      type="range"
                      min="60"
                      max="96"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number.parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-center text-[#9BC4E2] font-bold">{dimensions.height}"</div>
                  </div>
                  <button
                    onClick={() => setQuoteStep(3)}
                    className="w-full bg-[#9BC4E2] text-[#3B4A7C] py-3 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Quote Step 3: Quantity */}
            {quoteStep === 3 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#3B4A7C] text-center">Step 3: Select Quantity</h3>
                <div className="max-w-md mx-auto text-center">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xl hover:bg-[#9BC4E2] hover:text-white transition-all"
                    >
                      -
                    </button>
                    <div className="text-3xl font-bold text-[#3B4A7C] w-16">{quantity}</div>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-xl hover:bg-[#9BC4E2] hover:text-white transition-all"
                    >
                      +
                    </button>
                  </div>
                  {quantity >= 3 && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg mb-6 font-semibold">
                      Save 10% on 3+ doors!
                    </div>
                  )}
                  <button
                    onClick={() => setQuoteStep(4)}
                    className="w-full bg-[#9BC4E2] text-[#3B4A7C] py-3 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Quote Step 4: Premium Add-ons */}
            {quoteStep === 4 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#3B4A7C] text-center">Step 4: Premium Add-ons</h3>
                <div className="max-w-md mx-auto space-y-4">
                  {premiumAddOns.map((addon) => (
                    <label
                      key={addon.name}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={addOns.includes(addon.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddOns([...addOns, addon.name])
                          } else {
                            setAddOns(addOns.filter((a) => a !== addon.name))
                          }
                        }}
                        className="w-5 h-5 text-[#9BC4E2]"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-[#3B4A7C]">{addon.name}</div>
                        <div className="text-[#9BC4E2] font-bold">+${addon.price}</div>
                      </div>
                    </label>
                  ))}

                  {/* Real-time Quote Summary */}
                  {quotePrice > 0 && (
                    <div className="bg-[#3B4A7C] text-white p-6 rounded-lg mt-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">${quotePrice}</div>
                        <div className="text-lg mb-2">Total Estimate</div>
                        <div className="text-sm opacity-90 mb-4">
                          ✓ Free consultation ✓ 2-week delivery ✓ Lifetime warranty
                        </div>
                        <button
                          onClick={loadJobberForm}
                          className="w-full bg-[#9BC4E2] text-[#3B4A7C] py-3 rounded-lg font-semibold hover:bg-white transition-all"
                        >
                          Book Free Consultation
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showJobberForm && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#3B4A7C] mb-4">Book Your Free Consultation</h2>
              <p className="text-lg text-gray-600">
                Complete the form below and we'll contact you within 24 hours to schedule your consultation.
              </p>
            </div>
            <div id="83a3d24e-c18d-441c-80d1-d85419ea28ae" className="bg-gray-50 p-8 rounded-lg"></div>
          </div>
        </section>
      )}

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
                        quoteStep >= step
                          ? "bg-[#87ceeb] text-white border-[#87ceeb] scale-110"
                          : "bg-gray-100 text-gray-400 border-gray-300"
                      }`}
                    >
                      {step}
                    </div>
                    <div
                      className={`mt-2 text-sm font-bold uppercase tracking-wide ${
                        quoteStep >= step ? "text-[#1e3a8a]" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {quoteStep === 1 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Choose Room Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Bedroom", "Hall", "Pantry"].map((room) => (
                    <button
                      key={room}
                      onClick={() => {
                        setSelectedDoorType(room)
                        setQuoteStep(2)
                      }}
                      className={`p-8 border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedDoorType === room ? "border-[#87ceeb] bg-[#87ceeb]/10" : "border-gray-200"
                      }`}
                    >
                      <div className="text-6xl mb-4">{room === "Bedroom" ? "🛏️" : room === "Hall" ? "🚪" : "🥫"}</div>
                      <div className="text-xl font-semibold text-[#1e3a8a]">{room}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quoteStep === 2 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Select Door Style</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {doorTypes.map((door) => (
                    <button
                      key={door.name}
                      onClick={() => {
                        setSelectedDoorType(door.name)
                        setQuoteStep(3)
                      }}
                      className={`border-2 hover:border-[#87ceeb] transition-all duration-300 ${
                        selectedDoorType === door.name ? "border-[#87ceeb]" : "border-gray-200"
                      }`}
                    >
                      <div className="aspect-square relative">
                        <Image src={door.image || "/placeholder.svg"} alt={door.name} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <div className="font-semibold text-[#1e3a8a]">{door.name}</div>
                        <div className="text-[#87ceeb]">From ${door.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quoteStep === 3 && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 text-[#1e3a8a]">Pick Finish</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[]}</div>
              </div>
            )}

            {quoteStep === 4 && (
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

      <footer className="bg-[#3B4A7C] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
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
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Ottawa's premier closet door specialists, transforming homes with premium solutions and professional
                installation services.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Quick Links</h4>
              <div className="space-y-2">
                {["Products", "Gallery", "Pricing", "Reviews", "About", "Blog"].map((link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div>(613) 555-0123</div>
                <div>spencer@peoplesgrp.com</div>
                <div>Ottawa & Surrounding Areas</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PG Closets. All rights reserved. Licensed & Insured.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
