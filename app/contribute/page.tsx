"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useContributions } from "@/hooks/use-contributions"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AlertCircle, Check, ExternalLink, Github } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContributionGuidelines } from "@/components/contribution-guidelines"

export default function ContributePage() {
  const { guidelines, submitReport, loading, error, success } = useContributions()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    transactionIds: "",
    evidence: "",
    contactInfo: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitReport(formData)
  }

  const isFormValid = formData.title && formData.description

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Contribute</h1>

      <Tabs defaultValue="guidelines" className="mb-8">
        <TabsList>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          <TabsTrigger value="report">Submit Report</TabsTrigger>
        </TabsList>
        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Contribution Guidelines</CardTitle>
              <CardDescription>Learn how to contribute to the Superteam Security Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : error ? (
                <div className="text-center py-12 text-destructive">Error loading guidelines. Please try again.</div>
              ) : (
                <ContributionGuidelines guidelines={guidelines} />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <a href="https://github.com/superteam/security-dashboard" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repository
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/superteam/security-dashboard/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issue Tracker
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Submit Exploit Report</CardTitle>
              <CardDescription>Report a new security exploit or vulnerability</CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <Alert className="bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900">
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle>Report Submitted</AlertTitle>
                  <AlertDescription>
                    Thank you for your contribution. Our team will review your report.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Brief title of the exploit"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Detailed description of the exploit, including how it works"
                        rows={5}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="transactionIds">Transaction IDs</Label>
                      <Textarea
                        id="transactionIds"
                        name="transactionIds"
                        placeholder="Relevant transaction IDs (one per line)"
                        rows={3}
                        value={formData.transactionIds}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="evidence">Evidence</Label>
                      <Textarea
                        id="evidence"
                        name="evidence"
                        placeholder="Links to evidence, code snippets, or other relevant information"
                        rows={3}
                        value={formData.evidence}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="contactInfo">Contact Information (Optional)</Label>
                      <Input
                        id="contactInfo"
                        name="contactInfo"
                        placeholder="Email or other contact information"
                        value={formData.contactInfo}
                        onChange={handleInputChange}
                      />
                    </div>
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          There was an error submitting your report. Please try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </form>
              )}
            </CardContent>
            {!success && (
              <CardFooter>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid || loading}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
