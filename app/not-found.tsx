export default function NotFound() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-24">
      <h1 className="text-3xl md:text-4xl font-extrabold text-pg-navy">Page Not Found</h1>
      <p className="mt-2 text-pg-dark/80">Sorry, we can't find that page.</p>
      <a
        href="/products"
        className="mt-4 inline-block px-5 py-3 rounded-[12px] ring-1 ring-pg-sky text-pg-navy bg-white"
      >
        Back to Products
      </a>
    </main>
  )
}
