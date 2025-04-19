"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExploitTypeChart } from "@/components/charts/exploit-type-chart"
import { FundsLostChart } from "@/components/charts/funds-lost-chart"
import { ProtocolHeatmap } from "@/components/charts/protocol-heatmap"
import { useAnalytics } from "@/hooks/use-analytics"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Download } from "lucide-react"

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics()
  const [timeRange, setTimeRange] = useState("all")

  const handleExportCSV = () => {
    // In a real implementation, this would generate and download a CSV file
    alert("CSV export functionality would be implemented here")
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <div className="text-destructive">Error loading analytics data. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="month">Last Month</TabsTrigger>
              <TabsTrigger value="quarter">Last Quarter</TabsTrigger>
              <TabsTrigger value="year">Last Year</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Exploits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalExploits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics.totalFundsLost.toLocaleString()}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgResponseTime} hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Common Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.mostCommonType}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Exploit Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ExploitTypeChart data={analytics.exploitTypes} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Funds Lost Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <FundsLostChart data={analytics.fundsLostOverTime} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exploit Frequency by Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ProtocolHeatmap data={analytics.protocolFrequency} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
