import { NextRequest, NextResponse } from 'next/server'

// Vercel Cron Job: Run every 6 hours to keep critical pages warm
export async function GET(request: NextRequest) {
  try {
    // Verify the cron secret to secure this endpoint
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://www.pgclosets.com'

    // Critical pages to keep warm
    const criticalPages = [
      '/',
      '/products',
      '/about',
      '/contact',
      '/barn-doors-ottawa',
      '/bypass-doors-ottawa',
      '/bifold-doors-ottawa',
      '/services',
    ]

    const results = []
    
    for (const page of criticalPages) {
      try {
        const response = await fetch(`${baseUrl}${page}`, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'PG-Closets-Cache-Warmer/1.0',
          },
        })
        
        results.push({
          page,
          status: response.status,
          success: response.ok,
          cached: response.headers.get('x-vercel-cache') || 'unknown'
        })
      } catch (error) {
        results.push({
          page,
          status: 0,
          success: false,
          error: (error as Error).message
        })
      }
    }

    const timestamp = new Date().toISOString()
    const successCount = results.filter(r => r.success).length
    
    console.log(`[${timestamp}] Cache warmup completed: ${successCount}/${criticalPages.length} pages warmed`)

    return NextResponse.json({ 
      success: true,
      timestamp,
      warmed: successCount,
      total: criticalPages.length,
      results
    })
  } catch (error) {
    console.error('Cache warmup cron job failed:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Edge runtime for faster execution
export const runtime = 'edge'