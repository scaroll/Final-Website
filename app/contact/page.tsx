import ContactClientPage from "./ContactClientPage"

export const metadata = {
  title: "Contact Ottawa Design Atelier - Request Consultation",
  description: "Submit a consultation request or contact us directly for your design project needs.",
}

// ISR: Revalidate daily for contact page
export const revalidate = 86400

export default function Contact() {
  return <ContactClientPage />
}
