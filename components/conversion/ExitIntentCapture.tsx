"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Clock, Star, Gift, Phone, Calendar } from "lucide-react"

interface ExitIntentCaptureProps {
  onClose: () => void
  onConvert: (data: { name: string; email: string; phone: string }) => void
}

export function ExitIntentCapture({ onClose, onConvert }: ExitIntentCaptureProps) {
  const [step, setStep] = useState<'offer' | 'form'>('offer')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConvert(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <Card className="max-w-2xl w-full bg-white shadow-2xl animate-in slide-in-from-top duration-500">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {step === 'offer' ? (
            <CardContent className="p-8">
              {/* Urgency Header */}
              <div className="text-center mb-6">
                <div className="bg-red-500 text-white px-4 py-2 rounded-full inline-block mb-4 animate-pulse">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Wait! This offer expires in {formatTime(timeLeft)}
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Don't Miss Out on $500 FREE Installation!
                </h2>
                <p className="text-gray-600 text-lg">
                  Before you go... get your FREE quote + installation bonus
                </p>
              </div>

              {/* Offer Details */}
              <div className="bg-gradient-to-br from-red-50 to-amber-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-600 mb-3">
                    EXCLUSIVE EXIT OFFER
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">$500 OFF</div>
                  <div className="text-lg text-gray-700 mb-4">Professional Installation</div>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-2" />
                      <span>Free design consultation ($150 value)</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-2" />
                      <span>Same-day quote response</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-2" />
                      <span>Lifetime hardware warranty</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 mr-2" />
                      <span>No obligation quote</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Proof */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="text-center text-sm text-blue-800">
                  <div className="font-semibold mb-2">🎉 Recent Exit Offer Winners:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>• Sarah K. - Kanata (saved $500)</div>
                    <div>• Mike R. - Orleans (saved $500)</div>
                    <div>• Lisa M. - Nepean (saved $500)</div>
                    <div>• David L. - Barrhaven (saved $500)</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={() => setStep('form')}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  🔥 YES! I Want $500 OFF My Installation
                </Button>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-500 text-green-700 hover:bg-green-50 py-3"
                    href="tel:613-729-7400"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call (613) 729-7400
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                  >
                    No Thanks, I'll Pay Full Price
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="text-center mt-6 text-xs text-gray-500">
                ⭐ 500+ Ottawa installations • ⭐ 5.0 Google rating • ⭐ Licensed & insured
              </div>
            </CardContent>
          ) : (
            <CardContent className="p-8">
              {/* Form Header */}
              <div className="text-center mb-6">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full inline-block mb-4">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Expires in {formatTime(timeLeft)}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Your $500 Installation Bonus
                </h3>
                <p className="text-gray-600">
                  We'll send your instant quote + bonus details within 30 minutes
                </p>
              </div>

              {/* Quick Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="(613) 555-0123"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 text-lg font-bold shadow-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Get My $500 Bonus + Instant Quote
                </Button>
              </form>

              {/* Security & Privacy */}
              <div className="mt-6 text-center">
                <div className="text-xs text-gray-500 mb-3">
                  🔒 Your information is secure and will never be shared
                </div>
                <div className="text-xs text-green-600 font-medium">
                  ✓ 30-minute response guarantee • ✓ No spam promise • ✓ Unsubscribe anytime
                </div>
              </div>
            </CardContent>
          )}
        </div>
      </Card>
    </div>
  )
}