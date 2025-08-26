import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

// Vercel Cron Job: Run weekly to refresh product data and regenerate static pages
export async function GET(request: NextRequest) {
  try {
    // Verify the cron secret to secure this endpoint
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const timestamp = new Date().toISOString()
    
    // Revalidate all product-related tags and paths
    const revalidations = [
      // Tags
      'products',
      'sitemap',
      'categories',
      
      // Critical paths
      '/',
      '/products',
      '/barn-doors-ottawa',
      '/bypass-doors-ottawa', 
      '/bifold-doors-ottawa',
    ]

    // Revalidate tags
    const tags = ['products', 'sitemap', 'categories']
    tags.forEach(tag => {
      revalidateTag(tag)
    })

    // Revalidate paths
    const paths = ['/', '/products', '/barn-doors-ottawa', '/bypass-doors-ottawa', '/bifold-doors-ottawa']
    paths.forEach(path => {
      revalidatePath(path)
    })

    // Submit updated sitemap to search engines
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://www.pgclosets.ca'
    
    const searchEngineResults = []
    
    // Submit to Google
    try {
      const googleResponse = await fetch(
        `https://www.google.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`,
        { method: 'GET' }
      )
      searchEngineResults.push({
        engine: 'Google',
        status: googleResponse.status,
        success: googleResponse.ok
      })
    } catch (error) {
      searchEngineResults.push({
        engine: 'Google',
        success: false,
        error: (error as Error).message
      })
    }

    // Submit to Bing
    try {
      const bingResponse = await fetch(
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(`${baseUrl}/sitemap.xml`)}`,
        { method: 'GET' }
      )
      searchEngineResults.push({
        engine: 'Bing',
        status: bingResponse.status,
        success: bingResponse.ok
      })
    } catch (error) {
      searchEngineResults.push({
        engine: 'Bing', 
        success: false,
        error: (error as Error).message
      })
    }

    console.log(`[${timestamp}] Product reindexing completed with sitemap submissions`)

    return NextResponse.json({ 
      success: true,
      timestamp,
      revalidated: {
        tags: tags.length,
        paths: paths.length
      },
      sitemapSubmissions: searchEngineResults,
      message: 'Product data reindexed and sitemap submitted to search engines'
    })
  } catch (error) {
    console.error('Product reindexing cron job failed:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Edge runtime for faster execution
export const runtime = 'edge'