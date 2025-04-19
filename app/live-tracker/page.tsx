"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLiveTracker } from "@/hooks/use-live-tracker"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AlertCircle, Bell, BellOff, ExternalLink } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LiveAlertItem } from "@/components/live-alert-item"
import { LiveAlertDetail } from "@/components/live-alert-detail"
import { Badge } from "@/components/ui/badge"

export default function LiveTrackerPage() {
  const { alerts, loading, error, connected } = useLiveTracker()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)

  const selectedAlertData = selectedAlert ? alerts.find((alert) => alert.id === selectedAlert) : null

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled)
    // In a real app, this would request notification permissions and set up push notifications
  }

  const handleAlertSelect = (alertId: string) => {
    setSelectedAlert(alertId)
  }

  const handleCloseDetail = () => {
    setSelectedAlert(null)
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Hack Tracker</h1>
          <p className="text-muted-foreground mt-1">Monitor real-time security incidents in the Solana ecosystem</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
          <Label htmlFor="notifications" className="flex items-center">
            {notificationsEnabled ? (
              <>
                <Bell className="mr-2 h-4 w-4" />
                Notifications On
              </>
            ) : (
              <>
                <BellOff className="mr-2 h-4 w-4" />
                Notifications Off
              </>
            )}
          </Label>
        </div>
      </div>

      {!connected && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Status</AlertTitle>
          <AlertDescription>Not connected to the live tracker. Attempting to reconnect...</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Alerts
                <Badge variant={connected ? "default" : "destructive"} className="ml-2">
                  {connected ? "LIVE" : "OFFLINE"}
                </Badge>
              </CardTitle>
              <CardDescription>Real-time security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">
                  Error connecting to live tracker. Please try again.
                </div>
              ) : alerts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No active alerts at this time.</div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {alerts.map((alert) => (
                    <LiveAlertItem
                      key={alert.id}
                      alert={alert}
                      isSelected={selectedAlert === alert.id}
                      onSelect={() => handleAlertSelect(alert.id)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedAlertData ? (
            <LiveAlertDetail alert={selectedAlertData} onClose={handleCloseDetail} />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Alert Selected</h3>
                <p className="text-muted-foreground mb-6">Select an alert from the list to view detailed information</p>
                <Button variant="outline" asChild>
                  <a href="https://solana.com/developers/security" target="_blank" rel="noopener noreferrer">
                    Learn About Solana Security
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
