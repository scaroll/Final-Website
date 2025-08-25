"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function ClientHomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quoteStep, setQuoteStep] = useState(0)
  const [selectedDoorType, setSelectedDoorType] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("Standard")
  const [addOns, setAddOns] = useState<string[]>([])
  const [quotePrice, setQuotePrice] = useState(0)
  const [projectCount, setProjectCount] = useState(0)

  const products = [
    // BYPASS DOORS
    { name: "Continental", type: "bypass", price: 459, image: "/images/arcat/renin_176732_hd.jpg", category: "Bypass" },
    { name: "Arrivée", type: "bypass", price: 459, image: "/products/bypass-euro-1-lite-hero.png", category: "Bypass" },
    {
      name: "Essence",
      type: "bypass",
      price: 459,
      image: "/products/bypass-harmony-1-lite-hero.png",
      category: "Bypass",
    },
    {
      name: "Metro",
      type: "bypass",
      price: 459,
      image: "/products/bypass-twilight-1-lite-hero.png",
      category: "Bypass",
    },

    // BIFOLD DOORS
    { name: "Provincial", type: "bifold", price: 549, image: "/images/arcat/renin_205750_hd.jpg", category: "Bifold" },
    { name: "Brownstone", type: "bifold", price: 549, image: "/images/arcat/renin_192857_hd.jpg", category: "Bifold" },

    // BARN DOORS
    { name: "Gatsby", type: "barn", price: 799, image: "/images/arcat/renin_205729_hd.jpg", category: "Barn" },
    { name: "Sagrada", type: "barn", price: 799, image: "/images/arcat/renin_205737_hd.jpg", category: "Barn" },
    { name: "Stone K", type: "barn", price: 799, image: "/images/arcat/renin_176736_hd.jpg", category: "Barn" },

    // PIVOT DOORS
    { name: "Euro", type: "pivot", price: 899, image: "/products/pivot-euro-1-lite-hero.png", category: "Pivot" },
    { name: "Sherwood", type: "pivot", price: 899, image: "/images/arcat/renin_205730_hd.jpg", category: "Pivot" },
    { name: "Authentic", type: "pivot", price: 899, image: "/images/arcat/renin_192853_hd.jpg", category: "Pivot" },
  ]

  const doorTypes = [
    { name: "Bypass", price: 459, category: "Sliding" },
    { name: "Bifold", price: 549, category: "Bifold" },
    { name: "Barn", price: 799, category: "Barn" },
    { name: "Pivot", price: 899, category: "Pivot" },
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
  }, [selectedDoorType, selectedProduct, quantity, size, addOns])

  const calculateQuotePrice = () => {
    let basePrice = 0

    if (selectedProduct) {
      const product = products.find((p) => p.name === selectedProduct)
      basePrice = product ? product.price * quantity : 0
    } else if (selectedDoorType) {
      const door = doorTypes.find((d) => d.name === selectedDoorType)
      basePrice = door ? door.price * quantity : 0
    }

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
      script.setAttribute("clienthub_id", "83a3d24e-c18d-441c-80d1-d85419ea28ae")
      document.head.appendChild(script)
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1B4A9C] to-[#4A5F8A] text-white text-center py-2 text-sm font-semibold">
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
                <h1 className="text-xl font-bold text-[#1B4A9C]">PG CLOSETS</h1>
                <p className="text-xs text-[#9BC4E2] font-medium">Premium Solutions</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-6">
              <a href="/products" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Products
              </a>
              <button
                onClick={() => setQuoteStep(1)}
                className="bg-[#9BC4E2] text-[#1B4A9C] px-4 py-2 text-sm font-medium hover:bg-[#1B4A9C] hover:text-white transition-all"
              >
                Quote
              </button>
              <a href="/gallery" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Gallery
              </a>
              <a href="/pricing" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Pricing
              </a>
              <a href="/reviews" className="text-[#1B4A9C] hover:text-[#9BC4E2] px-3 py-2 text-sm font-medium">
                Reviews
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
              <a href="/products" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Products
              </a>
              <a href="/gallery" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Gallery
              </a>
              <a href="/pricing" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Pricing
              </a>
              <a href="/reviews" className="block px-4 py-2 text-[#1B4A9C] hover:text-[#9BC4E2] font-medium">
                Reviews
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
                    loadJobberForm()
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
        className="relative h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #1B4A9C, #4A5F8A)",
        }}
      >
        <div className="relative z-20 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block bg-[#9BC4E2] text-[#1B4A9C] px-4 py-2 text-sm font-semibold">
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
              className="bg-[#9BC4E2] text-[#1B4A9C] hover:bg-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all"
            >
              Calculate Quote →
            </button>
            <button
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-[#9BC4E2] text-[#9BC4E2] hover:bg-[#9BC4E2] hover:text-[#1B4A9C] font-semibold px-8 py-4 transition-all"
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
              <div className="font-semibold text-[#1B4A9C]">Lifetime Warranty</div>
              <div className="text-sm text-gray-600">On all installations</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🚚</div>
              <div className="font-semibold text-[#1B4A9C]">2-Week Delivery</div>
              <div className="text-sm text-gray-600">Guaranteed timeline</div>
            </div>
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-semibold text-[#1B4A9C]">Ottawa's #1 Dealer</div>
              <div className="text-sm text-gray-600">Official Renin partner</div>
            </div>
            <div>
              <div className="text-4xl mb-2">✅</div>
              <div className="font-semibold text-[#1B4A9C]">500+ Installations</div>
              <div className="text-sm text-gray-600">Satisfied customers</div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <div className="absolute top-2 right-2 bg-[#9BC4E2] text-[#1B4A9C] px-2 py-1 text-xs font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#2C3E50] mb-2">{product.name}</h3>
                  <p className="text-[#6B7280] text-sm mb-4">
                    Classic design with traditional styling for timeless closet solutions.
                  </p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#1B4A9C] mb-2">Key Specifications:</h4>
                    <ul className="text-xs text-[#6B7280] space-y-1">
                      <li>
                        <strong>Material:</strong> Premium engineered wood core
                      </li>
                      <li>
                        <strong>Finish:</strong> Durable laminate surface
                      </li>
                      <li>
                        <strong>Sizes:</strong> 24", 30", 32", 36" widths
                      </li>
                      <li>
                        <strong>Warranty:</strong> 5-year manufacturer warranty
                      </li>
                    </ul>
                  </div>

                  <div className="text-3xl font-bold text-[#1B4A9C] mb-6">${product.price}.00</div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product.name)
                        setSelectedDoorType(product.type)
                        setQuoteStep(2)
                      }}
                      className="flex-1 bg-[#1B4A9C] text-white py-3 font-semibold hover:bg-[#153A7E] transition-all text-sm uppercase tracking-wide"
                    >
                      Add to Cart
                    </button>
                    <button className="px-4 py-3 border-2 border-[#1B4A9C] text-[#1B4A9C] hover:bg-[#1B4A9C] hover:text-white transition-all text-sm uppercase tracking-wide">
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
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1B4A9C]">Interactive Quote Calculator</h2>
              <p className="text-lg text-gray-600">Get instant pricing in 3 simple steps</p>
            </div>

            <div className="bg-[#F5F5F5] p-8 border-2 border-[#E0E0E0]">
              {quoteStep === 1 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Step 1: Choose Your Door</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product) => (
                      <button
                        key={product.name}
                        onClick={() => {
                          setSelectedProduct(product.name)
                          setSelectedDoorType(product.type)
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
                        <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                      className="text-[#9BC4E2] hover:text-[#1B4A9C] font-medium"
                    >
                      View All 12 Products →
                    </button>
                  </div>
                </div>
              )}

              {quoteStep === 2 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Step 2: Quantity & Size</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-lg font-medium mb-4">Number of Doors</label>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="w-full max-w-xs mx-auto p-3 border-2 border-[#E0E0E0] focus:border-[#1B4A9C] outline-none"
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
                            className={`px-6 py-3 font-medium transition-all ${
                              size === sizeOption
                                ? "bg-[#1B4A9C] text-white"
                                : "bg-white border-2 border-[#E0E0E0] text-gray-700 hover:border-[#1B4A9C]"
                            }`}
                          >
                            {sizeOption}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setQuoteStep(3)}
                      className="bg-[#1B4A9C] text-white px-8 py-3 font-semibold hover:bg-[#153A7E] transition-all uppercase tracking-wide"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {quoteStep === 3 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Step 3: Add-ons</h3>
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
                    className="mt-6 bg-[#1B4A9C] text-white px-8 py-3 font-semibold hover:bg-[#153A7E] transition-all uppercase tracking-wide"
                  >
                    Get Final Quote
                  </button>
                </div>
              )}

              {quoteStep === 4 && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-8 text-[#1B4A9C]">Your Custom Quote</h3>
                  <div className="bg-white p-8 border-2 border-[#E0E0E0] mb-6">
                    {selectedProduct && (
                      <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 relative rounded overflow-hidden">
                          <Image
                            src={products.find((p) => p.name === selectedProduct)?.image || ""}
                            alt={selectedProduct}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="text-lg mb-4">
                      <strong>{selectedProduct || selectedDoorType}</strong> x {quantity} ({size})
                    </div>
                    {addOns.length > 0 && (
                      <div className="text-sm text-gray-600 mb-4">Add-ons: {addOns.join(", ")}</div>
                    )}
                    <div className="text-4xl font-bold text-[#1B4A9C] mb-6">${quotePrice}</div>
                    <div className="text-sm text-gray-600 mb-6">
                      ✓ Professional installation included
                      <br />✓ Lifetime warranty
                      <br />✓ 2-week delivery guarantee
                    </div>
                  </div>

                  <div className="bg-white p-6 border-2 border-[#E0E0E0]">
                    <h4 className="text-xl font-bold mb-4 text-[#1B4A9C]">Book Your Free Consultation</h4>
                    <div id="83a3d24e-c18d-441c-80d1-d85419ea28ae" className="min-h-[400px]"></div>
                    <button
                      onClick={loadJobberForm}
                      className="mt-4 bg-[#1B4A9C] text-white px-8 py-3 font-semibold hover:bg-[#153A7E] transition-all uppercase tracking-wide"
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#1B4A9C]">Book Your Free Consultation</h2>
            <p className="text-lg text-gray-600">Complete the form below and we'll contact you within 24 hours</p>
          </div>
          <div
            id="83a3d24e-c18d-441c-80d1-d85419ea28ae"
            className="bg-white p-8 rounded-lg shadow-lg min-h-[400px]"
          ></div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-[#9BC4E2] to-[#1B4A9C] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-12">
            Join 500+ satisfied Ottawa homeowners. Professional design, premium materials, expert installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={loadJobberForm}
              className="bg-white text-[#1B4A9C] hover:bg-gray-100 font-bold px-12 py-4 text-xl transition-all uppercase tracking-wide"
            >
              Get Free Quote Today
            </button>
            <a
              href="tel:6135550123"
              className="border-2 border-white text-white hover:bg-white hover:text-[#1B4A9C] font-bold px-12 py-4 text-xl transition-all uppercase tracking-wide"
            >
              📞 (613) 555-0123
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1B4A9C] text-white py-16">
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
