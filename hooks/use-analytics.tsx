"use client"

import { useState, useEffect } from "react"

interface AnalyticsData {
  totalExploits: number
  totalFundsLost: number
  avgResponseTime: number
  mostCommonType: string
  exploitTypes: { name: string; value: number; fill: string }[]
  fundsLostOverTime: { date: string; value: number }[]
  protocolFrequency: { protocol: string; category: string; count: number }[]
}

// Mock data for analytics
const mockAnalyticsData: AnalyticsData = {
  totalExploits: 42,
  totalFundsLost: 128.5,
  avgResponseTime: 6.2,
  mostCommonType: "Reentrancy",
  exploitTypes: [
    { name: "Reentrancy", value: 12, fill: "#10B981" },
    { name: "Flash Loan Attack", value: 9, fill: "#3B82F6" },
    { name: "Oracle Manipulation", value: 8, fill: "#8B5CF6" },
    { name: "Access Control", value: 7, fill: "#EC4899" },
    { name: "Logic Error", value: 6, fill: "#F59E0B" },
  ],
  fundsLostOverTime: [
    { date: "Jan", value: 8.2 },
    { date: "Feb", value: 12.5 },
    { date: "Mar", value: 25.3 },
    { date: "Apr", value: 18.7 },
    { date: "May", value: 15.2 },
    { date: "Jun", value: 22.1 },
    { date: "Jul", value: 10.8 },
    { date: "Aug", value: 5.4 },
    { date: "Sep", value: 10.3 },
  ],
  protocolFrequency: [
    { protocol: "SolFlare", category: "DeFi", count: 5 },
    { protocol: "SolYield", category: "Lending", count: 8 },
    { protocol: "SolStake", category: "Staking", count: 3 },
    { protocol: "SolSwap", category: "DEX", count: 6 },
    { protocol: "SolLend", category: "Lending", count: 7 },
    { protocol: "SolBridge", category: "Bridge", count: 9 },
    { protocol: "SolVault", category: "Vault", count: 4 },
    { protocol: "SolFarm", category: "Yield", count: 2 },
    { protocol: "SolDAO", category: "DAO", count: 1 },
    { protocol: "SolNFT", category: "NFT", count: 3 },
  ],
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalyticsData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await axios.get('/api/analytics')
        // setAnalytics(response.data)

        // Using mock data for now
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAnalytics(mockAnalyticsData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch analytics"))
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return { analytics, loading, error }
}
