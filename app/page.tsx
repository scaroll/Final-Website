import ClientHomePage from "./ClientHomePage"

export const metadata = {
  title: "Ottawa's Renin Closet Door Experts | PG Closets | Official Dealer",
  description:
    "Official Renin dealer in Ottawa. Professional installation of sliding doors, bifold doors, barn doors & hardware. Transform your home with premium closet solutions.",
  keywords: "closet doors Ottawa, Renin dealer, barn doors, bifold doors, sliding doors, professional installation",
  openGraph: {
    title: "Ottawa's Renin Closet Door Experts | PG Closets",
    description: "Official Renin dealer • Professional installation • Transform your home",
    type: "website",
    locale: "en_CA",
  },
}

export default function Home() {
  return <ClientHomePage />
}
