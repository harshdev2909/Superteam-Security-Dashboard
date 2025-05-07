"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExploitTypeChart } from "@/components/charts/exploit-type-chart";
import { FundsLostChart } from "@/components/charts/funds-lost-chart";
import { ProtocolHeatmap } from "@/components/charts/protocol-heatmap";
import { useAnalytics } from "@/hooks/use-analytics";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("all");
  const [currency, setCurrency] = useState("usd");
  const { analytics, loading, error } = useAnalytics(timeRange, currency);

  const handleExportCSV = () => {
    if (!analytics) return;
    
    // Enhanced CSV export with more detailed data
    const headers = [
      "Analytics Report",
      `Generated: ${new Date().toLocaleString()}`,
      `Time Range: ${timeRange}`,
      `Currency: ${currency.toUpperCase()}`,
      "",
      "Summary Metrics",
      "Metric,Value",
      `Total Exploits,${analytics.totalExploits}`,
      `Total Funds Lost,${analytics.totalFundsLost}${currency === 'usd' ? 'M USD' : ' SOL'}`,
      `Average Response Time,${analytics.avgResponseTime} hours`,
      `Most Common Type,${analytics.mostCommonType}`,
      "",
      "Exploit Types Distribution",
      "Type,Count,Percentage,Color",
      ...analytics.exploitTypes.map((type) => {
        const percentage = ((type.value / analytics.totalExploits) * 100).toFixed(2);
        return `${type.name},${type.value},${percentage}%,${type.fill}`;
      }),
      "",
      "Funds Lost Over Time",
      "Date,Amount,Currency",
      ...analytics.fundsLostOverTime.map((item) => 
        `${item.date},${item.value},${currency.toUpperCase()}`
      ),
      "",
      "Protocol Analysis",
      "Protocol,Category,Exploit Count,Percentage of Total",
      ...analytics.protocolFrequency.map((item) => {
        const percentage = ((item.count / analytics.totalExploits) * 100).toFixed(2);
        return `${item.protocol},${item.category},${item.count},${percentage}%`;
      }),
    ];

    const csv = headers.join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-report-${timeRange}-${currency}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <div className="text-destructive">Error loading analytics data. Please try again.</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Analytics</h1>
        <div>No analytics data available.</div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            {timeRange === 'month' ? 'Last 30 days' :
             timeRange === 'quarter' ? 'Last 90 days' :
             timeRange === 'year' ? 'Last 365 days' : 'All time'} data
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <Tabs value={timeRange} onValueChange={setTimeRange}>
            <TabsList>
              <TabsTrigger value="month">Last Month</TabsTrigger>
              <TabsTrigger value="quarter">Last Quarter</TabsTrigger>
              <TabsTrigger value="year">Last Year</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={currency} onValueChange={setCurrency}>
            <TabsList>
              <TabsTrigger value="usd">USD</TabsTrigger>
              <TabsTrigger value="sol">SOL</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportCSV} 
            disabled={!analytics}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Exploits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalExploits.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all protocols
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currency === 'usd'
                ? `$${analytics.totalFundsLost.toLocaleString()}M`
                : `${analytics.totalFundsLost.toLocaleString()} SOL`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {currency === 'usd' ? 'USD value' : 'SOL value'}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgResponseTime} hours</div>
            <p className="text-xs text-muted-foreground mt-1">
              Time to mitigate exploits
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Common Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.mostCommonType}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Primary exploit vector
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Exploit Types</CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of exploit types
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ExploitTypeChart data={analytics.exploitTypes} />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Funds Lost Over Time</CardTitle>
            <p className="text-sm text-muted-foreground">
              Historical trend of funds lost
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <FundsLostChart data={analytics.fundsLostOverTime} currency={currency} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>Exploit Frequency by Protocol</CardTitle>
          <p className="text-sm text-muted-foreground">
            Heatmap showing exploit frequency across protocols and categories
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ProtocolHeatmap data={analytics.protocolFrequency} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}