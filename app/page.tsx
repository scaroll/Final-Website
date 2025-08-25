export const metadata = {
  title: "Premium Closet Doors Ottawa | Official Renin Dealer | Custom Installation | PG Closets",
  description:
    "Transform your Ottawa home with premium Renin closet doors. Expert installation of barn doors, bypass doors, bifold doors & pivot doors. Free consultation, lifetime warranty, 2-week delivery. Serving Ottawa, Kanata, Nepean, Orleans, Barrhaven.",
  keywords:
    "closet doors Ottawa, barn doors Ottawa, Renin dealer, bypass doors, bifold doors, pivot doors, custom closet installation, professional installation Ottawa, home renovation, interior design, space optimization, premium doors Canada, closet solutions Ottawa",
  openGraph: {
    title: "Premium Closet Doors Ottawa | Official Renin Dealer | PG Closets",
    description:
      "Transform your Ottawa home with premium Renin closet doors. Expert installation, lifetime warranty, transparent Canadian pricing.",
    images: ["/images/arcat/renin_176732_Continental_Hall_3_Lite.jpg"],
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://pgclosets.com",
  },
}

export default function Home() {
  return (
    <main>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/arcat/renin_176732_Continental_Hall_3_Lite.jpg')",
        }}
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight" itemProp="headline">
                Ottawa's Renin Closet Door
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300">
                  Experts
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed" itemProp="description">
                Official Renin dealer • Professional installation • Transparent Canadian pricing
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-black hover:bg-gray-100 shadow-2xl rounded-lg transition-all duration-300 hover:scale-105"
                  itemProp="potentialAction"
                >
                  Request Work →
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-black shadow-lg hover:shadow-2xl backdrop-blur-sm bg-white/10 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Browse Products
                </a>
              </div>

              <div className="flex items-center justify-center gap-3 text-green-200 bg-green-900/20 backdrop-blur-sm rounded-full px-6 py-3 mx-auto w-fit">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-lg font-medium">
                  Free Ottawa consultation • No obligation • Instant CAD pricing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" itemScope itemType="https://schema.org/ItemList">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" itemProp="headline">
              Premium Renin Door Collections
            </h2>
            <p className="text-xl text-gray-600" itemProp="description">
              Explore our complete range of closet door styles, each designed for Canadian homes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sliding Doors",
                type: "sliding",
                description: "Space-saving bypass doors",
                count: "25+ styles",
                image: "/images/arcat/renin_205739_Bypass_Closet_Doors_Euro_3_Lite.jpg",
              },
              {
                name: "Bifold Doors",
                type: "bifold",
                description: "Classic folding design",
                count: "20+ styles",
                image: "/images/arcat/renin_205746_Bifold_Closet_Door_Euro_1_Lite.jpg",
              },
              {
                name: "Barn Doors",
                type: "barn",
                description: "Modern sliding barn style",
                count: "30+ styles",
                image: "/images/arcat/renin_205731_Mix_Match_Hardware_Driftwood_K_Design.jpg",
              },
              {
                name: "Hardware",
                type: "hardware",
                description: "Premium hardware systems",
                count: "15+ styles",
                image: "/images/arcat/renin_205752_Barn_Door_Hardware_Kits_Cadium_Bent_Strap.jpg",
              },
            ].map((category) => (
              <div
                key={category.type}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                itemScope
                itemType="https://schema.org/ProductGroup"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={`${category.name} - ${category.description}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" itemProp="name">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-2" itemProp="description">
                    {category.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">{category.count}</p>
                  <a
                    href={`/products?category=${category.type}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    Browse {category.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Transform Your Ottawa Home?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join hundreds of satisfied Ottawa homeowners who chose PG Closets for their premium closet door solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Get Free Quote Now →
              </a>
              <a
                href="mailto:spencer@peoplesgrp.com"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Email: spencer@peoplesgrp.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
