export const metadata = {
  title: "PG Closets Ottawa | Premium Closet Doors & Installation",
  description:
    "Ottawa's premier closet door specialists. Professional installation, premium quality, transparent pricing.",
  keywords:
    "closet doors Ottawa, barn doors Ottawa, bifold doors, sliding doors, professional installation, home renovation Ottawa, custom closets, interior doors, space solutions",
  openGraph: {
    title: "PG Closets Ottawa | Premium Closet Doors & Installation",
    description:
      "Ottawa's premier closet door specialists. Professional installation, premium quality, transparent pricing.",
    type: "website",
    locale: "en_CA",
    siteName: "PG Closets",
    url: "https://pgclosets.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "PG Closets Ottawa | Premium Closet Doors & Installation",
    description:
      "Ottawa's premier closet door specialists. Professional installation, premium quality, transparent pricing.",
  },
  alternates: {
    canonical: "https://pgclosets.com",
  },
  robots: "index, follow",
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Ottawa",
    "geo.position": "45.4215;-75.6972",
  },
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {console.log("[v0] Homepage component rendering")}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "PG Closets",
            description:
              "Ottawa's premier closet door specialists offering professional installation and premium quality doors.",
            url: "https://pgclosets.com",
            telephone: "+1-613-555-0123",
            email: "spencer@peoplesgrp.com",
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
            areaServed: ["Ottawa", "Kanata", "Nepean", "Orleans", "Barrhaven", "Gatineau"],
            serviceType: ["Closet Door Installation", "Custom Closets", "Home Renovation"],
            priceRange: "$$",
            openingHours: "Mo-Fr 09:00-17:00",
          }),
        }}
      />

      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom right, #243c74, #89bee6)",
        }}
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <div className="container-apple text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-h1 text-white" itemProp="headline">
              Ottawa's Premier
              <br />
              <span className="gradient-text">Closet Door Experts</span>
            </h1>
            <p className="text-body-l text-gray-100 max-w-2xl mx-auto" itemProp="description">
              Professional installation • Premium quality • Transparent Canadian pricing
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+16135550123"
                className="btn-primary w-full sm:w-auto min-w-[200px]"
                itemProp="potentialAction"
                itemScope
                itemType="https://schema.org/ContactAction"
              >
                📞 Call (613) 555-0123
              </a>
              <a href="/contact" className="btn-secondary w-full sm:w-auto min-w-[200px]">
                Get Free Quote →
              </a>
              <a href="/products" className="btn-secondary w-full sm:w-auto min-w-[200px]">
                Browse Products
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-green-200 bg-green-900/20 backdrop-blur-sm rounded-full px-4 sm:px-6 py-3 mx-auto w-fit max-w-full">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm sm:text-base font-medium text-center">
                Free consultation • No obligation • Instant pricing
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple bg-white" itemScope itemType="https://schema.org/ItemList">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4" itemProp="name">
              Premium Door Collections
            </h2>
            <p className="text-body-l text-pg-gray" itemProp="description">
              Explore our complete range of closet door styles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { name: "Sliding Doors", description: "Space-saving bypass doors", count: "25+ styles", type: "sliding" },
              { name: "Bifold Doors", description: "Classic folding design", count: "20+ styles", type: "bifold" },
              { name: "Barn Doors", description: "Modern sliding barn style", count: "30+ styles", type: "barn" },
              { name: "Hardware", description: "Premium hardware systems", count: "15+ styles", type: "hardware" },
            ].map((category) => (
              <div key={category.name} className="card-apple p-6" itemScope itemType="https://schema.org/ProductGroup">
                <div className="aspect-square bg-gradient-to-br from-pg-sky/20 to-pg-navy/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-pg-navy/10 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-pg-navy rounded" aria-hidden="true"></div>
                  </div>
                </div>
                <h3 className="text-h3 mb-2" itemProp="name">
                  {category.name}
                </h3>
                <p className="text-body-m text-pg-gray mb-2" itemProp="description">
                  {category.description}
                </p>
                <p className="text-body-s text-pg-gray mb-4">{category.count}</p>
                <a
                  href={`/products?category=${category.type}`}
                  className="btn-secondary w-full text-center"
                  aria-label={`Browse ${category.name} collection`}
                >
                  Browse {category.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dense bg-pg-offwhite">
        <div className="container-apple text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-h2 mb-4">Ready to Transform Your Ottawa Home?</h2>
            <p className="text-body-l text-pg-gray mb-8">
              Join hundreds of satisfied Ottawa homeowners who chose PG Closets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+16135550123" className="btn-primary w-full sm:w-auto min-w-[200px]">
                📞 Call (613) 555-0123
              </a>
              <a href="/contact" className="btn-secondary w-full sm:w-auto min-w-[200px]">
                Get Free Quote Now →
              </a>
              <a
                href="mailto:spencer@peoplesgrp.com"
                className="btn-secondary w-full sm:w-auto min-w-[200px] text-center"
                aria-label="Send email to spencer@peoplesgrp.com"
              >
                <span className="hidden sm:inline">Email: </span>spencer@peoplesgrp.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
