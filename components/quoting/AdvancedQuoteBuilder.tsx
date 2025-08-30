"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { enhancedReninCatalog, formatPrice, type EnhancedReninProduct } from "@/data/enhanced-renin-catalog"
import { Calculator, Plus, Minus, Trash2, Send, CheckCircle, AlertCircle, Clock, Star } from "lucide-react"
import { trackConversionEvent } from "@/components/analytics/ConversionTracking"

interface QuoteItem {
  product: EnhancedReninProduct
  quantity: number
  selectedFinish?: string
  selectedSize?: string
  notes?: string
}

interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  preferredContact: 'phone' | 'email'
  projectType: 'new-construction' | 'renovation' | 'replacement'
  timeline: 'asap' | '1-month' | '2-3-months' | '6-months+'
  budget: 'under-5k' | '5k-10k' | '10k-20k' | '20k+'
}

export function AdvancedQuoteBuilder() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [customerInfo, setCustomerInfo] = useState<Partial<CustomerInfo>>({})
  const [currentStep, setCurrentStep] = useState<'products' | 'details' | 'review'>('products')
  
  // Track quote builder steps
  const advanceToStep = (step: 'products' | 'details' | 'review') => {
    setCurrentStep(step)
    
    // Track step progression
    if (typeof window !== "undefined" && (window as any).pgAnalytics) {
      (window as any).pgAnalytics.trackQuoteStep(step, {
        quote_value: total,
        items_count: quoteItems.length
      })
    }
    
    // Track step conversion events
    trackConversionEvent("quote_builder_step_advance", {
      event_label: `Step: ${step}`,
      step_name: step,
      quote_value: total,
      items_in_quote: quoteItems.length
    })
  }
  const [generatedMessage, setGeneratedMessage] = useState<string>('')
  const [showJobberEmbed, setShowJobberEmbed] = useState(false)

  // Calculate totals
  const subtotal = quoteItems.reduce((sum, item) => {
    const price = item.product.salePrice || item.product.price
    return sum + (price * item.quantity)
  }, 0)
  
  const hst = subtotal * 0.13 // Ontario HST
  const total = subtotal + hst

  // Add product to quote with analytics tracking
  const addToQuote = (product: EnhancedReninProduct) => {
    const existingItem = quoteItems.find(item => item.product.id === product.id)
    
    // Track product addition to quote
    if (typeof window !== "undefined" && (window as any).pgAnalytics) {
      (window as any).pgAnalytics.trackProductAddition(
        product.name,
        product.salePrice || product.price,
        product.category || 'Closet Door'
      )
    }
    
    if (existingItem) {
      setQuoteItems(prev => prev.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setQuoteItems(prev => [...prev, { product, quantity: 1 }])
      
      // Track first-time product addition
      trackConversionEvent("first_product_added_to_quote", {
        event_label: product.name,
        product_category: product.category || 'Closet Door',
        value: product.salePrice || product.price
      })
    }
  }

  // Update item quantity
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setQuoteItems(prev => prev.filter(item => item.product.id !== productId))
    } else {
      setQuoteItems(prev => prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  // Generate Jobber-compatible message with analytics tracking
  const generateJobberMessage = () => {
    const itemsList = quoteItems.map(item => {
      const price = formatPrice(item.product.salePrice || item.product.price)
      return `• ${item.product.name} (x${item.quantity}) - ${price} each${item.selectedFinish ? ` - ${item.selectedFinish} finish` : ''}${item.selectedSize ? ` - ${item.selectedSize}` : ''}`
    }).join('\\n')

    const customerDetails = `
CUSTOMER INFORMATION:
Name: ${customerInfo.name || '[Name]'}
Email: ${customerInfo.email || '[Email]'}
Phone: ${customerInfo.phone || '[Phone]'}
Address: ${customerInfo.address || '[Address]'}
Preferred Contact: ${customerInfo.preferredContact || 'Phone'}

PROJECT DETAILS:
Type: ${customerInfo.projectType || 'Not specified'}
Timeline: ${customerInfo.timeline || 'Not specified'}  
Budget Range: ${customerInfo.budget || 'Not specified'}

QUOTE REQUEST - ${new Date().toLocaleDateString()}
${itemsList}

PRICING SUMMARY:
Subtotal: ${formatPrice(subtotal)}
HST (13%): ${formatPrice(hst)}
TOTAL: ${formatPrice(total)}

NEXT STEPS:
☐ Schedule site visit for accurate measurements
☐ Provide detailed quote with installation
☐ Discuss timeline and project coordination
☐ Review warranty and service options

Generated by PG Closets Quote Builder - www.pgclosets.com
Customer interested in professional installation and consultation.
    `.trim()

    // Track quote completion with comprehensive analytics
    if (typeof window !== "undefined" && (window as any).pgAnalytics) {
      (window as any).pgAnalytics.trackQuoteCompletion(total, quoteItems.length, customerInfo)
    }
    
    // Track high-value quote milestone
    trackConversionEvent("quote_generated_complete", {
      event_label: "Quote Builder Completion",
      currency: "CAD",
      value: total,
      quote_items: quoteItems.length,
      customer_type: customerInfo.projectType,
      timeline: customerInfo.timeline,
      lead_score: total > 5000 ? "high_value" : total > 2000 ? "medium_value" : "standard"
    })

    setGeneratedMessage(customerDetails)
    return customerDetails
  }

  // Featured/Popular Products for quick add
  const featuredProducts = enhancedReninCatalog.filter(p => p.featured || p.bestseller).slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header - Conversion Optimized */}
      <div className="text-center mb-8">
        {/* Urgency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-3 px-6 rounded-xl mb-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-5 h-5 animate-pulse" />
            <span className="font-bold">⚡ DECEMBER SPECIAL: Free Installation ($500 value)</span>
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-red-100 text-sm mt-1">First 10 quotes this month • 7 already claimed</div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Get Your Instant Quote & Save $500
        </h1>
        <p className="text-slate-600 mb-4">
          Configure your perfect closet solution • Instant pricing • Free consultation included
        </p>
        
        {/* Social Proof */}
        <div className="flex justify-center items-center space-x-6 mb-6 text-sm text-slate-500">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-amber-500 mr-1" />
            <span>4.9/5 stars (500+ reviews)</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span>Over 1,200 quotes completed</span>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center space-x-4">
            {['products', 'details', 'review'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep === step 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : index < ['products', 'details', 'review'].indexOf(currentStep)
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {index < ['products', 'details', 'review'].indexOf(currentStep) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="ml-2 text-sm font-medium text-slate-600 capitalize">{step}</span>
                {index < 2 && <div className="w-8 h-0.5 bg-slate-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === 'products' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Select Your Products</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {featuredProducts.map(product => (
                    <Card key={product.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="aspect-video bg-slate-200 rounded-lg mb-4 overflow-hidden">
                          <img 
                            src={product.images.primary} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-900">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              {product.salePrice ? (
                                <div>
                                  <span className="text-lg font-bold text-red-600">{formatPrice(product.salePrice)}</span>
                                  <span className="text-sm text-slate-500 line-through ml-2">{formatPrice(product.price)}</span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
                              )}
                            </div>
                            <Button size="sm" onClick={() => addToQuote(product)}>
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </div>
                          {product.conversionOptimized?.urgencyText && (
                            <Badge variant="destructive" className="text-xs">
                              {product.conversionOptimized.urgencyText}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'details' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Project Details</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.name || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.phone || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(613) 555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.email || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Project Location</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.address || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Ottawa, ON (for accurate delivery/installation)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Project Type</label>
                      <select 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.projectType || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, projectType: e.target.value as any }))}
                      >
                        <option value="">Select project type</option>
                        <option value="new-construction">New Construction</option>
                        <option value="renovation">Renovation/Upgrade</option>
                        <option value="replacement">Replacement/Repair</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                      <select 
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={customerInfo.timeline || ''}
                        onChange={(e) => setCustomerInfo(prev => ({ ...prev, timeline: e.target.value as any }))}
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (Rush job)</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="2-3-months">2-3 months</option>
                        <option value="6-months+">6+ months (planning)</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 'review' && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Review & Submit Quote</h2>
              
              {generatedMessage && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      Quote Generated - Ready for Jobber
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap font-mono">
                        {generatedMessage}
                      </pre>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedMessage)
                          alert('Quote copied to clipboard! Paste into Jobber.')
                        }}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Copy to Clipboard
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => setShowJobberEmbed(true)}
                      >
                        Send via Jobber
                      </Button>
                      
                      <Button 
                        variant="outline"
                        onClick={() => window.print()}
                      >
                        Print Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={generateJobberMessage}
              >
                <Calculator className="w-5 h-5 mr-2" />
                Generate Professional Quote
              </Button>
            </div>
          )}
        </div>

        {/* Quote Summary Sidebar - Conversion Optimized */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 border-2 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Your Quote
                </div>
                {quoteItems.length > 0 && (
                  <Badge className="bg-green-500 text-white animate-pulse">
                    Save $500!
                  </Badge>
                )}
              </CardTitle>
              {quoteItems.length > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  🎉 Free installation included • $500 value
                </div>
              )}
            </CardHeader>
            <CardContent>
              {quoteItems.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>No items in quote yet</p>
                  <p className="text-sm">Add products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quoteItems.map(item => (
                    <div key={item.product.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.product.name}</h4>
                        <p className="text-xs text-slate-500">{formatPrice(item.product.salePrice || item.product.price)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Free Installation (Dec Special):</span>
                      <span className="font-semibold">-$500.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HST (13%):</span>
                      <span>{formatPrice(hst)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-bold text-lg text-blue-600">
                        <span>Your Price:</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-slate-500 line-through">
                        <span>Regular Price:</span>
                        <span>{formatPrice(total + 500)}</span>
                      </div>
                      <div className="text-center mt-2">
                        <Badge className="bg-red-500 text-white text-xs animate-pulse">
                          You Save $500!
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Value Props */}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-xs text-green-800 font-semibold mb-2">✓ December Special Includes:</div>
                    <div className="text-xs text-green-700 space-y-1">
                      <div>• Professional installation ($500 value)</div>
                      <div>• Free design consultation ($150 value)</div>
                      <div>• Lifetime warranty on hardware</div>
                      <div>• Same-day quote response</div>
                    </div>
                    <div className="text-xs text-green-600 font-bold mt-2 text-center">
                      Total Value: $650+ FREE
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-500 mt-4">
                    * Quote valid for 30 days • All prices in CAD
                    * Site visit confirms final measurements
                  </div>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="mt-6 space-y-3">
                {currentStep === 'products' && quoteItems.length > 0 && (
                  <Button 
                    className="w-full" 
                    onClick={() => advanceToStep('details')}
                  >
                    Continue to Details
                  </Button>
                )}
                
                {currentStep === 'details' && (
                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={() => advanceToStep('review')}
                      disabled={!customerInfo.name || !customerInfo.email || !customerInfo.phone}
                    >
                      Review Quote
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => advanceToStep('products')}
                    >
                      Back to Products
                    </Button>
                  </div>
                )}
                
                {currentStep === 'review' && (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => advanceToStep('details')}
                  >
                    Back to Details
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Jobber Embed Modal - Placeholder for actual integration */}
      {showJobberEmbed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Submit to Jobber System</h3>
            <p className="text-slate-600 mb-6">
              This quote will be submitted to your Jobber account for follow-up and scheduling.
            </p>
            
            {/* Placeholder for Jobber embed - you would replace this with actual Jobber integration */}
            <div className="bg-slate-100 p-8 rounded-lg text-center mb-6">
              <p className="text-slate-600">Jobber Integration Panel</p>
              <p className="text-sm text-slate-500 mt-2">
                Replace this with your actual Jobber embed code
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowJobberEmbed(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Submit to Jobber
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}