"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Download,
  RefreshCw
} from "lucide-react"

interface MetricData {
  current: number
  previous: number
  change: number
  changeType: "increase" | "decrease" | "neutral"
  target?: number
  unit?: string
  format?: "currency" | "percentage" | "number"
}

interface DashboardMetrics {
  // Revenue & Conversions
  totalRevenue: MetricData
  conversionRate: MetricData
  averageOrderValue: MetricData
  quotesGenerated: MetricData
  
  // Lead Generation
  phoneCallLeads: MetricData
  emailLeads: MetricData
  formSubmissions: MetricData
  consultationRequests: MetricData
  
  // Traffic & Engagement
  totalVisitors: MetricData
  localVisitors: MetricData
  organicTraffic: MetricData
  pageViews: MetricData
  avgTimeOnSite: MetricData
  bounceRate: MetricData
  
  // Service Areas
  ottawaPerformance: MetricData
  kanataPerformance: MetricData
  nepeanPerformance: MetricData
  orleansPerformance: MetricData
  
  // Customer Analytics
  customerLifetimeValue: MetricData
  returningCustomers: MetricData
  customerSatisfaction: MetricData
  
  // Attribution & ROI
  bestPerformingChannel: string
  worstPerformingChannel: string
  overallROI: MetricData
  costPerAcquisition: MetricData
}

interface ExecutiveDashboardProps {
  gaId: string
  refreshInterval?: number
  autoReport?: boolean
  reportEmail?: string
}

export function ExecutiveDashboard({
  gaId,
  refreshInterval = 300000, // 5 minutes
  autoReport = false,
  reportEmail
}: ExecutiveDashboardProps) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [reportGenerated, setReportGenerated] = useState(false)

  useEffect(() => {
    loadDashboardData()
    
    const interval = setInterval(() => {
      loadDashboardData()
    }, refreshInterval)

    // Set up automated reporting
    if (autoReport) {
      setupAutomatedReporting()
    }

    return () => {
      clearInterval(interval)
    }
  }, [gaId, refreshInterval, autoReport])

  const loadDashboardData = async () => {
    setIsLoading(true)
    
    try {
      // In a real implementation, this would fetch from Google Analytics API
      // For now, we'll simulate data collection from our tracking
      const data = await collectAnalyticsData()
      setMetrics(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate analytics data collection
  const collectAnalyticsData = async (): Promise<DashboardMetrics> => {
    // In production, this would integrate with Google Analytics Reporting API
    // and your attribution tracking data
    
    const baseMetrics = {
      // Revenue & Conversions
      totalRevenue: createMetric(45750, 38900, "currency"),
      conversionRate: createMetric(3.8, 3.2, "percentage"),
      averageOrderValue: createMetric(1850, 1650, "currency"),
      quotesGenerated: createMetric(127, 98, "number"),
      
      // Lead Generation
      phoneCallLeads: createMetric(89, 72, "number"),
      emailLeads: createMetric(156, 134, "number"),
      formSubmissions: createMetric(234, 189, "number"),
      consultationRequests: createMetric(45, 32, "number"),
      
      // Traffic & Engagement
      totalVisitors: createMetric(8950, 7450, "number"),
      localVisitors: createMetric(5870, 4820, "number"),
      organicTraffic: createMetric(5230, 4180, "number"),
      pageViews: createMetric(28700, 23400, "number"),
      avgTimeOnSite: createMetric(4.2, 3.8, "number"),
      bounceRate: createMetric(34.2, 38.9, "percentage", true), // Lower is better
      
      // Service Areas (showing growth rates)
      ottawaPerformance: createMetric(8.5, 7.2, "percentage"),
      kanataPerformance: createMetric(12.1, 9.8, "percentage"),
      nepeanPerformance: createMetric(6.3, 5.9, "percentage"),
      orleansPerformance: createMetric(4.7, 4.1, "percentage"),
      
      // Customer Analytics
      customerLifetimeValue: createMetric(3450, 3120, "currency"),
      returningCustomers: createMetric(23.4, 19.7, "percentage"),
      customerSatisfaction: createMetric(4.8, 4.6, "number"),
      
      // Attribution & ROI
      bestPerformingChannel: "Google Organic",
      worstPerformingChannel: "Social Media",
      overallROI: createMetric(325, 290, "percentage"),
      costPerAcquisition: createMetric(145, 167, "currency", true) // Lower is better
    }

    return baseMetrics
  }

  const createMetric = (
    current: number, 
    previous: number, 
    format: "currency" | "percentage" | "number" = "number",
    lowerIsBetter: boolean = false
  ): MetricData => {
    const change = ((current - previous) / previous) * 100
    const changeType = change > 0 
      ? (lowerIsBetter ? "decrease" : "increase")
      : (lowerIsBetter ? "increase" : "decrease")
    
    return {
      current,
      previous,
      change: Math.abs(change),
      changeType: change === 0 ? "neutral" : changeType,
      format
    }
  }

  const formatMetricValue = (value: number, format?: string, unit?: string) => {
    switch (format) {
      case "currency":
        return new Intl.NumberFormat('en-CA', { 
          style: 'currency', 
          currency: 'CAD',
          minimumFractionDigits: 0
        }).format(value)
      case "percentage":
        return `${value.toFixed(1)}%`
      default:
        return value.toLocaleString()
    }
  }

  const setupAutomatedReporting = () => {
    // Set up daily/weekly automated reports
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(8, 0, 0, 0) // 8 AM next day

    const timeUntilReport = tomorrow.getTime() - now.getTime()

    setTimeout(() => {
      generateAutomatedReport()
      
      // Set up daily reports
      setInterval(generateAutomatedReport, 24 * 60 * 60 * 1000)
    }, timeUntilReport)
  }

  const generateAutomatedReport = async () => {
    if (!metrics || !reportEmail) return

    const reportData = {
      date: new Date().toLocaleDateString(),
      metrics,
      insights: generateInsights(metrics),
      recommendations: generateRecommendations(metrics)
    }

    // In production, this would send an email report
    console.log("Automated report generated:", reportData)
    
    // Track report generation
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "automated_report_generated", {
        event_category: "Executive Dashboard",
        event_label: "Daily Report",
        report_type: "automated_daily"
      })
    }

    setReportGenerated(true)
    setTimeout(() => setReportGenerated(false), 5000)
  }

  const generateInsights = (data: DashboardMetrics): string[] => {
    const insights: string[] = []

    // Revenue insights
    if (data.totalRevenue.changeType === "increase") {
      insights.push(`Revenue increased by ${data.totalRevenue.change.toFixed(1)}% compared to last period`)
    }

    // Conversion insights
    if (data.conversionRate.current > 4.0) {
      insights.push(`Conversion rate of ${data.conversionRate.current}% is above industry average`)
    }

    // Local market insights
    if (data.localVisitors.current > data.totalVisitors.current * 0.6) {
      insights.push(`Strong local market presence with ${((data.localVisitors.current / data.totalVisitors.current) * 100).toFixed(1)}% local visitors`)
    }

    // Service area performance
    const topArea = Object.entries({
      "Ottawa": data.ottawaPerformance.current,
      "Kanata": data.kanataPerformance.current, 
      "Nepean": data.nepeanPerformance.current,
      "Orleans": data.orleansPerformance.current
    }).reduce((a, b) => a[1] > b[1] ? a : b)

    insights.push(`${topArea[0]} is the top performing service area with ${topArea[1]}% growth`)

    return insights
  }

  const generateRecommendations = (data: DashboardMetrics): string[] => {
    const recommendations: string[] = []

    // Conversion recommendations
    if (data.conversionRate.current < 3.5) {
      recommendations.push("Focus on conversion rate optimization - consider A/B testing quote builder flow")
    }

    // Traffic recommendations
    if (data.bounceRate.current > 40) {
      recommendations.push("High bounce rate detected - review page load speed and content relevance")
    }

    // Lead generation recommendations
    if (data.phoneCallLeads.changeType === "decrease") {
      recommendations.push("Phone leads declining - ensure phone number is prominent and call-to-action is clear")
    }

    // Service area recommendations
    if (data.orleansPerformance.current < 5) {
      recommendations.push("Orleans performance below average - consider targeted local marketing campaign")
    }

    return recommendations
  }

  const exportDashboard = () => {
    if (!metrics) return

    const exportData = {
      exportDate: new Date().toISOString(),
      period: "Current vs Previous",
      metrics,
      insights: generateInsights(metrics),
      recommendations: generateRecommendations(metrics)
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `pg-closets-analytics-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    
    URL.revokeObjectURL(url)

    // Track export
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag("event", "dashboard_export", {
        event_category: "Executive Dashboard",
        event_label: "Data Export",
        export_format: "json"
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-lg">Loading analytics dashboard...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Failed to load dashboard data</p>
        <Button onClick={loadDashboardData} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  const MetricCard = ({ 
    title, 
    metric, 
    icon: Icon, 
    target 
  }: { 
    title: string
    metric: MetricData
    icon: any
    target?: number 
  }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatMetricValue(metric.current, metric.format)}
        </div>
        <div className="flex items-center space-x-2 mt-2">
          <div className={`flex items-center text-xs ${
            metric.changeType === "increase" 
              ? "text-green-600" 
              : metric.changeType === "decrease"
              ? "text-red-600"
              : "text-gray-500"
          }`}>
            {metric.changeType === "increase" && <TrendingUp className="w-3 h-3 mr-1" />}
            {metric.changeType === "decrease" && <TrendingDown className="w-3 h-3 mr-1" />}
            {metric.change.toFixed(1)}% vs last period
          </div>
          {target && (
            <Badge variant={metric.current >= target ? "default" : "secondary"}>
              Target: {formatMetricValue(target, metric.format)}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PG Closets Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
          {reportGenerated && (
            <Badge className="mt-2 bg-green-500">
              Automated report generated
            </Badge>
          )}
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={loadDashboardData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportDashboard}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <Card className="mb-8 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {generateInsights(metrics).map((insight, index) => (
              <div key={index} className="flex items-start">
                <Badge className="mr-3 mt-0.5">Insight</Badge>
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue & Conversions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          Revenue & Conversions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Revenue" 
            metric={metrics.totalRevenue} 
            icon={DollarSign}
            target={50000}
          />
          <MetricCard 
            title="Conversion Rate" 
            metric={metrics.conversionRate} 
            icon={Target}
            target={4.0}
          />
          <MetricCard 
            title="Average Order Value" 
            metric={metrics.averageOrderValue} 
            icon={TrendingUp}
          />
          <MetricCard 
            title="Quotes Generated" 
            metric={metrics.quotesGenerated} 
            icon={BarChart3}
          />
        </div>
      </div>

      {/* Lead Generation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Lead Generation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Phone Call Leads" 
            metric={metrics.phoneCallLeads} 
            icon={Phone}
          />
          <MetricCard 
            title="Email Leads" 
            metric={metrics.emailLeads} 
            icon={Mail}
          />
          <MetricCard 
            title="Form Submissions" 
            metric={metrics.formSubmissions} 
            icon={BarChart3}
          />
          <MetricCard 
            title="Consultation Requests" 
            metric={metrics.consultationRequests} 
            icon={Calendar}
          />
        </div>
      </div>

      {/* Traffic & Engagement */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Traffic & Engagement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <MetricCard 
            title="Total Visitors" 
            metric={metrics.totalVisitors} 
            icon={Users}
          />
          <MetricCard 
            title="Local Visitors" 
            metric={metrics.localVisitors} 
            icon={MapPin}
          />
          <MetricCard 
            title="Organic Traffic" 
            metric={metrics.organicTraffic} 
            icon={TrendingUp}
          />
          <MetricCard 
            title="Page Views" 
            metric={metrics.pageViews} 
            icon={BarChart3}
          />
          <MetricCard 
            title="Avg Time on Site (min)" 
            metric={metrics.avgTimeOnSite} 
            icon={Calendar}
          />
          <MetricCard 
            title="Bounce Rate" 
            metric={metrics.bounceRate} 
            icon={TrendingDown}
          />
        </div>
      </div>

      {/* Service Areas Performance */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Service Areas Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Ottawa Growth" 
            metric={metrics.ottawaPerformance} 
            icon={MapPin}
          />
          <MetricCard 
            title="Kanata Growth" 
            metric={metrics.kanataPerformance} 
            icon={MapPin}
          />
          <MetricCard 
            title="Nepean Growth" 
            metric={metrics.nepeanPerformance} 
            icon={MapPin}
          />
          <MetricCard 
            title="Orleans Growth" 
            metric={metrics.orleansPerformance} 
            icon={MapPin}
          />
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Customer Analytics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Customer Lifetime Value" 
            metric={metrics.customerLifetimeValue} 
            icon={DollarSign}
          />
          <MetricCard 
            title="Returning Customers" 
            metric={metrics.returningCustomers} 
            icon={Users}
          />
          <MetricCard 
            title="Customer Satisfaction" 
            metric={metrics.customerSatisfaction} 
            icon={Star}
          />
        </div>
      </div>

      {/* Attribution & ROI */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Attribution & ROI
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Best Performing:</span>
                  <Badge className="bg-green-500">{metrics.bestPerformingChannel}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Needs Attention:</span>
                  <Badge variant="secondary">{metrics.worstPerformingChannel}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <MetricCard 
              title="Overall ROI" 
              metric={metrics.overallROI} 
              icon={TrendingUp}
            />
            <MetricCard 
              title="Cost Per Acquisition" 
              metric={metrics.costPerAcquisition} 
              icon={DollarSign}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {generateRecommendations(metrics).map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-0.5">Action</Badge>
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}