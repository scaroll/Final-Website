# 🚀 Deploy to Live PG Closets Website

This project has a **dedicated deployment command** that will **ALWAYS** deploy changes to the live PG Closets website at **www.pgclosets.com**.

## ⚡ Quick Deploy Commands

### Option 1: Shell Script (Recommended)
```bash
./deploy-pgclosets.sh
```

### Option 2: NPM Script  
```bash
npm run deploy-pgclosets
# or
npm run deploy
```

### Option 3: Node.js Script
```bash
node deploy.js
```

### Option 4: Direct from Claude Code
```bash
# Claude can run any of the above commands directly
./deploy-pgclosets.sh
```

## 🎯 What These Commands Do

**ALL commands will:**
1. ✅ **Deploy to PRODUCTION** → https://www.pgclosets.com
2. ✅ **Use PG Closets Vercel project** (prj_ySW3kS1J66EbmuWRC6q6QN3gww6w)
3. ✅ **Restore production configurations** (robots.txt, sitemap.xml, .vercel/)
4. ✅ **Run build process** and validate
5. ✅ **Go live immediately** on the domain

## ⚠️ IMPORTANT: This is PRODUCTION Deployment

- **These commands deploy to the LIVE website**
- **Changes go live immediately**  
- **No staging or preview - direct to production**
- **Domain: www.pgclosets.com**

## 🔧 Pre-Deployment Checks

The deployment script automatically checks for:
- ✅ All required files present
- ⚠️  Warns about placeholder content (but doesn't block)
- ✅ Validates build succeeds
- ✅ Restores production configurations

## 📁 Production Configurations Restored

Each deployment automatically restores:

### `.vercel/project.json`
```json
{
  "projectId": "prj_ySW3kS1J66EbmuWRC6q6QN3gww6w",
  "orgId": "team_Xzht85INUsoW05STx9DMMyLX"
}
```

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://www.pgclosets.com/sitemap.xml
```

### `public/sitemap.xml`
Complete sitemap with PG Closets URLs

## 🚨 Critical Information

### This Project is ALWAYS Connected to Production
- **Project ID**: prj_ySW3kS1J66EbmuWRC6q6QN3gww6w
- **Domain**: www.pgclosets.com  
- **Vercel Team**: peoples-group
- **Environment**: PRODUCTION

### No Development/Staging Separation
- **Every deployment goes LIVE**
- **No preview environments**
- **Changes are immediately public**

## 💡 Usage Examples

### From Claude Code
```bash
# Claude can run this directly in the project:
./deploy-pgclosets.sh
```

### From Terminal
```bash
cd /Users/spencercarroll/Downloads/Final-Website-Deploy
./deploy-pgclosets.sh
```

### From NPM
```bash
npm run deploy
```

## 📊 Post-Deployment

After successful deployment:
- ✅ Live site opens automatically: https://www.pgclosets.com
- ✅ Changes are immediately visible
- ✅ Vercel dashboard shows deployment status
- ✅ All pages and functionality are live

## 🔐 Security

The deployment commands:
- ✅ Use environment variables for Vercel credentials
- ✅ Only deploy to the authorized PG Closets project
- ✅ Require valid Vercel authentication
- ✅ Cannot accidentally deploy elsewhere

---

## ⚡ TL;DR: One Command to Go Live

```bash
./deploy-pgclosets.sh
```

**This command will immediately deploy your changes to the live PG Closets website.**

No configuration needed. No setup required. Just run and go live.