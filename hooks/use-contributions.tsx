"use client"

import axios from "axios"
import { useState, useEffect } from "react"

interface ContributionFormData {
  title: string
  description: string
  transactionIds: string
  evidence: string
  contactInfo: string
}

// Mock guidelines content
const mockGuidelines = `
# Contribution Guidelines

## How to Contribute

The Superteam Security Dashboard welcomes contributions from the community. Here's how you can help:

### Reporting Exploits

1. **Verify the exploit**: Ensure the exploit is real and has not been reported before.
2. **Gather evidence**: Collect transaction IDs, code snippets, and any other relevant information.
3. **Submit a report**: Use the form in the "Submit Report" tab to provide details about the exploit.

### Code Contributions

1. **Fork the repository**: Create your own fork of the [GitHub repository](https://github.com/superteam/security-dashboard).
2. **Create a branch**: Make your changes in a new branch.
3. **Submit a pull request**: Once your changes are ready, submit a pull request for review.

### Guidelines for Good Reports

- Be specific and detailed in your descriptions
- Include all relevant transaction IDs
- Provide steps to reproduce the exploit if possible
- Include code snippets or screenshots when relevant
- Explain the potential impact of the exploit

### Responsible Disclosure

If you discover a critical vulnerability that could put user funds at risk:

1. **Do not disclose publicly** until the issue has been addressed
2. Contact the Superteam Security team directly at security@superteam.com
3. Allow reasonable time for the issue to be fixed before public disclosure

Thank you for helping keep the Solana ecosystem secure!
`

export function useContributions() {
  const [guidelines, setGuidelines] = useState(mockGuidelines)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchGuidelines = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // const response = await axios.get('/api/contributions/guidelines')
        // setGuidelines(response.data)

        // Using mock data for now
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))
        setGuidelines(mockGuidelines)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch guidelines"))
        setLoading(false)
      }
    }

    fetchGuidelines()
  }, [])

  const submitReport = async (formData: ContributionFormData) => {
    try {
      setLoading(true)
      setError(null)

      // In a real app, this would be an API call
      await axios.post('http://localhost:4000/contributions', formData)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate success
      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to submit report"))
      setLoading(false)
    }
  }

  return { guidelines, submitReport, loading, error, success }
}
