"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState(0)
  const [selectedDoorType, setSelectedDoorType] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("Standard")
  const [addOns, setAddOns] = useState<string[]>([])
  const [quotePrice, setQuotePrice] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  const doorTypes = [
    { name: "Bypass", price: 459, category: "Sliding" },
    { name: "Bifold", price: 549, category: "Bifold" },
    { name: "Barn", price: 799, category: "Barn" },
    { name: "Pivot", price: 899, category: "Pivot" },
  ]

  const specificProducts = [
    { name: "Gatsby Chevron Barn", price: 799, image: "🚪" },
    { name: "Euro Frost Glass", price: 649, image: "🚪" },
    { name: "Georgian Classic Bifold", price: 549, image: "🚪" },
    { name: "Industrial X-Brace Barn", price: 799, image: "🚪" },
    { name: "Provincial 8-Lite Pivot", price: 899, image: "🚪" },
    { name: "Mirror Bypass", price: 459, image: "🪞" },
  ]

  const sizeMultipliers = {
    Standard: 1,
    Large: 1.3,
    Custom: 1.6,
  }

  const addOnPrices = {
    Mirror: 150,
    "Soft-close": 75,
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setProjectCount((prev) => (prev < 500 ? prev + 10 : 500))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    calculateQuotePrice()
  }, [selectedDoorType, quantity, size, addOns])

  const calculateQuotePrice = () => {
    const door = doorTypes.find((d) => d.name === selectedDoorType)
    if (!door) return

    let basePrice = door.price * quantity
    basePrice *= sizeMultipliers[size as keyof typeof sizeMultipliers]

    const addOnTotal = addOns.reduce((total, addOn) => {
      return total + (addOnPrices[addOn as keyof typeof addOnPrices] || 0)
    }, 0)

    setQuotePrice(basePrice + addOnTotal)
  }

  const loadJobberForm = () => {
    const existingDiv = document.getElementById("83a3d24e-c18d-441c-80d1-d85419ea28ae")
    const existingScript = document.getElementById("jobber-script")

    if (existingDiv && !existingScript) {
      const script = document.createElement("script")
      script.id = "jobber-script"
      script.src = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
      document.head.appendChild(script)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#3B4A7C] to-[#4A5F8A] text-white text-center py-2 text-sm font-semibold">
            ⭐ 5.0 • 🏠 500+ • ⏰ 15 Years • Official Renin Dealer
          </div>

          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
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
                <h1 className="text-xl font-bold text-[#3B4A7C]">PG CLOSETS</h1>
                <p className="text-xs text-[#9BC4E2] font-medium">Premium Solutions</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="/products" className="text-[#3B4A7C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Products
              </a>
              <button
                onClick={() => setQuoteStep(1)}
                className="bg-[#9BC4E2] text-[#3B4A7C] px-4 py-2 rounded text-sm font-medium hover:bg-[#3B4A7C] hover:text-white"
              >
                Quote
              </button>
              <a href="/gallery" className="text-[#3B4A7C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Gallery
              </a>
              <a href="/pricing" className="text-[#3B4A7C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Pricing
              </a>
              <a href="/reviews" className="text-[#3B4A7C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Reviews
              </a>

              <div className="flex items-center space-x-4 ml-6">
                <a href="tel:6135550123" className="text-[#9BC4E2] font-semibold hover:text-[#3B4A7C]">
                  (613) 555-0123
                </a>
                <button
                  onClick={() => setQuoteStep(1)}
                  className="bg-[#9BC4E2] text-[#3B4A7C] px-6 py-2 rounded font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                >
                  Get Quote
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
              <a href="/products" className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium">
                Products
              </a>
              <a href="/gallery" className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium">
                Gallery
              </a>
              <a href="/pricing" className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium">
                Pricing
              </a>
              <a href="/reviews" className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium">
                Reviews
              </a>
              <a href="/contact" className="block px-4 py-2 text-[#3B4A7C] hover:text-[#9BC4E2] font-medium">
                Contact
              </a>

              <div className="px-4 pt-4 grid grid-cols-2 gap-2">
                <a href="tel:6135550123" className="bg-[#3B4A7C] text-white py-3 text-center rounded font-semibold">
                  Call Now
                </a>
                <button
                  onClick={() => {
                    loadJobberForm()
                    setMobileMenuOpen(false)
                  }}
                  className="bg-[#9BC4E2] text-[#3B4A7C] py-3 rounded font-semibold"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #3B4A7C, #4A5F8A)",
        }}
      >
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-[#9BC4E2] text-[#3B4A7C] px-4 py-2 text-sm font-semibold rounded">
              ⚡ December: 3 Slots Left
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">Premium Closet Doors for Ottawa Homes</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-3xl mx-auto">
            Official Renin Dealer • 500+ Installations • Free Measurement
          </p>

          <div className="flex justify-center space-x-8 mb-8 text-[#9BC4E2]">
            <div className="text-center">
              <div className="text-2xl font-bold">{projectCount}+</div>
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setQuoteStep(1)}
              className="bg-[#9BC4E2] text-[#3B4A7C] hover:bg-white font-semibold px-8 py-4 rounded shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Quote →
            </button>
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-[#9BC4E2] text-[#9BC4E2] hover:bg-[#9BC4E2] hover:text-[#3B4A7C] font-semibold px-8 py-4 rounded transition-all"
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <div className="font-semibold text-[#3B4A7C]">Lifetime Warranty</div>
              <div className="text-sm text-gray-600">On all installations</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <div className="font-semibold text-[#3B4A7C]">2-Week Delivery</div>
              <div className="text-sm text-gray-600">Guaranteed timeline</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-semibold text-[#3B4A7C]">Ottawa's #1 Dealer</div>
              <div className="text-sm text-gray-600">Official Renin partner</div>
            </div>
            <div>
              <div className="text-4xl mb-2">✅</div>
              <div className="font-semibold text-[#3B4A7C]">500+ Installations</div>
              <div className="text-sm text-gray-600">Satisfied customers</div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#3B4A7C]">Premium Door Collection</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete selection of premium closet doors with instant pricing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specificProducts.map((door) => (
              <div
                key={door.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <div className="text-6xl">{door.image}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-[#3B4A7C] mb-2">{door.name}</h3>
                  <div className="text-2xl font-bold text-[#9BC4E2] mb-4">${door.price}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuoteStep(1)}
                      className="flex-1 bg-[#9BC4E2] text-[#3B4A7C] py-2 rounded font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                    >
                      Add to Quote
                    </button>
                    <button className="px-4 py-2 border border-[#9BC4E2] text-[#9BC4E2] rounded hover:bg-[#9BC4E2] hover:text-white transition-all">
                      Full Details
                    </button>
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#3B4A7C]">Interactive Quote Calculator</h2>
              <p className="text-lg text-gray-600">Get instant pricing in 4 simple steps</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              {/* Step 1 - Products */}
              {quoteStep === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#3B4A7C]">Step 1: Choose Your Door Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {doorTypes.map((door) => (
                      <button
                        key={door.name}
                        onClick={() => {
                          setSelectedDoorType(door.name)
                          setQuoteStep(2)
                        }}
                        className="p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-[#9BC4E2] transition-all"
                      >
                        <div className="text-4xl mb-4">🚪</div>
                        <div className="font-semibold text-[#3B4A7C] mb-2">{door.name}</div>
                        <div className="text-[#9BC4E2] font-bold">${door.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 - Quantity/Size */}
              {quoteStep === 2 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#3B4A7C]">Step 2: Quantity & Size</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium mb-4">Number of Doors</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full max-w-xs mx-auto p-3 border rounded-lg"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-lg font-medium mb-4">Size</label>
                      <div className="flex justify-center gap-4">
                        {Object.keys(sizeMultipliers).map((sizeOption) => (
                          <button
                            key={sizeOption}
                            onClick={() => setSize(sizeOption)}
                            className={`px-6 py-3 rounded-lg font-medium ${
                              size === sizeOption
                                ? "bg-[#9BC4E2] text-[#3B4A7C]"
                                : "bg-white border border-gray-300 text-gray-700"
                            }`}
                          >
                            {sizeOption}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setQuoteStep(3)}
                      className="bg-[#9BC4E2] text-[#3B4A7C] px-8 py-3 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 - Add-ons */}
              {quoteStep === 3 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#3B4A7C]">Step 3: Add-ons</h3>
                  <div className="space-y-4">
                    {Object.entries(addOnPrices).map(([addOn, price]) => (
                      <label key={addOn} className="flex items-center justify-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={addOns.includes(addOn)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAddOns([...addOns, addOn])
                            } else {
                              setAddOns(addOns.filter((a) => a !== addOn))
                            }
                          }}
                          className="w-5 h-5"
                        />
                        <span className="text-lg">
                          {addOn} (+${price})
                        </span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={() => setQuoteStep(4)}
                    className="mt-6 bg-[#9BC4E2] text-[#3B4A7C] px-8 py-3 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                  >
                    Get Final Quote
                  </button>
                </div>
              )}

              {/* Step 4 - Final Quote & Contact */}
              {quoteStep === 4 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#3B4A7C]">Your Custom Quote</h3>
                  <div className="bg-white p-8 rounded-lg mb-6">
                    <div className="text-lg mb-4">
                      <strong>{selectedDoorType}</strong> x {quantity} ({size})
                    </div>
                    {addOns.length > 0 && (
                      <div className="text-sm text-gray-600 mb-4">Add-ons: {addOns.join(", ")}</div>
                    )}
                    <div className="text-4xl font-bold text-[#9BC4E2] mb-6">${quotePrice}</div>
                    <div className="text-sm text-gray-600 mb-6">
                      ✓ Professional installation included
                      <br />✓ Lifetime warranty
                      <br />✓ 2-week delivery guarantee
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="text-xl font-bold mb-4 text-[#3B4A7C]">Book Your Free Consultation</h4>
                    <div id="83a3d24e-c18d-441c-80d1-d85419ea28ae" className="min-h-[400px]"></div>
                    <button
                      onClick={loadJobberForm}
                      className="mt-4 bg-[#9BC4E2] text-[#3B4A7C] px-8 py-3 rounded-lg font-semibold hover:bg-[#3B4A7C] hover:text-white transition-all"
                    >
                      Load Consultation Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#3B4A7C]">Book Your Free Consultation</h2>
            <p className="text-lg text-gray-600">Complete the form below and we'll contact you within 24 hours</p>
          </div>
          <div
            id="83a3d24e-c18d-441c-80d1-d85419ea28ae"
            className="bg-white p-8 rounded-lg shadow-lg min-h-[400px]"
          ></div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#9BC4E2] to-[#3B4A7C] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-12">
            Join 500+ satisfied Ottawa homeowners. Professional design, premium materials, expert installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={loadJobberForm}
              className="bg-white text-[#3B4A7C] hover:bg-gray-100 font-bold px-12 py-4 text-xl rounded transition-all"
            >
              Get Free Quote Today
            </button>
            <a
              href="tel:6135550123"
              className="border-2 border-white text-white hover:bg-white hover:text-[#3B4A7C] font-bold px-12 py-4 text-xl rounded transition-all"
            >
              📞 (613) 555-0123
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#3B4A7C] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
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
              <p className="text-gray-300 mb-6">
                Ottawa's premier closet door specialists, transforming homes with premium solutions.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Quick Links</h4>
              <div className="space-y-2">
                <a href="/products" className="block text-gray-300 hover:text-white">
                  Products
                </a>
                <a href="/gallery" className="block text-gray-300 hover:text-white">
                  Gallery
                </a>
                <a href="/pricing" className="block text-gray-300 hover:text-white">
                  Pricing
                </a>
                <a href="/reviews" className="block text-gray-300 hover:text-white">
                  Reviews
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#9BC4E2]">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div>(613) 555-0123</div>
                <div>info@pgclosets.com</div>
                <div>Ottawa & Surrounding Areas</div>
                <div>Licensed & Insured</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PG Closets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
