import type { Metadata } from "next"
import PgHeader from "@/components/PgHeader"
import PgFooter from "@/components/PgFooter"

export const metadata: Metadata = {
  title: "About PG Closets | Official Renin Dealer Ottawa",
  description:
    "Learn about PG Closets, Ottawa's trusted Renin dealer specializing in premium door systems and professional installation. Family-owned business serving Ottawa since 2010.",
  keywords:
    "about PG Closets, Renin dealer Ottawa, family business Ottawa, door installation company, Ottawa closet company history",
  openGraph: {
    title: "About PG Closets | Official Renin Dealer Ottawa",
    description:
      "Learn about PG Closets, Ottawa's trusted Renin dealer specializing in premium door systems and professional installation.",
    images: [{ url: "/og-about.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pg-offwhite">
      <PgHeader />

      {/* Hero Section */}
      <section className="section-padding-lg bg-gradient-to-br from-pg-offwhite to-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="headline-large text-4xl md:text-6xl text-pg-dark mb-6">Our Story</h1>
              <p className="text-xl text-pg-gray mb-8">
                Family-owned and Ottawa-operated since 2010, PG Closets has been transforming homes across the region
                with premium Renin door systems and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Get Free Consultation
                </a>
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors text-center"
                >
                  Browse Products
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/arcat/renin_205745_Bypass_Closet_Doors_Savona_2_Panel_Arched_Design.jpg"
                  alt="Premium Renin closet doors installed in Ottawa home"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pg-navy mb-1">500+</div>
                  <div className="text-sm text-pg-gray">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-pg-gray leading-relaxed mb-8">
                What started as a small family business has grown into Ottawa's most trusted name in premium door
                systems. As an official Renin dealer, we combine the quality and innovation of Canada's leading door
                manufacturer with the personal touch and local expertise that only a family business can provide.
              </p>
              <p className="text-lg text-pg-gray leading-relaxed mb-8">
                Our commitment to excellence has earned us the trust of over 500 Ottawa families, and we're proud to
                maintain a 98% customer satisfaction rating. Every project, from a simple barn door to a complete closet
                system, receives the same attention to detail and dedication to quality that has defined our business
                from day one.
              </p>
              <p className="text-lg text-pg-gray leading-relaxed">
                Today, we continue to grow while staying true to our founding principles: transparent pricing, quality
                products, professional installation, and exceptional customer service. When you choose PG Closets,
                you're not just getting a door system – you're joining a family of satisfied customers who trust us with
                their homes.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/arcat/renin_205744_Bypass_Closet_Doors_Galloway_4_Panel_Design.jpg"
                    alt="Galloway 4-Panel Design closet doors"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/arcat/renin_205747_Bifold_Closet_Door_Euro_3_Lite.jpg"
                    alt="Euro 3-Lite bifold closet doors"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/arcat/renin_205733_Mix_Match_Hardware_Crochet_Multi_X_Design.jpg"
                    alt="Crochet Multi-X Design barn door"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/images/arcat/renin_205740_Bypass_Closet_Doors_Euro_5_Lite.jpg"
                    alt="Euro 5-Lite bypass closet doors"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-pg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="headline-large text-3xl md:text-4xl text-pg-dark mb-4">What Drives Us</h2>
            <p className="text-lg text-pg-gray max-w-2xl mx-auto">
              Our mission is simple: to provide Ottawa homeowners with premium door solutions that enhance both function
              and beauty in their homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-apple p-8 text-center">
              <div className="w-16 h-16 bg-pg-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-pg-dark mb-4">Quality First</h3>
              <p className="text-pg-gray">
                We partner exclusively with Renin, Canada's premier door manufacturer, to ensure every product meets the
                highest standards.
              </p>
            </div>

            <div className="card-apple p-8 text-center">
              <div className="w-16 h-16 bg-pg-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-pg-dark mb-4">Personal Service</h3>
              <p className="text-pg-gray">
                As a family business, we treat every customer like family, providing personalized attention and care
                throughout your project.
              </p>
            </div>

            <div className="card-apple p-8 text-center">
              <div className="w-16 h-16 bg-pg-sky/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-pg-dark mb-4">Local Focus</h3>
              <p className="text-pg-gray">
                We're proud to call Ottawa home and are committed to serving our community with integrity and
                excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="headline-large text-3xl md:text-4xl text-pg-dark mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-pg-gray mb-8">
            Experience the PG Closets difference for yourself. Let's create something beautiful for your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/configurator"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Start Your Project
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <PgFooter />
    </div>
  )
}
