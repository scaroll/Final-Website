/**
 * Site Configuration
 * 
 * Configure these values before deployment
 * Replace with your actual business information
 */

export const siteConfig = {
  // Domain Configuration - PG Closets Production
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'www.pgclosets.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.pgclosets.com',
  
  // Business Information - PG Closets
  business: {
    name: 'PG Closets',
    phone: '(613) 729-7400',
    email: 'info@pgclosets.com',
    address: {
      street: '456 Sparks Street',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: 'K1R 7A9'
    }
  },
  
  // SEO Configuration - OPTIMIZED FOR LOCAL OTTAWA DOMINANCE
  seo: {
    title: 'PG Closets | Custom Closets & Storage Solutions in Ottawa',
    description: 'Ottawa\'s #1 closet door specialists. Official Renin dealer serving Ottawa, Kanata, Nepean & NCR since 2010. Free quotes, professional installation, lifetime warranty.',
    keywords: 'closet doors Ottawa, barn doors Ottawa, bypass doors Ottawa, custom closets Ottawa, Renin dealer Ottawa, closet installation Ottawa, storage solutions Ottawa NCR, bifold doors Ottawa, closet hardware Ottawa, professional installation Kanata Nepean Orleans Barrhaven',
    siteName: 'PG Closets Ottawa',
    localKeywords: [
      'closet doors Ottawa',
      'barn doors Ottawa', 
      'bypass doors Ottawa',
      'bifold doors Ottawa',
      'custom closets Ottawa',
      'closet installation Ottawa',
      'Renin doors Ottawa',
      'closet doors Kanata',
      'closet doors Nepean',
      'closet doors Orleans',
      'closet doors Barrhaven',
      'storage solutions NCR',
      'professional closet installation Ottawa'
    ]
  },
  
  // Social Media - Configure or remove
  social: {
    facebook: undefined, // 'https://facebook.com/your-page'
    instagram: undefined, // 'https://instagram.com/your-handle'
    twitter: undefined,   // 'https://twitter.com/your-handle'
  },
  
  // Features - Enable/disable features
  features: {
    analytics: false,      // Set to true when you configure analytics
    chatWidget: false,     // Set to true when you configure chat
    newsletter: false,     // Set to true when you configure email marketing
    ecommerce: true,       // E-commerce functionality
    blog: false           // Blog functionality
  },
  
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  }
}

// Utility function to get full URL
export function getFullUrl(path: string = '') {
  return `${siteConfig.url}${path}`
}

// Utility function to get domain
export function getDomain() {
  return siteConfig.domain
}