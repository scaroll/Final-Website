"use client"
import Script from "next/script"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function ContactClientPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const siteStats = {
    installations: "500+",
    rating: "5.0",
    experience: "15+",
    satisfaction: "98%",
  }

  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"
    link.media = "screen"
    document.head.appendChild(link)

    const checkJobberForm = setTimeout(() => {
      const jobberContainer = document.getElementById("83a3d24e-c18d-441c-80d1-d85419ea28ae")
      if (jobberContainer && jobberContainer.children.length === 0) {
        setScriptError(true)
      }
    }, 5000)

    return () => {
      clearTimeout(checkJobberForm)
      const existingLink = document.querySelector(
        'link[href="https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css"]',
      )
      if (existingLink) {
        document.head.removeChild(existingLink)
      }
    }
  }, [])

  const handleScriptLoad = () => {
    setScriptLoaded(true)
    setScriptError(false)
  }

  const handleScriptError = () => {
    setScriptError(true)
    setScriptLoaded(false)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center py-3 text-sm tracking-wide">
          <div className="flex items-center justify-center space-x-8 text-xs uppercase font-light">
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Ottawa's Local Experts</span></span>
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Professional Service</span></span>
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Free Quotes</span></span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center space-x-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                alt="PG Closets"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                priority
              />
              <div>
                <h1 className="text-2xl font-light tracking-wide text-slate-900">PG CLOSETS</h1>
                <p className="text-xs text-slate-500 font-light uppercase tracking-widest">Ottawa Closet Specialists</p>
              </div>
            </a>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Home
              </a>
              <a href="/products" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Products
              </a>
              <a href="/about" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                About
              </a>
              <a href="/services" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Services
              </a>
              <a
                href="/contact"
                className="text-slate-900 font-normal border-b border-slate-900"
              >
                Contact
              </a>

              <div className="flex items-center space-x-6 ml-8 pl-8 border-l border-slate-200">
                <a href="tel:6135550123" className="text-slate-600 hover:text-slate-900 font-light tracking-wide transition-colors">
                  (613) 555-0123
                </a>
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
              <a
                href="/contact"
                className="block px-4 py-2 text-[#9BC4E2] hover:text-[#1B4A9C] font-medium font-semibold"
              >
                Contact
              </a>
            </div>
          )}
        </div>
      </header>

      <div className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block text-xs uppercase tracking-[0.3em] text-slate-500 font-light mb-8">Get In Touch</div>
          <h1 className="text-5xl lg:text-6xl font-extralight mb-8 text-slate-900 tracking-tight leading-[1.1]">
            Let's Start
            <br />
            <span className="text-slate-600">Your Project</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed mb-12">
            Get a free quote from our closet specialists to explore quality solutions for your 
            <span className="text-slate-900 font-normal"> home</span>. Contact us directly at 
            <a className="text-slate-900 font-normal hover:underline transition-all" href="mailto:info@pgclosets.com">
              info@pgclosets.com
            </a>
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-16">

        <div className="mt-8 border border-slate-200 bg-white p-6 shadow-sm">
          <div id="83a3d24e-c18d-441c-80d1-d85419ea28ae">
            {!scriptLoaded && !scriptError && (
              <div className="flex items-center justify-center py-12">
                <div className="text-slate-500">Loading contact form...</div>
              </div>
            )}
            {scriptError && (
              <div className="py-8">
                <h3 className="text-xl font-semibold text-[#1B4A9C] mb-6">Contact Form</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1B4A9C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1B4A9C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1B4A9C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1B4A9C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                    <textarea
                      rows={4}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#1B4A9C]"
                      placeholder="Tell us about your closet door project..."
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="bg-[#1B4A9C] text-white px-8 py-3 font-semibold hover:bg-[#153A7E] transition-all"
                    >
                      Send Message
                    </button>
                    <a
                      href="mailto:info@pgclosets.com?subject=Closet Door Project"
                      className="border-2 border-[#1B4A9C] text-[#1B4A9C] px-8 py-3 font-semibold hover:bg-[#1B4A9C] hover:text-white transition-all text-center"
                    >
                      Email Directly
                    </a>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

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
                Ottawa's local closet door specialists, helping homeowners with quality solutions.
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
                {/* Added business hours section */}
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
            {/* Updated copyright to 2025 */}
            <p>&copy; 2025 PG Closets. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Script
        src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        data-clienthub-id="83a3d24e-c18d-441c-80d1-d85419ea28ae"
      />
    </div>
  )
}
