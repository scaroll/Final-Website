# 🚀 Deployment Checklist

Complete this checklist before deploying your custom closets website.

## ✅ Pre-Deployment Configuration

### 1. Site Configuration
- [ ] Update `config/site.ts` with your business information
  - [ ] Domain and URL
  - [ ] Business name, phone, email, address
  - [ ] SEO metadata
  - [ ] Social media links (if applicable)

### 2. Environment Variables
- [ ] Copy `.env.example` to `.env.local`
- [ ] Configure `NEXT_PUBLIC_SITE_URL` with your domain
- [ ] Add database URL (if using e-commerce features)
- [ ] Configure email settings (if using contact forms)
- [ ] Add analytics IDs (if using analytics)

### 3. Content Updates
- [ ] Replace all placeholder phone numbers with your actual number
  - Search for: `(XXX) XXX-XXXX`, `613-729-7400`
- [ ] Update business name throughout the site
  - Search for: `PG Closets`, `Your Closet Business`
- [ ] Replace placeholder addresses and locations
- [ ] Update service areas to match your coverage

### 4. SEO Configuration
- [ ] Create and upload `public/sitemap.xml` (remove sitemap-example.xml)
- [ ] Update `public/robots.txt` with your domain
- [ ] Configure structured data in `app/layout.tsx`
- [ ] Update OpenGraph images and metadata
- [ ] Verify all meta titles and descriptions

### 5. Images and Assets
- [ ] Replace logo files in `public/images/`
- [ ] Add your gallery images to `public/images/gallery/`
- [ ] Optimize all images for web (compress and use WebP if possible)
- [ ] Update favicon and app icons
- [ ] Verify all image paths are correct

### 6. Product Catalog
- [ ] Review and update product information in `data/renin-products.ts`
- [ ] Verify all product images are accessible
- [ ] Update pricing for your market
- [ ] Add/remove products as needed for your inventory

## ✅ Testing Checklist

### 1. Local Testing
- [ ] All pages load without errors
- [ ] Contact forms work properly
- [ ] Product catalog displays correctly
- [ ] Mobile responsiveness verified
- [ ] All links work correctly

### 2. SEO Testing
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test structured data with Google's Rich Results Test
- [ ] Verify meta tags with social media preview tools
- [ ] Check sitemap is accessible at `/sitemap.xml`
- [ ] Confirm robots.txt is configured properly

### 3. Performance Testing
- [ ] Page load speeds are acceptable
- [ ] Images are optimized and load properly
- [ ] No console errors in browser
- [ ] Forms submit successfully
- [ ] Search functionality works (if applicable)

## ✅ Deployment Steps

### 1. Choose Deployment Platform
- [ ] Vercel (recommended for Next.js)
- [ ] Netlify
- [ ] Custom server
- [ ] Other hosting provider

### 2. Domain Configuration
- [ ] Purchase and configure domain name
- [ ] Set up DNS records
- [ ] Configure SSL certificate
- [ ] Test domain points to your site

### 3. Environment Variables on Platform
- [ ] Add all environment variables to your hosting platform
- [ ] Verify NEXT_PUBLIC_SITE_URL matches your domain
- [ ] Test all features work with production environment variables

### 4. Final Deployment
- [ ] Deploy to production
- [ ] Test all functionality on live site
- [ ] Submit sitemap to Google Search Console
- [ ] Verify analytics tracking (if configured)

## ✅ Post-Deployment

### 1. SEO Setup
- [ ] Submit site to Google Search Console
- [ ] Submit site to Bing Webmaster Tools
- [ ] Create Google My Business listing
- [ ] Set up local business listings

### 2. Analytics (Optional)
- [ ] Configure Google Analytics 4
- [ ] Set up conversion tracking
- [ ] Install additional tracking tools if needed

### 3. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Monitor site performance
- [ ] Regular content updates

## ✅ Security Checklist

- [ ] All sensitive data is in environment variables
- [ ] No API keys or passwords in code
- [ ] HTTPS is enabled and enforced
- [ ] Form validation is properly implemented
- [ ] Dependencies are up to date

## ⚠️ Common Issues

### Phone Numbers
- Make sure ALL instances of demo phone numbers are replaced
- Check components, pages, and configuration files
- Search entire codebase for old numbers

### Domain References
- Update all hardcoded domain references
- Check structured data, sitemaps, and meta tags
- Verify social media sharing works correctly

### Images
- Ensure all images are accessible at their paths
- Check for broken image links
- Verify images are properly optimized

---

## 🚨 CRITICAL: Do Not Deploy Until All Items Are Checked

Deploying with placeholder content or incorrect configurations can harm your business reputation and SEO rankings.

**Final verification**: Test the live site thoroughly before announcing or sharing the URL.