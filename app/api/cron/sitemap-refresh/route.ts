import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Vercel Cron Job: Run daily at 2 AM EST
export async function GET(request: NextRequest) {
  try {
    // Verify the cron secret to secure this endpoint
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      })
    }

    // Revalidate the sitemap
    revalidateTag('sitemap')
    
    // Also revalidate product-related pages
    revalidateTag('products')
    
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}] Sitemap and product pages revalidated via cron`)

    return NextResponse.json({ 
      success: true, 
      timestamp,
      message: 'Sitemap and product pages refreshed successfully'
    })
  } catch (error) {
    console.error('Cron job failed:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Edge runtime for faster execution
export const runtime = 'edge'