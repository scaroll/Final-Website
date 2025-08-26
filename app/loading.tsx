// Optimized loading component for better Core Web Vitals (INP optimization)
export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Optimized skeleton that matches layout for better LCP */}
        <div className="w-12 h-12 bg-amber-400 rounded-full animate-pulse mx-auto mb-4" />
        <div className="h-6 bg-slate-200 rounded w-48 animate-pulse mx-auto mb-3" />
        <div className="h-4 bg-slate-200 rounded w-32 animate-pulse mx-auto mb-2" />
        <div className="h-4 bg-slate-200 rounded w-40 animate-pulse mx-auto" />
        
        {/* Loading text for accessibility */}
        <span className="sr-only">Loading page content...</span>
      </div>
    </div>
  )
}
