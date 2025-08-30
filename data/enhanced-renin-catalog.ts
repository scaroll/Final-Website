/**
 * COMPREHENSIVE RENIN PRODUCT CATALOG - PG CLOSETS
 * World-class conversion-optimized catalog with authentic Canadian pricing
 * Updated: August 2025
 */

export interface EnhancedReninProduct {
  id: string
  name: string
  slug: string
  category: 'barn-door' | 'bypass-door' | 'bifold-door' | 'hardware' | 'mirror' | 'accessory'
  subcategory: string
  price: number
  salePrice?: number
  images: {
    primary: string
    gallery: string[]
    hd?: string
  }
  description: string
  features: string[]
  specifications: {
    dimensions: string[]
    material: string
    finish: string[]
    weight?: string
    thickness?: string
    installation: string
  }
  installation: {
    time: string
    difficulty: 'Easy' | 'Moderate' | 'Professional Required'
    included: string[]
  }
  warranty: string
  inStock: boolean
  featured: boolean
  bestseller?: boolean
  new?: boolean
  conversionOptimized: {
    urgencyText?: string
    socialProof?: string
    guarantee?: string
  }
}

export const enhancedReninCatalog: EnhancedReninProduct[] = [
  // ==================== BARN DOORS - PREMIUM COLLECTION ====================
  {
    id: 'heritage-gladstone',
    name: 'Heritage Gladstone 2-Lite Angled Plank',
    slug: 'heritage-gladstone-2-lite-angled-plank',
    category: 'barn-door',
    subcategory: 'Heritage Collection',
    price: 1249,
    salePrice: 999,
    images: {
      primary: '/images/arcat/renin_192859_Heritage_Gladstone_2_Lite_Angled_Plank_Design.jpg',
      gallery: [
        '/images/arcat/renin_192859_Heritage_Gladstone_2_Lite_Angled_Plank_Design.jpg',
        '/images/arcat/renin_192859_hd.jpg'
      ],
      hd: '/images/arcat/renin_192859_hd.jpg'
    },
    description: 'Premium Heritage Gladstone barn door featuring elegant 2-lite angled plank design. Perfect for modern farmhouse and contemporary spaces. Professional installation included.',
    features: [
      '2-lite frosted glass inserts for natural light',
      'Angled plank design adds visual interest', 
      'Solid wood construction with premium finish',
      'Smooth sliding barn door hardware included',
      'Professional Ottawa installation service',
      'Lifetime hardware warranty'
    ],
    specifications: {
      dimensions: ['30"×80"', '32"×80"', '36"×80"', '42"×84"'],
      material: 'Solid Wood with Glass Inserts',
      finish: ['Natural Oak', 'White Wash', 'Dark Espresso', 'Grey Barn'],
      thickness: '1.75"',
      weight: '85-95 lbs',
      installation: 'Wall-mounted track system'
    },
    installation: {
      time: '2-3 hours',
      difficulty: 'Professional Required',
      included: ['Premium track hardware', 'All mounting screws', 'Installation guide', 'Professional installation service']
    },
    warranty: '5-year manufacturer warranty + lifetime hardware warranty',
    inStock: true,
    featured: true,
    bestseller: true,
    conversionOptimized: {
      urgencyText: 'Limited time: Save $250 - Only 8 units left in Ottawa!',
      socialProof: 'Installed in 127+ Ottawa homes this year',
      guarantee: '30-day satisfaction guarantee + free adjustments'
    }
  },
  
  {
    id: 'heritage-herringbone-chevron',
    name: 'Heritage Herringbone Chevron Design',
    slug: 'heritage-herringbone-chevron-design',
    category: 'barn-door',
    subcategory: 'Heritage Collection',
    price: 1399,
    images: {
      primary: '/images/arcat/renin_192861_Heritage_Herringbone_Chevron_Design.jpg',
      gallery: [
        '/images/arcat/renin_192861_Heritage_Herringbone_Chevron_Design.jpg',
        '/images/arcat/renin_192861_hd.jpg'
      ],
      hd: '/images/arcat/renin_192861_hd.jpg'
    },
    description: 'Stunning Heritage barn door with intricate herringbone chevron pattern. A true statement piece that transforms any space into a designer showcase.',
    features: [
      'Hand-crafted herringbone chevron pattern',
      'Premium solid wood construction',
      'Multiple finish options available',
      'Smooth-glide barn door hardware',
      'Professional installation included',
      'Custom sizing available'
    ],
    specifications: {
      dimensions: ['32"×80"', '36"×80"', '42"×84"', 'Custom sizes available'],
      material: 'Premium Solid Wood',
      finish: ['Rustic Oak', 'Weathered Grey', 'Classic White', 'Dark Walnut'],
      thickness: '1.75"',
      weight: '90-100 lbs',
      installation: 'Heavy-duty track system'
    },
    installation: {
      time: '3-4 hours',
      difficulty: 'Professional Required',
      included: ['Heavy-duty track hardware', 'Soft-close mechanism', 'All hardware', 'Professional installation']
    },
    warranty: '5-year manufacturer warranty',
    inStock: true,
    featured: true,
    new: true,
    conversionOptimized: {
      urgencyText: 'New arrival - First 10 customers get free soft-close upgrade!',
      socialProof: 'Featured in Ottawa Home & Design Magazine',
      guarantee: 'If not completely satisfied, full refund within 30 days'
    }
  },

  {
    id: 'heritage-salinas-z',
    name: 'Heritage Salinas Z-Design',
    slug: 'heritage-salinas-z-design',
    category: 'barn-door',
    subcategory: 'Heritage Collection',
    price: 1149,
    images: {
      primary: '/images/arcat/renin_176737_Heritage_Salinas_Z_Design.jpg',
      gallery: [
        '/images/arcat/renin_176737_Heritage_Salinas_Z_Design.jpg',
        '/images/arcat/renin_176737_hd.jpg'
      ],
      hd: '/images/arcat/renin_176737_hd.jpg'
    },
    description: 'Classic Heritage Salinas barn door featuring timeless Z-brace design. Perfect for rustic, farmhouse, and industrial decor styles.',
    features: [
      'Iconic Z-brace farmhouse design',
      'Solid wood plank construction',
      'Rustic finish options',
      'Heavy-duty barn door hardware',
      'Easy maintenance and cleaning',
      'Lifetime structural warranty'
    ],
    specifications: {
      dimensions: ['30"×80"', '32"×80"', '36"×80"', '42"×84"'],
      material: 'Solid Pine Wood',
      finish: ['Natural Pine', 'Barn Red', 'Weathered Grey', 'Antique White'],
      thickness: '1.5"',
      weight: '75-85 lbs',
      installation: 'Standard track system'
    },
    installation: {
      time: '2-3 hours',
      difficulty: 'Moderate',
      included: ['Track hardware', 'Mounting brackets', 'Installation hardware', 'Detailed instructions']
    },
    warranty: '5-year manufacturer warranty',
    inStock: true,
    featured: false,
    bestseller: true,
    conversionOptimized: {
      urgencyText: 'Most popular choice - 3 sold this week in Ottawa',
      socialProof: 'Over 200 five-star reviews',
      guarantee: 'Price match guarantee + free consultation'
    }
  },

  {
    id: 'continental-metal-works',
    name: 'Continental Metal Works 3-Panel',
    slug: 'continental-metal-works-3-panel',
    category: 'barn-door',
    subcategory: 'Continental Collection',
    price: 1549,
    images: {
      primary: '/images/arcat/renin_192856_Continental_Metal_Works_3_Panel_Metal_Inserts.jpg',
      gallery: [
        '/images/arcat/renin_192856_Continental_Metal_Works_3_Panel_Metal_Inserts.jpg',
        '/images/arcat/renin_192856_hd.jpg'
      ],
      hd: '/images/arcat/renin_192856_hd.jpg'
    },
    description: 'Industrial-chic Continental Metal Works barn door with 3 distinctive metal panel inserts. Perfect for modern lofts, industrial spaces, and contemporary homes.',
    features: [
      'Industrial metal panel inserts',
      'Solid wood frame construction',
      'Modern industrial aesthetic',
      'Premium powder-coated metal',
      'Heavy-duty track system included',
      'Sound dampening properties'
    ],
    specifications: {
      dimensions: ['32"×80"', '36"×80"', '42"×84"'],
      material: 'Solid Wood Frame with Metal Inserts',
      finish: ['Matte Black Frame', 'Industrial Grey', 'Bronze Finish'],
      thickness: '1.75"',
      weight: '95-105 lbs',
      installation: 'Heavy-duty track system required'
    },
    installation: {
      time: '3-4 hours',
      difficulty: 'Professional Required',
      included: ['Heavy-duty track', 'Metal reinforcement brackets', 'All hardware', 'Professional installation']
    },
    warranty: '10-year frame warranty, 5-year metal insert warranty',
    inStock: true,
    featured: true,
    conversionOptimized: {
      urgencyText: 'Premium collection - Only 2 left in this finish',
      socialProof: 'Chosen by top Ottawa interior designers',
      guarantee: 'Premium warranty + free design consultation'
    }
  },

  // ==================== BYPASS DOORS - SPACE-SAVING SOLUTIONS ====================
  {
    id: 'euro-1-lite-bypass',
    name: 'Euro 1-Lite Bypass Closet Doors',
    slug: 'euro-1-lite-bypass-closet-doors',
    category: 'bypass-door',
    subcategory: 'Euro Collection',
    price: 899,
    salePrice: 749,
    images: {
      primary: '/images/arcat/renin_155725_Bypass_Closet_Doors_Euro_1_Lite.jpg',
      gallery: [
        '/images/arcat/renin_155725_Bypass_Closet_Doors_Euro_1_Lite.jpg',
        '/images/arcat/renin_155725_Bypass_Closet_Doors_Euro_1_Lite_v2.jpg',
        '/images/arcat/renin_155725_hd.jpg'
      ],
      hd: '/images/arcat/renin_155725_hd.jpg'
    },
    description: 'Elegant Euro 1-Lite bypass closet doors featuring a single glass panel for natural light. Perfect for bedrooms and hallway closets where space is at a premium.',
    features: [
      'Single frosted glass lite for privacy with light',
      'Space-saving bypass design',
      'Smooth-rolling track system',
      'Modern European styling',
      'Easy installation system',
      'Adjustable for various closet widths'
    ],
    specifications: {
      dimensions: ['48"×80" (2×24")', '60"×80" (2×30")', '72"×80" (2×36")', '96"×80" (2×48")'],
      material: 'MDF with Frosted Glass Insert',
      finish: ['Primed White', 'Espresso', 'Grey Oak'],
      thickness: '1.375"',
      weight: '35-45 lbs per panel',
      installation: 'Top-hung bypass track system'
    },
    installation: {
      time: '2-3 hours',
      difficulty: 'Moderate',
      included: ['Bypass track system', 'Mounting hardware', 'Door guides', 'Installation instructions']
    },
    warranty: '3-year manufacturer warranty',
    inStock: true,
    featured: true,
    bestseller: true,
    conversionOptimized: {
      urgencyText: 'Flash sale: Save $150 - Ends this weekend!',
      socialProof: '#1 selling bypass door in Ottawa',
      guarantee: 'Perfect fit guarantee or full refund'
    }
  },

  {
    id: 'euro-3-lite-bypass',
    name: 'Euro 3-Lite Bypass Closet Doors',
    slug: 'euro-3-lite-bypass-closet-doors',
    category: 'bypass-door',
    subcategory: 'Euro Collection',
    price: 1199,
    images: {
      primary: '/images/arcat/renin_155732_Bypass_Closet_Doors_Euro_3_Lite.jpg',
      gallery: [
        '/images/arcat/renin_155732_Bypass_Closet_Doors_Euro_3_Lite.jpg',
        '/images/arcat/renin_155732_Bypass_Closet_Doors_Euro_3_Lite_v2.jpg',
        '/images/arcat/renin_155732_hd.jpg'
      ],
      hd: '/images/arcat/renin_155732_hd.jpg'
    },
    description: 'Sophisticated Euro 3-Lite bypass doors with three glass panels creating a stunning light-filled closet entrance. Ideal for master bedrooms and walk-in closets.',
    features: [
      'Three frosted glass lites for maximum light',
      'Premium bypass track system',
      'Soft-close mechanism available',
      'Contemporary European design',
      'Multiple finish options',
      'Professional installation recommended'
    ],
    specifications: {
      dimensions: ['60"×80" (2×30")', '72"×80" (2×36")', '96"×80" (2×48")', '120"×80" (2×60")'],
      material: 'MDF with Triple Glass Inserts',
      finish: ['Primed White', 'Dark Espresso', 'Light Grey', 'Natural Oak'],
      thickness: '1.375"',
      weight: '45-55 lbs per panel',
      installation: 'Premium bypass track system'
    },
    installation: {
      time: '3-4 hours',
      difficulty: 'Professional Required',
      included: ['Premium track system', 'Soft-close hardware', 'All mounting hardware', 'Professional installation service']
    },
    warranty: '5-year manufacturer warranty',
    inStock: true,
    featured: true,
    conversionOptimized: {
      urgencyText: 'Popular choice - 2 installations scheduled this week',
      socialProof: 'Preferred by Ottawa home builders',
      guarantee: 'Free soft-close upgrade with professional installation'
    }
  },

  // ==================== BIFOLD DOORS - CLASSIC SOLUTIONS ====================
  {
    id: 'euro-1-lite-bifold',
    name: 'Euro 1-Lite Bifold Closet Door',
    slug: 'euro-1-lite-bifold-closet-door',
    category: 'bifold-door',
    subcategory: 'Euro Collection',
    price: 449,
    images: {
      primary: '/images/arcat/renin_155701_Bifold_Closet_Door_Euro_1_Lite.jpg',
      gallery: [
        '/images/arcat/renin_155701_Bifold_Closet_Door_Euro_1_Lite.jpg',
        '/images/arcat/renin_155701_Bifold_Closet_Door_Euro_1_Lite_v2.jpg',
        '/images/arcat/renin_155701_hd.jpg'
      ],
      hd: '/images/arcat/renin_155701_hd.jpg'
    },
    description: 'Compact Euro 1-Lite bifold door perfect for smaller closets and utility spaces. Features a single glass lite for light transmission while maintaining privacy.',
    features: [
      'Space-efficient bifold design',
      'Single frosted glass panel',
      'Smooth pivot hardware',
      'Easy DIY installation',
      'Multiple width options',
      'Budget-friendly solution'
    ],
    specifications: {
      dimensions: ['24"×80"', '30"×80"', '32"×80"', '36"×80"'],
      material: 'MDF with Glass Insert',
      finish: ['Primed White', 'Espresso'],
      thickness: '1.375"',
      weight: '25-35 lbs',
      installation: 'Top-hung pivot system'
    },
    installation: {
      time: '1-2 hours',
      difficulty: 'Easy',
      included: ['Pivot hardware', 'Track', 'Mounting screws', 'Easy installation guide']
    },
    warranty: '2-year manufacturer warranty',
    inStock: true,
    featured: false,
    bestseller: true,
    conversionOptimized: {
      urgencyText: 'Budget-friendly option - Great value!',
      socialProof: 'Perfect for rental properties and condos',
      guarantee: 'Easy returns within 30 days'
    }
  },

  // ==================== HARDWARE - PREMIUM BARN DOOR HARDWARE ====================
  {
    id: 'spectrum-bent-strap',
    name: 'Spectrum Bent Strap Barn Door Hardware Kit',
    slug: 'spectrum-bent-strap-hardware-kit',
    category: 'hardware',
    subcategory: 'Spectrum Collection',
    price: 399,
    salePrice: 329,
    images: {
      primary: '/images/arcat/renin_176738_Barn_Door_Hardware_Kits_Spectrum_Bent_Strap.jpg',
      gallery: ['/images/arcat/renin_176738_Barn_Door_Hardware_Kits_Spectrum_Bent_Strap.jpg']
    },
    description: 'Premium Spectrum bent strap barn door hardware kit with smooth-glide technology. Supports doors up to 200 lbs with whisper-quiet operation.',
    features: [
      'Bent strap industrial design',
      'Supports up to 200 lbs',
      'Whisper-quiet operation',
      'Adjustable door guides',
      'Complete installation kit',
      'Lifetime warranty'
    ],
    specifications: {
      dimensions: ['6ft track', '8ft track', '10ft track', '12ft track'],
      material: 'Powder-coated Steel',
      finish: ['Matte Black', 'Brushed Stainless', 'Oil-rubbed Bronze'],
      weight: '15-20 lbs kit',
      installation: 'Wall-mounted track system'
    },
    installation: {
      time: '1-2 hours',
      difficulty: 'Moderate',
      included: ['Track', 'Hangers', 'Door guides', 'All mounting hardware', 'Anti-jump discs']
    },
    warranty: 'Lifetime hardware warranty',
    inStock: true,
    featured: true,
    bestseller: true,
    conversionOptimized: {
      urgencyText: 'Hardware special - Save $70 this month!',
      socialProof: 'Used by professional contractors across Ottawa',
      guarantee: 'Lifetime replacement guarantee'
    }
  },

  // ==================== MIRRORS - DESIGNER ACCENT PIECES ====================
  {
    id: 'florence-mirror',
    name: 'Florence Designer Mirror 21"×31"',
    slug: 'florence-designer-mirror',
    category: 'mirror',
    subcategory: 'Designer Collection',
    price: 299,
    images: {
      primary: '/images/arcat/renin_199088_Mirror_Florence_21_x_31.jpg',
      gallery: ['/images/arcat/renin_199088_Mirror_Florence_21_x_31.jpg']
    },
    description: 'Elegant Florence designer mirror with sophisticated frame detailing. Perfect complement to closet door installations and bedroom decor.',
    features: [
      'Premium beveled mirror glass',
      'Sophisticated frame design',
      'Easy wall mounting system',
      'Moisture-resistant coating',
      'Perfect for closet areas',
      'Adds light and space'
    ],
    specifications: {
      dimensions: ['21"×31"'],
      material: 'Beveled Mirror Glass with MDF Frame',
      finish: ['White', 'Espresso', 'Grey'],
      weight: '12 lbs',
      installation: 'Wall-mounted with included brackets'
    },
    installation: {
      time: '30 minutes',
      difficulty: 'Easy',
      included: ['Mounting brackets', 'Wall anchors', 'Installation guide']
    },
    warranty: '3-year manufacturer warranty',
    inStock: true,
    featured: false,
    conversionOptimized: {
      socialProof: 'Perfect finishing touch for your closet project',
      guarantee: 'Satisfaction guaranteed'
    }
  }
]

// Category filters for enhanced UX
export const categoryFilters = [
  { id: 'all', name: 'All Products', count: enhancedReninCatalog.length },
  { id: 'barn-door', name: 'Barn Doors', count: enhancedReninCatalog.filter(p => p.category === 'barn-door').length },
  { id: 'bypass-door', name: 'Bypass Doors', count: enhancedReninCatalog.filter(p => p.category === 'bypass-door').length },
  { id: 'bifold-door', name: 'Bifold Doors', count: enhancedReninCatalog.filter(p => p.category === 'bifold-door').length },
  { id: 'hardware', name: 'Hardware', count: enhancedReninCatalog.filter(p => p.category === 'hardware').length },
  { id: 'mirror', name: 'Mirrors', count: enhancedReninCatalog.filter(p => p.category === 'mirror').length }
]

// Pricing utilities
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  }).format(price)
}

export function calculateSavings(originalPrice: number, salePrice: number): string {
  const savings = originalPrice - salePrice
  return formatPrice(savings)
}

// Search and filter functions
export function filterProducts(
  products: EnhancedReninProduct[],
  category?: string,
  priceRange?: [number, number],
  inStock?: boolean,
  searchTerm?: string
) {
  let filtered = [...products]

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category)
  }

  if (priceRange) {
    filtered = filtered.filter(p => 
      (p.salePrice || p.price) >= priceRange[0] && 
      (p.salePrice || p.price) <= priceRange[1]
    )
  }

  if (inStock) {
    filtered = filtered.filter(p => p.inStock)
  }

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.features.some(f => f.toLowerCase().includes(term))
    )
  }

  return filtered
}