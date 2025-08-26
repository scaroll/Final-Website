import ContactClientPage from "./ContactClientPage"

export const metadata = {
  title: "Contact Us - Request Work",
  description: "Submit a work request or contact us directly for your project needs.",
}

// ISR: Revalidate daily for contact page
export const revalidate = 86400

export default function Contact() {
  return <ContactClientPage />
}
