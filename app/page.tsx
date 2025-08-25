import { LocalBusinessJSONLD } from "@/lib/seo"
import { Button } from "@/components/ui/button"
import HeroVideo from "@/components/HeroVideo"

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
    images: ["/products/bypass-harmony-1-lite-hero.png"],
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://pgclosets.com",
  },
}

function HeroSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      <div className="relative z-10 container-apple text-center text-white flex items-center justify-center min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <div className="h-20 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-8 bg-white/10 rounded-lg animate-pulse max-w-2xl mx-auto" />
          </div>
          <div className="flex gap-4 justify-center">
            <div className="h-12 w-40 bg-white/10 rounded-lg animate-pulse" />
            <div className="h-12 w-40 bg-white/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <LocalBusinessJSONLD />

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <HeroVideo />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

        <div className="relative z-10 container-apple text-center text-white">
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
                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  className="bg-white text-black hover:bg-gray-100 shadow-2xl"
                  itemProp="potentialAction"
                >
                  Request Work →
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/products"
                  className="border-2 border-white text-white hover:bg-white hover:text-black shadow-lg hover:shadow-2xl backdrop-blur-sm bg-white/10 hover:bg-white active:bg-gray-100 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
                >
                  Browse Products
                </Button>
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

        <div className="absolute bottom-8 right-8 z-20 flex gap-3" role="group" aria-label="Video controls">
          <button
            id="videoToggle"
            className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle video playback"
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            id="muteToggle"
            className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Toggle video sound"
            type="button"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      <section
        className="section-apple bg-gradient-to-br from-pg-off-white to-white"
        itemScope
        itemType="https://schema.org/ServiceArea"
      >
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4" itemProp="headline">
              Serving Ottawa & Surrounding Areas
            </h2>
            <p className="text-body-m text-pg-dark" style={{ opacity: 0.8 }} itemProp="description">
              Professional closet door installation across the National Capital Region
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {[
              { name: "Ottawa", population: "1M+" },
              { name: "Kanata", population: "90K+" },
              { name: "Nepean", population: "180K+" },
              { name: "Orleans", population: "110K+" },
              { name: "Barrhaven", population: "95K+" },
            ].map((area) => (
              <div
                key={area.name}
                className="card-apple p-6 text-center hover:shadow-lg transition-all duration-300 group"
                itemScope
                itemType="https://schema.org/City"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pg-navy to-pg-sky rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-pg-navy font-semibold text-lg mb-1" itemProp="name">
                  {area.name}
                </h3>
                <p className="text-body-s text-pg-gray">{area.population} residents</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-medium border border-green-200 shadow-sm">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free consultation within 30km of Ottawa • Same-day quotes available</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-apple" itemScope itemType="https://schema.org/ItemList">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4" itemProp="headline">
              Premium Renin Door Collections
            </h2>
            <p className="text-body-m text-pg-dark" style={{ opacity: 0.8 }} itemProp="description">
              Explore our complete range of closet door styles, each designed for Canadian homes
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sliding Doors",
                type: "sliding",
                description: "Space-saving bypass doors",
                count: "25+ styles",
                gradient: "bg-gradient-to-br from-blue-900 via-blue-700 to-blue-300",
              },
              {
                name: "Bifold Doors",
                type: "bifold",
                description: "Classic folding design",
                count: "20+ styles",
                gradient: "bg-gradient-to-br from-gray-800 via-gray-600 to-gray-300",
              },
              {
                name: "Barn Doors",
                type: "barn",
                description: "Modern sliding barn style",
                count: "30+ styles",
                gradient: "bg-gradient-to-br from-blue-900 via-blue-600 to-white",
              },
              {
                name: "Pivot Doors",
                type: "pivot",
                description: "Contemporary pivot design",
                count: "15+ styles",
                gradient: "bg-gradient-to-br from-blue-600 via-blue-500 to-gray-400",
              },
            ].map((category) => (
              <div
                key={category.type}
                className="card-apple p-6 hover:shadow-xl transition-all duration-300 group"
                itemScope
                itemType="https://schema.org/ProductGroup"
              >
                <div
                  className={`w-full aspect-square ${category.gradient} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-10">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>
                  <div className="text-white text-center relative z-10">
                    <div className="text-xl font-bold mb-1 drop-shadow-lg">{category.name}</div>
                    <div className="text-sm opacity-90 drop-shadow">{category.count}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3
                    className="text-pg-navy font-semibold text-lg group-hover:text-pg-sky transition-colors duration-200"
                    itemProp="name"
                  >
                    {category.name}
                  </h3>
                  <p className="text-body-s text-pg-gray" itemProp="description">
                    {category.description}
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    href={`/products?category=${category.type}`}
                    className="w-full group-hover:bg-pg-navy group-hover:text-white transition-all duration-200"
                  >
                    Browse {category.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-apple" itemScope itemType="https://schema.org/PriceSpecification">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4" itemProp="headline">
              Transparent Canadian Pricing
            </h2>
            <p className="text-body-m text-pg-dark" style={{ opacity: 0.8 }} itemProp="description">
              No hidden fees, no surprises. Choose the perfect solution for your budget and style preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="card-apple p-8 hover:shadow-xl transition-all duration-300 group text-center"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-pg-navy font-semibold text-xl mb-2" itemProp="name">
                    Value
                  </h3>
                  <div className="text-3xl font-bold text-pg-navy mb-1" itemProp="priceRange">
                    $259-$449
                  </div>
                  <p className="text-body-s text-pg-gray">Quality doors, professional install</p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Basic styles</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Standard colors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">1-year warranty</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  className="w-full group-hover:bg-pg-navy group-hover:text-white transition-all duration-200"
                >
                  Get Quote
                </Button>
              </div>
            </div>

            <div
              className="card-apple p-8 hover:shadow-xl transition-all duration-300 group text-center border-2 border-pg-sky relative"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-pg-sky text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-pg-navy font-semibold text-xl mb-2" itemProp="name">
                    Designer
                  </h3>
                  <div className="text-3xl font-bold text-pg-navy mb-1" itemProp="priceRange">
                    $459-$649
                  </div>
                  <p className="text-body-s text-pg-gray">Premium materials and finishes</p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Premium styles</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Custom colors</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">3-year warranty</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  href="/contact"
                  className="w-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Get Quote
                </Button>
              </div>
            </div>

            <div
              className="card-apple p-8 hover:shadow-xl transition-all duration-300 group text-center"
              itemScope
              itemType="https://schema.org/Offer"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-pg-navy font-semibold text-xl mb-2" itemProp="name">
                    Premium
                  </h3>
                  <div className="text-3xl font-bold text-pg-navy mb-1" itemProp="priceRange">
                    $679-$1,115
                  </div>
                  <p className="text-body-s text-pg-gray">Luxury barn doors and custom solutions</p>
                </div>

                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Luxury styles</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Any custom finish</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-body-s text-pg-dark">Lifetime warranty</span>
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="lg"
                  href="/contact"
                  className="w-full group-hover:bg-pg-navy group-hover:text-white transition-all duration-200"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-apple bg-gradient-to-br from-pg-off-white to-white"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container-apple">
          <div
            className="card-apple p-16 text-center relative overflow-hidden"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-pg-navy to-pg-sky"></div>
            </div>

            <div className="max-w-2xl mx-auto space-y-8 relative z-10">
              <div className="space-y-4">
                <div
                  className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200 shadow-sm"
                  itemProp="aggregateRating"
                  itemScope
                  itemType="https://schema.org/AggregateRating"
                >
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span itemProp="reviewCount">500+</span> Ottawa Homes Transformed •{" "}
                  <span itemProp="ratingValue">4.9</span>/5 Rating
                </div>
                <h2 className="text-h2">Ready to Transform Your Ottawa Home?</h2>
                <p className="text-body-l text-pg-dark" style={{ opacity: 0.8 }}>
                  Join hundreds of satisfied Ottawa homeowners who chose PG Closets for their premium closet door
                  solutions. Get instant CAD pricing with our 2-minute configurator.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/contact"
                    className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Get Free Quote Now →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pg-navy to-pg-sky opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                  <Button variant="secondary" size="lg" href="mailto:spencer@peoplesgrp.com">
                    Email: spencer@peoplesgrp.com
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-pg-gray flex-wrap">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">4.9/5 Google Rating</span>
                  </div>
                  <div className="text-pg-border">•</div>
                  <div className="font-medium">Free Ottawa Consultation</div>
                  <div className="text-pg-border">•</div>
                  <div className="font-medium">Lifetime Warranty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
