"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useResources } from "@/hooks/use-resources"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ExternalLink, FileText, Video, PenToolIcon as Tool } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ResourcesPage() {
  const { resources, loading, error } = useResources()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === "all" || resource.category === activeTab
    return matchesSearch && matchesCategory
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "tool":
        return <Tool className="h-5 w-5" />
      default:
        return <ExternalLink className="h-5 w-5" />
    }
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
        <h1 className="text-3xl font-bold mb-4">Resources</h1>
        <div className="text-destructive">Error loading resources. Please try again.</div>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>

      <div className="mb-8">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="developer">Developer Guides</TabsTrigger>
          <TabsTrigger value="user">User Safety</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{resource.title}</CardTitle>
                <div className="text-muted-foreground">{getResourceIcon(resource.type)}</div>
              </div>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {resource.date && <p>Published: {resource.date}</p>}
                {resource.author && <p>Author: {resource.author}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">
                  View Resource
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
