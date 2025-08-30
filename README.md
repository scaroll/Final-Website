# Custom Closets Website Template

A complete Next.js website template for custom closet and storage businesses. This template has been cleaned of all deployment-specific configurations and requires setup before deployment.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (for version control)

### Local Development Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see Configuration section below).

3. **Configure site settings:**
   Edit `config/site.ts` with your business information.

4. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### Required Configuration

Before deploying, you MUST configure these files:

#### 1. Site Configuration (`config/site.ts`)
```typescript
export const siteConfig = {
  domain: 'your-domain.com',
  url: 'https://your-domain.com',
  business: {
    name: 'Your Business Name',
    phone: '(XXX) XXX-XXXX',
    email: 'info@your-domain.com',
    // ... more settings
  }
}
```

#### 2. Environment Variables (`.env.local`)
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# Add other required variables
```

#### 3. Update SEO Files
- Remove `public/sitemap-example.xml` after creating your own sitemap
- Configure `public/robots.txt` with your domain
- Update structured data in components with your business information

### Phone Number Updates

The template uses placeholder phone numbers. Search and replace these:
- `(XXX) XXX-XXXX` - Replace with your phone number
- Update in `config/site.ts` and verify no hardcoded numbers remain

### Domain Updates

- Update all references from example domains to your domain
- Check `app/layout.tsx` structured data
- Verify OpenGraph and meta tags

## 📁 Project Structure

```
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── store/          # E-commerce components
│   └── seo/            # SEO-specific components
├── config/             # Configuration files
├── data/               # Static data (products, etc.)
├── lib/                # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## 🛠 Features

- ✅ Responsive Next.js website
- ✅ Product catalog with Renin doors
- ✅ SEO optimized (structured data, sitemap, robots.txt)
- ✅ Contact forms and quote requests
- ✅ Multiple location pages
- ✅ Gallery and service pages
- ✅ Clean, modern design
- ✅ Accessible components

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Create account at [vercel.com](https://vercel.com)
2. Connect your Git repository
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Option 2: Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Connect your Git repository
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Configure environment variables

### Option 3: Custom Server

1. Build the project: `npm run build`
2. Start production server: `npm start`
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificate

## 📝 Content Management

### Adding Products

1. Edit `data/renin-products.ts` or `lib/enhanced-renin-products.ts`
2. Add product images to `public/images/`
3. Update categories and filters as needed

### Updating Pages

- Edit page content in `app/[page]/page.tsx`
- Update SEO metadata in each page
- Modify components in `components/` directory

### Gallery Images

- Add images to `public/images/gallery/`
- Update `app/gallery/page.tsx` with new image references
- Optimize images for web (WebP format recommended)

## 🔧 Customization

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Color scheme: Update CSS custom properties

### Components

- UI components use Radix UI primitives
- Styled with Tailwind CSS
- Fully customizable and accessible

### SEO

- Update structured data in `app/layout.tsx`
- Modify meta tags per page
- Configure sitemap generation in `app/sitemap.ts`

## 📊 Analytics Setup (Optional)

### Google Analytics

1. Create GA4 property
2. Add tracking ID to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Uncomment Analytics components in `app/layout.tsx`

### Other Analytics

- Add your preferred analytics provider
- Follow their Next.js integration guide
- Respect user privacy and GDPR/CCPA compliance

## 🔐 Security Considerations

- Keep dependencies updated
- Never commit sensitive data to Git
- Use environment variables for API keys
- Implement proper form validation
- Consider rate limiting for contact forms

## 📞 Support

This template is provided as-is. For customization or deployment assistance:

1. Check Next.js documentation
2. Review component documentation
3. Test thoroughly before production deployment

## 📄 License

This template is provided for customization and deployment. Modify as needed for your business.

---

**Important**: This template requires configuration before deployment. Do not deploy without updating all placeholder content, phone numbers, and domain references.