import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Quality Closet Door Services Ottawa | Free Quotes & Professional Installation | PG Closets",
  description:
    "Ottawa's local closet door specialists offering quality door solutions. Free quotes, professional installation, lifetime warranty. Serving Ottawa homeowners since 2010.",
  keywords:
    "quality closet doors Ottawa, professional door installation, closet specialists Ottawa, free quotes, custom closet solutions, expert installation",
  openGraph: {
    title: "Quality Closet Door Services Ottawa | PG Closets",
    description:
      "Ottawa's local closet specialists providing quality door solutions. Free quotes, professional installation, excellent service.",
    images: [{ url: "/images/arcat/renin_205738_Bypass_Closet_Doors_Euro_1_Lite.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/services" },
}

// ISR: Revalidate daily for services page
export const revalidate = 86400

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white text-center py-3 text-sm tracking-wide">
          <div className="flex items-center justify-center space-x-8 text-xs uppercase font-light">
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Ottawa's Local Experts</span></span>
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Quality Services</span></span>
            <span className="flex items-center space-x-1"><span className="w-1 h-1 bg-amber-400 rounded-full"></span><span>Skilled Professionals</span></span>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
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
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                About
              </Link>
              <Link href="/services" className="text-slate-900 font-normal border-b border-slate-900">
                Services
              </Link>
              <Link href="/contact" className="text-slate-700 hover:text-slate-900 px-3 py-2 text-sm font-light tracking-wide transition-colors">
                Contact
              </Link>

              <div className="flex items-center space-x-6 ml-8 pl-8 border-l border-slate-200">
                <a href="tel:613-729-7400" className="text-slate-600 hover:text-slate-900 font-light tracking-wide transition-colors">
                  (613) 729-7400
                </a>
                <Link
                  href="/contact"
                  className="bg-slate-900 text-white px-8 py-2.5 text-sm font-light tracking-wide hover:bg-slate-800 transition-all duration-300"
                >
                  Get Quote
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-6xl">
          <div className="space-y-8">
            <div className="inline-block text-xs uppercase tracking-[0.3em] text-slate-500 font-light mb-4">Our Services</div>
            <h1 className="text-5xl lg:text-7xl font-extralight leading-[1.1] text-slate-900 tracking-tight">
              Professional Service
              <br />
              <span className="text-slate-600">For Ottawa Homeowners</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
              From free quotes to professional installation, we handle every detail of your 
              <span className="text-slate-900 font-normal"> closet door upgrade</span> with careful attention to quality
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/contact"
                className="group bg-slate-900 text-white hover:bg-slate-800 font-light px-12 py-4 text-lg tracking-wide transition-all duration-500 hover:shadow-2xl hover:scale-105"
              >
                <span className="group-hover:hidden">Get Free Quote</span>
                <span className="hidden group-hover:inline-flex items-center space-x-2">
                  <span>Start Project</span>
                  <span>→</span>
                </span>
              </Link>
              <Link
                href="/products"
                className="group border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 font-light px-12 py-4 text-lg tracking-wide transition-all duration-300"
              >
                <span className="group-hover:hidden">View Products</span>
                <span className="hidden group-hover:inline">Browse Doors</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block text-xs uppercase tracking-[0.3em] text-slate-500 font-light mb-4">What We Offer</div>
            <h2 className="text-4xl lg:text-5xl font-extralight mb-8 text-slate-900 tracking-tight">
              Complete Service Solutions
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
              Every service is carefully designed to provide excellent results for 
              <span className="text-slate-900 font-normal"> Ottawa homeowners who want quality</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Installation Service */}
            <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_205750_Bifold_Closet_Door_Georgian_6_Panel_Insert_Design.jpg"
                  alt="Professional closet door installation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Installation</h3>
                <p className="text-gray-600 mb-4">
                  Expert installation of all Renin closet door systems with precision and care. Our certified installers
                  ensure perfect fit and function.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Certified installers
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Lifetime warranty
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clean-up included
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="w-full bg-[#1B4A9C] text-white px-4 py-2 font-semibold hover:bg-[#2563eb] transition-colors text-center block"
                >
                  Schedule Installation
                </Link>
              </div>
            </div>

            {/* Consultation Service */}
            <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_205739_Bypass_Closet_Doors_Euro_3_Lite.jpg"
                  alt="Free home consultation service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Free Consultation</h3>
                <p className="text-gray-600 mb-4">
                  In-home consultation to assess your space, discuss options, and provide instant CAD pricing for your
                  project.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    No obligation
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Instant pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Design recommendations
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="w-full border-2 border-[#1B4A9C] text-[#1B4A9C] px-4 py-2 font-semibold hover:bg-[#1B4A9C] hover:text-white transition-colors text-center block"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            {/* Custom Solutions */}
            <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="aspect-video relative">
                <Image
                  src="/images/arcat/renin_205731_Mix_Match_Hardware_Driftwood_K_Design.jpg"
                  alt="Custom closet door solutions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Tailored closet door solutions for unique spaces, including custom sizing, finishes, and hardware
                  configurations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom sizing
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unique finishes
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Special hardware
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="w-full bg-[#1B4A9C] text-white px-4 py-2 font-semibold hover:bg-[#2563eb] transition-colors text-center block"
                >
                  Discuss Custom Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, transparent process from consultation to completion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Consultation",
                description: "Free in-home consultation and measurement",
                image: "/images/arcat/renin_205774_Mirror_Capri_24_x_32_.jpg",
              },
              {
                step: "2",
                title: "Design",
                description: "Product selection and instant CAD pricing",
                image: "/images/arcat/renin_205773_Mirror_Vienna_30_x_42_.jpg",
              },
              {
                step: "3",
                title: "Manufacturing",
                description: "Custom manufacturing and quality control",
                image: "/images/arcat/renin_205752_Barn_Door_Hardware_Kits_Cadium_Bent_Strap.jpg",
              },
              {
                step: "4",
                title: "Installation",
                description: "Professional installation and final inspection",
                image: "/images/arcat/renin_205758_Handles_Pulls_Alperton.jpg",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Transform your space with premium Renin closet doors. Free consultation, transparent pricing, lifetime
              warranty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-[#1B4A9C] text-white px-8 py-4 text-lg font-semibold hover:bg-[#2563eb] shadow-xl transition-colors inline-block"
              >
                Schedule Free Consultation →
              </Link>
              <Link
                href="/products"
                className="border-2 border-[#1B4A9C] text-[#1B4A9C] px-8 py-4 text-lg font-semibold hover:bg-[#1B4A9C] hover:text-white transition-colors inline-block"
              >
                Browse Products
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>4.9/5 Rating</span>
              </div>
              <div className="text-gray-400">•</div>
              <div>500+ Happy Customers</div>
              <div className="text-gray-400">•</div>
              <div>Lifetime Warranty</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1B4A9C] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white flex items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PG%20Logo.jpg-PA2Pv0eQKuJGkzYoQf9wsC86lYSKGa.jpeg"
                    alt="PG Closets Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-bold text-xl">PG CLOSETS</div>
                  <div className="text-xs text-[#9BC4E2]">Premium Solutions</div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Ottawa's premier closet door specialists, transforming homes with premium solutions.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Sitemap</h3>
              <div className="space-y-2">
                <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
                <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/services" className="block text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
                <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2 text-gray-300">
                <p>(613) 729-7400</p>
                <p>info@pgclosets.com</p>
                <p>Ottawa & Surrounding Areas</p>
                <div className="mt-4">
                  <p className="font-semibold">Business Hours:</p>
                  <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                  <p>Sat: 9:00 AM - 4:00 PM</p>
                  <p>Sun: By Appointment</p>
                </div>
                <p className="mt-4 text-sm">Licensed & Insured</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2563eb] mt-12 pt-8 text-center text-gray-300">
            <p>© 2025 PG Closets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
