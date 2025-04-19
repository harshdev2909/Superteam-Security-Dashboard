"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, ExternalLink, AlertCircle, AlertTriangle, Info, Clock } from "lucide-react"

interface LiveAlert {
  id: string
  timestamp: string
  protocol: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  status: "active" | "investigating" | "resolved"
  description: string
  estimatedLoss?: string
  transactionId?: string
  attackerAddress?: string
  affectedAddresses?: string[]
  technicalDetails?: string
}

interface LiveAlertDetailProps {
  alert: LiveAlert
  onClose: () => void
}

export function LiveAlertDetail({ alert, onClose }: LiveAlertDetailProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "high":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "medium":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "low":
        return "bg-muted text-muted-foreground border-muted-foreground/20"
      default:
        return "bg-muted text-muted-foreground border-muted-foreground/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "investigating":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "resolved":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      default:
        return "bg-muted text-muted-foreground border-muted-foreground/20"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2">
            {getSeverityIcon(alert.severity)}
            <CardTitle>{alert.protocol} Alert</CardTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className={getSeverityColor(alert.severity)}>
              {alert.severity.toUpperCase()}
            </Badge>
            <Badge variant="outline" className={getStatusColor(alert.status)}>
              {alert.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="technical">Technical Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Alert Type</h3>
              <p className="text-sm">{alert.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Description</h3>
              <p className="text-sm">{alert.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">Timestamp</h3>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {formatTimestamp(alert.timestamp)}
              </div>
            </div>
            {alert.estimatedLoss && (
              <div>
                <h3 className="text-sm font-medium mb-1">Estimated Loss</h3>
                <p className="text-sm font-medium text-destructive">{alert.estimatedLoss}</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="technical" className="space-y-4">
            {alert.technicalDetails && (
              <div>
                <h3 className="text-sm font-medium mb-1">Technical Details</h3>
                <p className="text-sm">{alert.technicalDetails}</p>
              </div>
            )}
            {alert.transactionId && (
              <div>
                <h3 className="text-sm font-medium mb-1">Transaction ID</h3>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted p-1 rounded font-mono break-all">{alert.transactionId}</code>
                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                    <a
                      href={`https://explorer.solana.com/tx/${alert.transactionId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on Solana Explorer</span>
                    </a>
                  </Button>
                </div>
              </div>
            )}
            {alert.attackerAddress && (
              <div>
                <h3 className="text-sm font-medium mb-1">Attacker Address</h3>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-muted p-1 rounded font-mono break-all">{alert.attackerAddress}</code>
                  <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                    <a
                      href={`https://explorer.solana.com/address/${alert.attackerAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on Solana Explorer</span>
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={`https://explorer.solana.com`} target="_blank" rel="noopener noreferrer">
            View on Solana Explorer
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
