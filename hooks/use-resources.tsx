"use client"

import { useState, useEffect } from "react"

interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: string
  url: string
  date?: string
  author?: string
}

// Mock data for resources
const mockResources: Resource[] = [
  {
    id: "1",
    title: "Solana Smart Contract Security Best Practices",
    description: "A comprehensive guide to writing secure smart contracts on Solana",
    category: "developer",
    type: "pdf",
    url: "https://docs.solana.com/security-best-practices",
    date: "2025-03-15",
    author: "Solana Foundation",
  },
  {
    id: "2",
    title: "Understanding Reentrancy Attacks in Solana Programs",
    description: "Learn how reentrancy attacks work and how to prevent them in your Solana programs",
    category: "developer",
    type: "video",
    url: "https://www.youtube.com/watch?v=example1",
    date: "2025-02-20",
    author: "Superteam Security",
  },
  {
    id: "3",
    title: "Secure Your Solana Wallet: User Guide",
    description: "Essential security practices for Solana wallet users",
    category: "user",
    type: "pdf",
    url: "https://solana.com/wallet-security-guide",
    date: "2025-01-10",
    author: "Solana Foundation",
  },
  {
    id: "4",
    title: "How to Spot Phishing Attempts in the Solana Ecosystem",
    description: "Learn to identify and avoid common phishing attacks targeting Solana users",
    category: "user",
    type: "video",
    url: "https://www.youtube.com/watch?v=example2",
    date: "2025-03-05",
    author: "Superteam Security",
  },
  {
    id: "5",
    title: "Soteria: Solana Smart Contract Auditing Tool",
    description: "Automated security analysis tool for Solana programs",
    category: "tools",
    type: "tool",
    url: "https://github.com/superteam/soteria",
  },
  {
    id: "6",
    title: "Solana Program Security Checklist",
    description: "A comprehensive checklist for auditing Solana programs",
    category: "developer",
    type: "pdf",
    url: "https://docs.solana.com/security-checklist",
    date: "2025-04-01",
    author: "Solana Foundation",
  },
  {
    id: "7",
    title: "SolGuard: Real-time Solana Transaction Monitoring",
    description: "Monitor your Solana wallet for suspicious transactions in real-time",
    category: "tools",
    type: "tool",
    url: "https://solguard.io",
  },
  {
    id: "8",
    title: "Flash Loan Attack Prevention Strategies",
    description: "Learn how to protect your DeFi protocol from flash loan attacks",
    category: "developer",
    type: "video",
    url: "https://www.youtube.com/watch?v=example3",
    date: "2025-02-15",
    author: "Superteam Security",
  },
  {
    id: "9",
    title: "Secure Solana Wallet Setup Guide",
    description: "Step-by-step guide to setting up a secure Solana wallet with hardware protection",
    category: "user",
    type: "pdf",
    url: "https://solana.com/secure-wallet-setup",
    date: "2025-03-20",
    author: "Solana Foundation",
  },
]

export function useResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await axios.get('/api/resources')
        // setResources(response.data)

        // Using mock data for now
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setResources(mockResources)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch resources"))
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  return { resources, loading, error }
}
