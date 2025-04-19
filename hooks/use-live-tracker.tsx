"use client"

import { useState, useEffect } from "react"

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

// Mock data for live alerts
const mockAlerts: LiveAlert[] = [
  {
    id: "alert-1",
    timestamp: "2025-04-19T08:30:00Z",
    protocol: "SolDEX",
    type: "Potential Price Manipulation",
    severity: "high",
    status: "active",
    description: "Unusual trading activity detected on SolDEX. Potential price manipulation of SOL/USDC pair.",
    estimatedLoss: "Unknown",
    transactionId: "7KLmPuLVMpVkz4FMzAKKUJMELU4UQpjVYTQRKLvpR7Z2",
    attackerAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    technicalDetails:
      "Large volume trades executed in rapid succession, causing significant price slippage. Possible sandwich attack in progress.",
  },
  {
    id: "alert-2",
    timestamp: "2025-04-19T07:15:00Z",
    protocol: "SolBridge",
    type: "Suspicious Bridge Activity",
    severity: "critical",
    status: "investigating",
    description: "Large unauthorized withdrawals detected from SolBridge. Team is investigating.",
    estimatedLoss: "$3.2M (estimated)",
    transactionId: "9nJUvmGHWVwPYBJK9MKozAHCFRGg7xjvJ9NQw3hVzwRB",
    attackerAddress: "0x9Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
    technicalDetails:
      "Multiple large withdrawals from the bridge contract to an unknown address. Signature verification may have been bypassed.",
  },
  {
    id: "alert-3",
    timestamp: "2025-04-19T05:45:00Z",
    protocol: "SolYield",
    type: "Flash Loan Detection",
    severity: "medium",
    status: "resolved",
    description: "Flash loan activity detected on SolYield. No exploit confirmed. Protocol functioning normally.",
    transactionId: "2KLmPuLVMpVkz4FMzAKKUJMELU4UQpjVYTQRKLvpR7Z2",
    technicalDetails:
      "Large flash loan taken and repaid within the same transaction. No adverse effects detected on protocol.",
  },
]

export function useLiveTracker() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [connected, setConnected] = useState(true)

  useEffect(() => {
    // Simulate WebSocket connection
    const connectWebSocket = async () => {
      try {
        setLoading(true)

        // Simulate connection delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Set initial alerts
        setAlerts(mockAlerts)
        setLoading(false)
        setConnected(true)

        // Simulate receiving new alerts periodically
        const interval = setInterval(() => {
          // 10% chance of a new alert
          if (Math.random() < 0.1) {
            const newAlert: LiveAlert = {
              id: `alert-${Date.now()}`,
              timestamp: new Date().toISOString(),
              protocol: ["SolDEX", "SolBridge", "SolYield", "SolVault", "SolSwap"][Math.floor(Math.random() * 5)],
              type: [
                "Potential Price Manipulation",
                "Suspicious Activity",
                "Flash Loan Detection",
                "Unusual Transfers",
              ][Math.floor(Math.random() * 4)],
              severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as
                | "critical"
                | "high"
                | "medium"
                | "low",
              status: ["active", "investigating", "resolved"][Math.floor(Math.random() * 3)] as
                | "active"
                | "investigating"
                | "resolved",
              description: "New suspicious activity detected. Investigation in progress.",
            }

            setAlerts((prev) => [newAlert, ...prev])
          }

          // 5% chance of connection issue
          if (Math.random() < 0.05) {
            setConnected(false)

            // Reconnect after a delay
            setTimeout(() => {
              setConnected(true)
            }, 3000)
          }
        }, 10000)

        return () => clearInterval(interval)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to connect to live tracker"))
        setLoading(false)
        setConnected(false)
      }
    }

    connectWebSocket()
  }, [])

  return { alerts, loading, error, connected }
}
