# 🔧 Configuration Guide

This guide walks you through configuring the website template for your custom closet business.

## 📋 Step 1: Basic Site Configuration

### Edit `config/site.ts`

This is the main configuration file. Update these values:

```typescript
export const siteConfig = {
  // Your domain (without https://)
  domain: 'yourclosetbusiness.com',
  url: 'https://yourclosetbusiness.com',
  
  business: {
    name: 'Your Closet Company',
    phone: '(555) 123-4567',
    email: 'info@yourclosetbusiness.com',
    address: {
      street: '123 Main Street',
      city: 'Your City',
      province: 'Your Province',
      postalCode: 'A1B 2C3'
    }
  },
  
  seo: {
    title: 'Your Closet Company | Custom Closets & Storage Solutions',
    description: 'Professional custom closet and storage solutions in Your City.',
    keywords: 'custom closets, storage solutions, closet doors, Your City'
  }
}
```

## 📋 Step 2: Environment Variables

### Create `.env.local` file

Copy `.env.example` to `.env.local` and configure:

```bash
# Required for production
NEXT_PUBLIC_SITE_URL=https://yourclosetbusiness.com

# Optional - Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Optional - Email (for contact forms)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourclosetbusiness.com
```

## 📋 Step 3: Update Content

### Phone Numbers
Search and replace these placeholder numbers throughout the project:
- `(XXX) XXX-XXXX` → Your actual phone number
- `613-729-7400` → Your actual phone number

Use VS Code or your editor's "Find and Replace" feature.

### Business Information
Search and replace:
- `PG Closets` → Your business name
- `Your Closet Business` → Your business name
- `Ottawa` → Your city name
- Update addresses and service areas

### Contact Information
Update email addresses and social media links throughout the site.

## 📋 Step 4: Product Catalog

### Option A: Simple Products (`data/renin-products.ts`)
For basic product display:

```typescript
{
  id: "your-product-id",
  name: "Product Name",
  category: "Barn Door",
  price: 599,
  image: "/images/your-product.jpg",
  sizes: ['24"x80"', '30"x80"'],
  finishes: ["White", "Black"],
  features: ["Feature 1", "Feature 2"]
}
```

### Option B: Enhanced Products (`lib/enhanced-renin-products.ts`)
For advanced e-commerce features:

```typescript
{
  id: 1,
  name: "Premium Door",
  slug: "premium-door",
  category: "sliding",
  price: 599,
  arcatImages: ["/images/door1.jpg"],
  description: "Description here",
  features: ["Feature 1"],
  inStock: true
}
```

## 📋 Step 5: Images

### Required Images
Add these to `public/images/`:
- Logo files (logo.png, logo-dark.png)
- Product images
- Gallery images
- Hero/banner images

### Image Optimization
- Use WebP format when possible
- Compress images (aim for under 100KB each)
- Use appropriate dimensions (1200px width for heroes, 400px for products)

## 📋 Step 6: SEO Configuration

### Sitemap
1. Delete `public/sitemap-example.xml`
2. Update `app/sitemap.ts` with your URLs
3. Or create a static `public/sitemap.xml`

### Robots.txt
Update `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://yourclosetbusiness.com/sitemap.xml
```

### Structured Data
Update the JSON-LD structured data in `app/layout.tsx`:
- Business name and contact info
- Address and location
- Services offered
- Business hours

## 📋 Step 7: Location Pages

### Update Service Areas
If you serve different areas, update these pages:
- `app/ottawa/page.tsx` → Your primary city
- `app/kanata/page.tsx` → Your service area 1
- `app/barrhaven/page.tsx` → Your service area 2

Create new location pages as needed.

## 📋 Step 8: Contact Forms

### Basic Configuration
Contact forms are configured to work with:
1. Static forms (submissions go to your email)
2. Form handling services (Netlify Forms, Formspree, etc.)
3. Custom API endpoints

### Email Setup (Optional)
To enable server-side email sending:
1. Configure SMTP settings in `.env.local`
2. Uncomment email API routes in `app/api/`
3. Test email functionality

## 📋 Step 9: Analytics (Optional)

### Google Analytics 4
1. Create GA4 property at analytics.google.com
2. Get tracking ID (starts with G-)
3. Add to `.env.local` as `GOOGLE_ANALYTICS_ID`
4. Uncomment Analytics components in `app/layout.tsx`

### Other Analytics
- Facebook Pixel
- Google Tag Manager
- Custom analytics solutions

## 📋 Step 10: Performance Optimization

### Image Optimization
- Use Next.js Image component (already implemented)
- Add blur placeholders
- Configure image domains in `next.config.js`

### Fonts
- Google Fonts are preloaded in layout
- Consider using local fonts for better performance

### Caching
- Configure caching headers for static assets
- Use ISR (Incremental Static Regeneration) for dynamic content

## 📋 Step 11: Testing Your Configuration

### Local Testing
```bash
npm run dev
```
Test all pages and functionality locally.

### Build Testing
```bash
npm run build
npm run start
```
Test the production build locally.

### Lighthouse Audit
Run in Chrome DevTools to check:
- Performance
- Accessibility  
- Best Practices
- SEO

## 🚨 Common Configuration Mistakes

1. **Forgetting to update environment variables** - Site won't work properly
2. **Not replacing placeholder phone numbers** - Unprofessional appearance
3. **Hardcoded domain references** - Broken links and SEO issues
4. **Missing or incorrect sitemap** - Poor search engine indexing
5. **Unoptimized images** - Slow loading times
6. **Not testing forms** - Lost leads and inquiries

## ✅ Configuration Complete?

Use the `DEPLOYMENT-CHECKLIST.md` to verify everything is properly configured before going live.

## 🆘 Need Help?

1. Check the README.md for general setup instructions
2. Review Next.js documentation for framework-specific questions
3. Test each configuration change thoroughly
4. Keep backups of working configurations