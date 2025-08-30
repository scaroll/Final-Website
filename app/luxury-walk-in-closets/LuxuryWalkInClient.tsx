"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Award, Sparkles, ArrowRight, Phone, Calendar, Crown } from "lucide-react"

interface LuxuryPackage {
  id: string
  name: string
  price: string
  originalPrice?: string
  description: string
  features: string[]
  includes: string[]
  timeline: string
  badge?: string
  popular?: boolean
  premium?: boolean
}

const luxuryPackages: LuxuryPackage[] = [
  {
    id: 'signature',
    name: 'Signature Luxury',
    price: '$15,000 - $25,000',
    originalPrice: '$18,000 - $30,000',
    description: 'Complete luxury walk-in closet transformation with premium finishes and custom lighting',
    badge: 'MOST POPULAR',
    popular: true,
    features: [
      'Custom 3D design consultation',
      'Premium solid wood shelving',
      'Luxury LED lighting system',
      'Custom island with drawers',
      'Premium hardware and accessories',
      'Professional installation'
    ],
    includes: [
      'Free design consultation',
      '3D renderings and walkthrough',
      'Premium materials upgrade',
      'Custom lighting design',
      '2-year warranty',
      'White-glove installation'
    ],
    timeline: '2-3 weeks from design approval'
  },
  {
    id: 'presidential',
    name: 'Presidential Suite',
    price: '$25,000 - $45,000',
    description: 'Ultra-luxury walk-in closet with designer finishes and smart home integration',
    badge: 'PREMIUM',
    premium: true,
    features: [
      'Celebrity-level custom design',
      'Exotic wood and metal finishes',
      'Smart home integration',
      'Motorized components',
      'Custom seating area',
      'Wine/accessories storage'
    ],
    includes: [
      'Interior designer consultation',
      'Smart home integration',
      'Premium exotic materials',
      'Motorized features',
      '5-year warranty',
      'Concierge installation service'
    ],
    timeline: '3-4 weeks + smart integration'
  },
  {
    id: 'boutique',
    name: 'Boutique Collection',
    price: '$8,000 - $15,000',
    description: 'Elegant walk-in closet makeover with quality finishes and thoughtful organization',
    features: [
      'Professional design consultation',
      'Quality engineered wood',
      'LED strip lighting',
      'Custom organization solutions',
      'Quality hardware',
      'Expert installation'
    ],
    includes: [
      'Design consultation',
      '2D design drawings',
      'Quality materials',
      'Basic lighting upgrade',
      '1-year warranty',
      'Professional installation'
    ],
    timeline: '1-2 weeks from approval'
  }
]

const portfolioProjects = [
  {
    title: 'Westboro Penthouse',
    size: '180 sq ft',
    value: '$32,000',
    image: '/images/luxury-portfolio-1.jpg',
    description: 'Ultra-luxury master closet with island, chandelier, and custom millwork'
  },
  {
    title: 'Rockcliffe Mansion', 
    size: '220 sq ft',
    value: '$41,000',
    image: '/images/luxury-portfolio-2.jpg',
    description: 'Presidential suite closet with smart glass, motorized features, and wine storage'
  },
  {
    title: 'Glebe Heritage Home',
    size: '160 sq ft', 
    value: '$28,000',
    image: '/images/luxury-portfolio-3.jpg',
    description: 'Classic luxury design with custom cabinetry and designer lighting'
  }
]

export function LuxuryWalkInClient() {
  const [selectedPackage, setSelectedPackage] = useState<string>('signature')
  const [showConsultation, setShowConsultation] = useState(false)

  useEffect(() => {
    // Conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: 'Luxury Walk-In Closets',
        page_location: window.location.href,
        content_group1: 'Luxury Services'
      })
    }
  }, [])

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    // Track package interest
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'package_interest', {
        event_category: 'luxury_closets',
        event_label: packageId,
        value: 1
      })
    }
  }

  const handleConsultationRequest = () => {
    setShowConsultation(true)
    // Track consultation request
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'consultation_request', {
        event_category: 'luxury_closets',
        event_label: selectedPackage,
        value: 1
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Luxury & Conversion Optimized */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-300/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2 text-sm font-medium">
                <Crown className="w-4 h-4 mr-2" />
                EXCLUSIVE LUXURY RENOVATIONS
              </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Space Into a
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent block">
                Designer Showcase
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
              Luxury walk-in closet renovations crafted by Ottawa's premier designers. 
              From concept to completion, we create spaces that inspire.
            </p>
            
            {/* Social Proof & Urgency */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-slate-300">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-amber-400 mr-2" />
                <span>27 Five-Star Projects This Year</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 text-amber-400 mr-2" />
                <span>Featured in Ottawa Home & Design</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 text-amber-400 mr-2" />
                <span>$10M+ in Luxury Renovations</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-300"
                onClick={handleConsultationRequest}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Free Luxury Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (613) 729-7400
              </Button>
            </div>
            
            {/* Urgency & Scarcity - Enhanced */}
            <div className="mt-8 p-6 bg-gradient-to-r from-red-600/20 to-amber-500/20 border border-amber-500/50 rounded-xl max-w-lg mx-auto backdrop-blur-sm">
              <div className="text-center">
                <div className="text-amber-300 font-bold text-lg mb-2 animate-pulse">⚡ DECEMBER SPECIAL ENDING SOON</div>
                <div className="text-red-300 font-semibold text-xl mb-2">Save up to $5,000 + Free Smart Integration</div>
                <div className="text-amber-200 text-sm font-medium mb-3">Only 2 luxury slots remaining this month</div>
                <div className="flex justify-center items-center space-x-4 text-xs text-amber-100">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                    Mrs. Chen - Westboro (booked)
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                    Mr. Walsh - Rockcliffe (booked)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Recent Luxury Projects
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From penthouse suites to heritage homes, we've transformed walk-in closets 
              across Ottawa's most prestigious neighborhoods.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-200 to-slate-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-slate-400" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-500 text-white">${project.value}</Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      View Details
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{project.size}</span>
                    <span className="font-semibold text-amber-600">{project.value}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">
              Luxury Renovation Packages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from our curated luxury packages, each designed to deliver exceptional 
              results with premium materials and craftsmanship.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {luxuryPackages.map((pkg) => (
              <Card 
                key={pkg.id} 
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer ${
                  selectedPackage === pkg.id 
                    ? 'ring-2 ring-amber-500 shadow-2xl scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                } ${
                  pkg.popular 
                    ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-white' 
                    : pkg.premium 
                    ? 'border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 text-white' 
                    : 'border-slate-200'
                }`}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.badge && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className={`${
                      pkg.popular 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-slate-900 text-white'
                    } px-4 py-1 rounded-full font-bold`}>
                      {pkg.badge}
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8 pt-12">
                  <div className="text-center mb-8">
                    <h3 className={`text-2xl font-bold mb-2 ${
                      pkg.premium ? 'text-white' : 'text-slate-900'
                    }`}>
                      {pkg.name}
                    </h3>
                    <div className="mb-4">
                      <div className={`text-3xl font-bold ${
                        pkg.premium ? 'text-amber-400' : 'text-amber-600'
                      }`}>
                        {pkg.price}
                      </div>
                      {pkg.originalPrice && (
                        <div className={`text-lg line-through ${
                          pkg.premium ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {pkg.originalPrice}
                        </div>
                      )}
                    </div>
                    <p className={`${
                      pkg.premium ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {pkg.description}
                    </p>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className={`font-semibold mb-3 ${
                        pkg.premium ? 'text-white' : 'text-slate-900'
                      }`}>
                        Features:
                      </h4>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                              pkg.premium ? 'text-amber-400' : 'text-amber-600'
                            }`} />
                            <span className={`text-sm ${
                              pkg.premium ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className={`font-semibold mb-3 ${
                        pkg.premium ? 'text-white' : 'text-slate-900'
                      }`}>
                        Includes:
                      </h4>
                      <ul className="space-y-2">
                        {pkg.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Sparkles className={`w-4 h-4 mr-2 mt-1 flex-shrink-0 ${
                              pkg.premium ? 'text-amber-400' : 'text-amber-600'
                            }`} />
                            <span className={`text-sm ${
                              pkg.premium ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`text-sm ${
                      pkg.premium ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      <strong>Timeline:</strong> {pkg.timeline}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full mt-8 ${
                      selectedPackage === pkg.id
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : pkg.premium
                        ? 'bg-white text-slate-900 hover:bg-slate-100'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                    onClick={handleConsultationRequest}
                  >
                    Select This Package
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our Luxury Design Process
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From initial consultation to final reveal, experience our 
              white-glove service at every step.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Luxury Consultation',
                description: 'In-home consultation with our senior designer to understand your vision and lifestyle needs.'
              },
              {
                step: '02', 
                title: '3D Design & Planning',
                description: 'Detailed 3D renderings and material selection with our interior design team.'
              },
              {
                step: '03',
                title: 'Premium Fabrication', 
                description: 'Custom millwork and fabrication using the finest materials and craftsmanship.'
              },
              {
                step: '04',
                title: 'White-Glove Install',
                description: 'Professional installation with final styling and organization consultation.'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-2xl font-bold text-slate-900 mx-auto mb-6">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold mb-4">{process.title}</h3>
                <p className="text-slate-300">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced with Premium Psychology */}
      <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/5"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Crown className="w-16 h-16 text-white/80 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Ready to Join Ottawa's Elite?
          </h2>
          <div className="text-lg text-amber-100 mb-2 font-medium">
            🏆 Featured in Ottawa Home & Design Magazine
          </div>
          <p className="text-xl text-amber-100 mb-8">
            Book your complimentary luxury consultation today.<br/>
            <span className="font-bold text-white">Only 2 December slots remain.</span>
          </p>
          
          {/* Social Proof Before CTA */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-2xl mx-auto">
            <div className="text-white text-sm mb-3 font-medium">Recent Luxury Closet Clients:</div>
            <div className="grid grid-cols-2 gap-4 text-amber-100 text-xs">
              <div>• Westboro Penthouse - $32K</div>
              <div>• Rockcliffe Estate - $41K</div>
              <div>• Glebe Heritage - $28K</div>
              <div>• Kanata Executive - $35K</div>
            </div>
            <div className="text-white text-sm font-semibold mt-3">Average project value: $34,000</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-amber-500/25 transition-all transform hover:scale-105"
              onClick={handleConsultationRequest}
            >
              <Calendar className="w-5 h-5 mr-2" />
              🔥 Book My Luxury Consultation
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-4 text-lg font-semibold rounded-xl backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call VIP Line: (613) 729-7400
            </Button>
          </div>
          
          {/* Enhanced Guarantees */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-2xl mx-auto">
            <div className="text-white text-sm font-semibold mb-2">🛡️ VIP Client Guarantees:</div>
            <div className="grid md:grid-cols-3 gap-4 text-amber-100 text-xs">
              <div>✓ 100% Satisfaction Promise</div>
              <div>✓ 5-Year Premium Warranty</div>
              <div>✓ White-Glove Installation</div>
              <div>✓ Free Design Revisions</div>
              <div>✓ Executive Project Manager</div>
              <div>✓ Luxury Materials Guarantee</div>
            </div>
          </div>
          
          {/* Urgency Timer */}
          <div className="mt-6 text-amber-200 text-sm animate-pulse">
            ⏰ December pricing expires in 8 days
          </div>
        </div>
      </section>

      {/* Consultation Modal/Form would go here */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Schedule Your Consultation</h3>
            <p className="text-slate-600 mb-6">
              Our luxury design team will contact you within 24 hours to schedule 
              your complimentary in-home consultation.
            </p>
            {/* Form would integrate with Jobber here */}
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full p-3 border rounded-lg"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full p-3 border rounded-lg"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option value="">Select Package Interest</option>
                <option value="boutique">Boutique Collection ($8K-$15K)</option>
                <option value="signature">Signature Luxury ($15K-$25K)</option>
                <option value="presidential">Presidential Suite ($25K+)</option>
              </select>
              <textarea 
                placeholder="Tell us about your project vision..."
                className="w-full p-3 border rounded-lg h-24 resize-none"
              />
              <div className="flex gap-3">
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600">
                  Request Consultation
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowConsultation(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}