"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

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

interface LiveAlertItemProps {
  alert: LiveAlert
  isSelected: boolean
  onSelect: () => void
}

export function LiveAlertItem({ alert, isSelected, onSelect }: LiveAlertItemProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />
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
    <Card
      className={cn("cursor-pointer transition-colors hover:bg-accent", isSelected && "border-primary bg-accent")}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            {getSeverityIcon(alert.severity)}
            <span className="font-medium">{alert.protocol}</span>
          </div>
          <span className="text-xs text-muted-foreground">{formatTimestamp(alert.timestamp)}</span>
        </div>
        <p className="text-sm mb-2 line-clamp-2">{alert.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
            {alert.severity.toUpperCase()}
          </Badge>
          <Badge variant="outline" className={getStatusColor(alert.status)}>
            {alert.status.toUpperCase()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
