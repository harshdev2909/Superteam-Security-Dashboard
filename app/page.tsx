import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, DollarSign, ShieldAlert, Clock } from "lucide-react"
import Link from "next/link"
import { ExploitCard } from "@/components/exploit-card"

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-background/80">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Track Solana Exploits in Real-Time
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Monitor, analyze, and understand security vulnerabilities in the Solana ecosystem
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/exploits">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Explore Exploits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exploits</CardTitle>
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
              <DollarSign className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$128.5M</div>
              <p className="text-xs text-muted-foreground">+$12.3M from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Hack</CardTitle>
              <Clock className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2 days ago</div>
              <p className="text-xs text-muted-foreground">SolFlare Protocol</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container px-4 py-12 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Exploits</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ExploitCard
            date="2025-04-17"
            protocol="SolFlare Protocol"
            type="Reentrancy"
            fundsLost="$8.2M"
            status="Confirmed"
          />
          <ExploitCard
            date="2025-04-10"
            protocol="SolYield Finance"
            type="Flash Loan Attack"
            fundsLost="$12.5M"
            status="Confirmed"
          />
          <ExploitCard
            date="2025-04-02"
            protocol="SolStake"
            type="Oracle Manipulation"
            fundsLost="$5.7M"
            status="Under Investigation"
          />
        </div>
        <div className="mt-8 text-center">
          <Link href="/exploits">
            <Button variant="outline">View All Exploits</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
