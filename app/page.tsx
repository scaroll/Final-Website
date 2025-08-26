import Image from "next/image"
import ClientHomePage from "./ClientHomePage"

// ISR: Revalidate every 24 hours for homepage
export const revalidate = 86400

export default function Home() {
  // Pre-fetch products data at build time for ISR
  const products = [
    {
      name: "Continental",
      price: 459,
      image: "/images/arcat/renin_176732_hd.jpg",
      specs: "Premium engineered wood core, durable laminate surface",
    },
    {
      name: "Provincial",
      price: 549,
      image: "/images/arcat/renin_205750_hd.jpg",
      specs: "Traditional styling, heavy-duty pivot hinges",
    },
    {
      name: "Gatsby",
      price: 799,
      image: "/images/arcat/renin_205729_hd.jpg",
      specs: "Modern barn door design, premium hardware included",
    },
    {
      name: "Euro",
      price: 899,
      image: "/images/arcat/renin_199063_hd.jpg",
      specs: "Contemporary European styling, soft-close mechanism",
    },
  ]

  return <ClientHomePage products={products} />
}
