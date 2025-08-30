#!/bin/bash

# PG Closets Production Deployment Script
# This script will ALWAYS deploy to the live PG Closets website
# Usage: ./deploy-pgclosets.sh

set -e

echo "🚀 PG CLOSETS PRODUCTION DEPLOYMENT"
echo "====================================="
echo ""

# Production configuration for PG Closets
export VERCEL_PROJECT_ID=prj_ySW3kS1J66EbmuWRC6q6QN3gww6w
export VERCEL_ORG_ID=team_Xzht85INUsoW05STx9DMMyLX

echo "📋 Project: PG Closets Website"
echo "🌐 Domain: www.pgclosets.com"
echo "🆔 Project ID: $VERCEL_PROJECT_ID"
echo ""

# Verify we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Check if we have the PG Closets project files
if [ ! -f "app/layout.tsx" ]; then
    echo "❌ Error: This doesn't appear to be the PG Closets project"
    exit 1
fi

echo "🔍 Pre-deployment checks..."

# Check for critical files
REQUIRED_FILES=(
    "config/site.ts"
    "data/renin-products.ts"
    "lib/enhanced-renin-products.ts"
    "components/PgHeader.tsx"
    "components/PgFooter.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files present"

# Check for placeholder content
echo "🔍 Checking for placeholder content..."

# Check for demo phone numbers (allow the real PG Closets number)
if grep -r "(XXX) XXX-XXXX" . --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md" --exclude="*.sh" >/dev/null 2>&1; then
    echo "⚠️  Warning: Found placeholder phone numbers. Please update before deploying."
    grep -r "(XXX) XXX-XXXX" . --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md" --exclude="*.sh" || true
    echo ""
fi

# Check for placeholder domains
if grep -r "your-domain.com" . --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md" --exclude="*.sh" >/dev/null 2>&1; then
    echo "⚠️  Warning: Found placeholder domains. Please update before deploying."
    grep -r "your-domain.com" . --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md" --exclude="*.sh" || true
    echo ""
fi

echo "✅ Content checks complete"

# Restore PG Closets production configuration
echo "🔧 Restoring PG Closets production configuration..."

# Create .vercel directory and project.json
mkdir -p .vercel
cat > .vercel/project.json << EOF
{"projectId":"prj_ySW3kS1J66EbmuWRC6q6QN3gww6w","orgId":"team_Xzht85INUsoW05STx9DMMyLX"}
EOF

# Restore production robots.txt
cat > public/robots.txt << 'EOF'
# Robots.txt for PG Closets
User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/
Disallow: /account/
Disallow: /cart/

# Allow important pages
Allow: /products/
Allow: /about/
Allow: /contact/
Allow: /faq/

# Sitemap location
Sitemap: https://www.pgclosets.com/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1
EOF

# Restore production sitemap if it doesn't exist
if [ ! -f "public/sitemap.xml" ]; then
    echo "📄 Restoring production sitemap..."
    cat > public/sitemap.xml << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.pgclosets.com/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.pgclosets.com/products/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.pgclosets.com/about/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.pgclosets.com/contact/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.pgclosets.com/services/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.pgclosets.com/gallery/</loc>
    <lastmod>2025-08-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
EOF
fi

echo "✅ Production configuration restored"

# Build and deploy
echo "🏗️  Building project..."
if ! npm run build; then
    echo "❌ Build failed! Please fix errors before deploying."
    exit 1
fi

echo "✅ Build successful"

echo ""
echo "🚀 DEPLOYING TO PRODUCTION..."
echo "This will deploy to: https://www.pgclosets.com"
echo ""

# Deploy to production
if vercel --prod --yes; then
    echo ""
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "============================="
    echo "🌐 Live Site: https://www.pgclosets.com"
    echo "📊 Dashboard: https://vercel.com/peoples-group/v0-fork-of-usable-and-appealing-im"
    echo ""
    echo "✅ Your changes are now live on the PG Closets website!"
    echo ""
    
    # Optional: Open the site
    echo "Opening live site..."
    if command -v open >/dev/null 2>&1; then
        open "https://www.pgclosets.com"
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open "https://www.pgclosets.com"
    else
        echo "Visit: https://www.pgclosets.com"
    fi
    
else
    echo ""
    echo "❌ DEPLOYMENT FAILED!"
    echo "Please check the errors above and try again."
    exit 1
fi