import { notFound } from "next/navigation"
import { reninProducts } from "../../../data/renin-products"
import { ProductJSONLD } from "../../../lib/seo"

export const dynamic = "force-static"
// ISR: Revalidate every 6 hours for product detail pages
export const revalidate = 21600

export function generateStaticParams() {
  return reninProducts.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = reninProducts.find((product) => product.id === params.slug)
  if (!p) return { title: "Product Not Found | PG Closets Design Atelier" }
  const title = `${p.name} | Signature Collection | PG Closets Ottawa Design Atelier`
  const description = `Bespoke ${p.category} from Ottawa's premier design atelier. ${p.features.join(", ")}. From $${p.price} CAD with master craftsman installation.`
  return {
    title,
    description,
    openGraph: { title, description, type: "website", locale: "en_CA" },
  }
}

export default function PDP({ params }: { params: { slug: string } }) {
  const p = reninProducts.find((product) => product.id === params.slug)
  if (!p) return notFound()

  const priceText = `From $${p.price.toLocaleString()} CAD`
  const related = reninProducts.filter((product) => product.category === p.category && product.id !== p.id).slice(0, 3)

  return (
    <main className="section-apple">
      <div className="container-apple">
        <ProductJSONLD product={{ title: p.name, priceMin: p.price, priceMax: p.price }} />

        <section className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Image block with exact specifications: white card, sky border, 16px radius, min-height requirements */}
          <div className="card-apple p-0 overflow-hidden min-h-[320px] lg:min-h-[480px]">
            <img
              src={
                p.image ||
                `/placeholder.svg?height=900&width=1200&query=${encodeURIComponent(p.name + " closet door") || "/placeholder.svg"}`
              }
              alt={`${p.name} - PG Closets Ottawa`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content column with exact spacing and typography specifications */}
          <div className="space-y-6">
            {/* Title H1 with exact 32-40px size in navy */}
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500 font-light mb-4">Quality Collection</div>
              <h1 className="text-4xl lg:text-5xl font-extralight mb-4 text-slate-900 tracking-tight">
                {p.name}
              </h1>
              <div className="text-sm text-slate-600 font-light uppercase tracking-wider mb-6">
                {p.category} {p.category !== "hardware" ? "Design" : ""}
              </div>
              <div className="text-2xl font-light text-slate-900 mb-8">
                {priceText}
              </div>
            </div>

            {/* CTA row with exact 24px spacing from price */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="bg-slate-900 text-white px-8 py-3.5 font-light text-sm tracking-wide hover:bg-slate-800 transition-all duration-300">
                Get Free Quote
              </a>
              <a href="/contact" className="border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 px-8 py-3.5 font-light text-sm tracking-wide transition-all duration-300 text-center">
                Professional Installation
              </a>
            </div>

            {/* Two panels side-by-side with exact 32px spacing from CTA row */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              <div className="card-apple p-6">
                <h2 className="text-h3 mb-3">Overview</h2>
                <p className="text-body-s text-pg-dark" style={{ opacity: 0.8 }}>
                  Quality {p.category} system with smooth hardware and beautiful finishes. Professional installation
                  in Ottawa with 2‑year workmanship warranty.
                </p>
              </div>
              <div className="card-apple p-6">
                <h2 className="text-h3 mb-3">What's Included</h2>
                <ul className="text-body-s text-pg-dark space-y-1" style={{ opacity: 0.8 }}>
                  <li>• Quality track & soft‑close hardware</li>
                  <li>• Professional installation (Ottawa)</li>
                  <li>• Removal/disposal of old doors</li>
                  <li>• 2‑year workmanship warranty</li>
                </ul>
              </div>
            </div>

            <div className="card-apple p-6">
              <h3 className="text-h3 mb-4">Features</h3>
              <ul className="text-body-s text-pg-dark space-y-2" style={{ opacity: 0.8 }}>
                {p.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related products with exact 48px spacing from section edge and H2 24-28px */}
        {related.length > 0 && (
          <section className="pt-12">
            <h2 className="text-h2 mb-8" style={{ fontSize: "28px" }}>
              More {p.category} Options
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <a key={r.id} href={`/products/${r.id}`} className="card-apple overflow-hidden group">
                  {/* Small height image (160px) as specified for related products */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={
                        r.image ||
                        `/placeholder.svg?height=160&width=240&query=${encodeURIComponent(r.name + " closet door") || "/placeholder.svg"}`
                      }
                      alt={`${r.name} - PG Closets Ottawa`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-micro text-pg-gray mb-1">{r.category.toUpperCase()}</div>
                    <h3 className="font-semibold text-lg text-pg-navy" style={{ fontSize: "18px", fontWeight: 600 }}>
                      {r.name}
                    </h3>
                    <div className="text-sm text-pg-dark mt-1">From ${r.price.toLocaleString()} CAD</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
