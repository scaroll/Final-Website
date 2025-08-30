"use client"

import { useState } from 'react'
import { FAQSchema } from './structured-data'

// Ottawa-specific FAQ data optimized for local SEO
const ottawaClosetFAQs = [
  {
    question: "How much do closet doors cost in Ottawa?",
    answer: "Closet door prices in Ottawa range from $299-$1,115 CAD including installation. Barn doors typically cost $679-$1,049, bypass doors $459-$799, and bifold doors $299-$649. All prices include professional installation, hardware, and our lifetime warranty. We serve Ottawa, Kanata, Nepean, Orleans, and Barrhaven with transparent Canadian pricing."
  },
  {
    question: "Do you serve all Ottawa neighborhoods?",
    answer: "Yes, PG Closets serves all Ottawa neighborhoods including Kanata, Nepean, Orleans, Barrhaven, Gloucester, Westboro, The Glebe, Hintonburg, Vanier, and surrounding NCR areas. We offer free in-home consultations throughout Ottawa with same-day quotes and typically complete installations within 2 weeks."
  },
  {
    question: "Are you an official Renin dealer in Ottawa?",
    answer: "Yes, PG Closets is an official authorized Renin dealer in Ottawa. We carry the complete Renin catalog including Georgian, Euro, Twilight, Continental, and Heritage series doors. All products come with manufacturer warranties plus our additional lifetime installation warranty for complete peace of mind."
  },
  {
    question: "What's included with professional installation in Ottawa?",
    answer: "Our Ottawa installation service includes free measurement, door fitting, hardware installation, track mounting, safety testing, cleanup, and warranty registration. We handle all permits if required and work around your schedule. Installation typically takes 2-4 hours with minimal disruption to your home."
  },
  {
    question: "Do you offer financing for Ottawa customers?",
    answer: "Yes, we offer flexible financing options for Ottawa homeowners including 0% financing for 12 months and extended payment plans. We accept cash, credit cards, debit, Interac e-transfer, and offer senior discounts. Contact us for a customized payment plan that fits your budget."
  },
  {
    question: "How long does delivery take in Ottawa?",
    answer: "Most closet door orders in Ottawa are delivered and installed within 2 weeks. Rush orders can often be accommodated within 1 week for an additional fee. We stock popular styles locally and work directly with Renin's Canadian distribution network for fastest possible delivery to Ottawa customers."
  },
  {
    question: "Do you repair existing closet doors in Ottawa?",
    answer: "Yes, we repair and service existing closet doors throughout Ottawa. Common repairs include track adjustments, hardware replacement, door realignment, and glass panel replacement. We service all major brands and offer free diagnostic visits within Ottawa city limits."
  },
  {
    question: "What makes Ottawa homes unique for closet door installation?",
    answer: "Ottawa homes, particularly in areas like Kanata and Nepean, often feature larger master bedrooms and walk-in closets that benefit from barn doors or bypass systems. Older Ottawa homes in areas like The Glebe may have unique sizing requirements. We're familiar with Ottawa building codes and common home styles from executive estates to downtown condos."
  },
  {
    question: "Do you provide warranties on installation in Ottawa?",
    answer: "Absolutely. All PG Closets installations in Ottawa come with a lifetime warranty on workmanship plus full manufacturer warranties on Renin products. If any installation issue occurs, we return at no charge. We've been serving Ottawa since 2010 and stand behind every installation with responsive local service."
  },
  {
    question: "Can you install closet doors in condos and apartments in Ottawa?",
    answer: "Yes, we regularly install closet doors in Ottawa condos, apartments, and townhouses. We work with condo boards when required and understand Ottawa building regulations for multi-unit properties. Popular solutions for smaller spaces include bypass and bifold doors that maximize room space."
  }
]

// Service-specific FAQs
const serviceSpecificFAQs = {
  'barn-doors': [
    {
      question: "What barn door styles are most popular in Ottawa?",
      answer: "The most popular barn door styles in Ottawa are the Gatsby Chevron ($849), Sherwood InvisiGlide ($1,049), and Heritage Herringbone ($679). These modern designs complement both contemporary and traditional Ottawa home styles, especially in areas like Kanata Lakes and Bridlewood."
    },
    {
      question: "Do barn doors work in Ottawa's climate?",
      answer: "Yes, our Renin barn doors are engineered for Canadian climates including Ottawa's temperature variations. The premium materials resist warping, cracking, and humidity changes. We use climate-appropriate installation techniques and hardware designed for Canadian homes."
    }
  ],
  'bypass-doors': [
    {
      question: "Are bypass doors good for small Ottawa bedrooms?",
      answer: "Bypass doors are excellent for smaller Ottawa bedrooms, particularly in condos and townhouses in areas like Hintonburg and Vanier. They don't require swing space and can make rooms appear larger. Popular models include Euro 1-Lite ($459) and Twilight 1-Lite ($599)."
    }
  ],
  'bifold-doors': [
    {
      question: "What's the advantage of bifold doors for Ottawa closets?",
      answer: "Bifold doors provide full closet access while requiring minimal floor space - perfect for Ottawa's family homes in Barrhaven and Orleans. They're ideal for reach-in closets and laundry rooms. Our Georgian 6-Panel ($449) and Euro 3-Lite ($549) are popular choices."
    }
  ]
}

interface LocalFAQSectionProps {
  location?: string
  service?: string
  className?: string
}

export function LocalFAQSection({ location, service, className = '' }: LocalFAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  // Select appropriate FAQs based on service and location
  const faqs = service && serviceSpecificFAQs[service as keyof typeof serviceSpecificFAQs] 
    ? [...ottawaClosetFAQs, ...serviceSpecificFAQs[service as keyof typeof serviceSpecificFAQs]]
    : ottawaClosetFAQs

  // Customize FAQs for specific locations
  const locationCustomizedFAQs = faqs.map(faq => ({
    ...faq,
    answer: location && location !== 'ottawa' 
      ? faq.answer.replace(/Ottawa/g, `${location.charAt(0).toUpperCase() + location.slice(1)} and Ottawa`)
      : faq.answer
  }))

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className={`py-16 ${className}`}>
      <FAQSchema faqs={locationCustomizedFAQs} />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
            {location && location !== 'ottawa' 
              ? `Frequently Asked Questions - ${location.charAt(0).toUpperCase() + location.slice(1)} & Ottawa`
              : 'Frequently Asked Questions - Ottawa Area'
            }
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Get answers to common questions about our {service || 'closet door'} services in Ottawa and surrounding areas.
          </p>
        </div>

        <div className="space-y-4">
          {locationCustomizedFAQs.slice(0, 10).map((faq, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-medium text-slate-900 pr-4">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-5 h-5 transition-transform duration-200 ${
                  openIndex === index ? 'transform rotate-45' : ''
                }`}>
                  <svg className="w-full h-full text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-lg text-slate-600 mb-6">
            Still have questions? We're here to help with personalized advice for your {location || 'Ottawa'} home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-slate-900 text-white px-8 py-4 text-lg font-light tracking-wide hover:bg-slate-800 transition-all duration-300 inline-block"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+1-613-729-7400"
              className="border border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900 px-8 py-4 text-lg font-light tracking-wide transition-all duration-300 inline-block"
            >
              Call (613) 729-7400
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}