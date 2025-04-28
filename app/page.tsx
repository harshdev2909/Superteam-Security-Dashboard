"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, DollarSign, ShieldAlert, Clock } from "lucide-react";
import Link from "next/link";
import { ExploitCard } from "@/components/exploit-card";
import { useExploits } from "@/hooks/use-exploits";
import { useSolanaExploits } from "@/hooks/useSolanaExploits";
import { useLiveTracker } from "@/hooks/use-live-tracker";
import { LoadingSpinner } from "@/components/loading-spinner";
import { motion } from "framer-motion";

export default function Home() {
  const [useOnChain, setUseOnChain] = useState(false);
  const { exploits, total, loading, error } = useExploits();
  const { exploits: onChainExploits, loading: onChainLoading, error: onChainError } = useSolanaExploits(); // Mock data
  const { alerts, loading: alertsLoading, error: alertsError } = useLiveTracker();

  const displayedExploits = useOnChain ? onChainExploits : exploits;
  const displayedLoading = useOnChain ? onChainLoading : loading;
  const displayedError = useOnChain ? onChainError : error;

  // Calculate metrics
  const totalExploits = displayedExploits.length;
  const totalFundsLost = displayedExploits.reduce((sum, exploit) => sum + Number(exploit.fundsLost) / 1e6, 0);
  const latestExploit = displayedExploits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const recentExploits = displayedExploits.slice(0, 3);

  // Mock monthly changes (replace with backend analytics if available)
  const monthlyExploitsChange = totalExploits > 0 ? "+2" : "0";
  const monthlyFundsLostChange = totalFundsLost > 0 ? `+$${Math.round(totalFundsLost * 0.1)}M` : "$0";

  return (
    <main className="flex-1">
      {/* Live Alert Ticker */}
      {alertsLoading ? (
        <div className="bg-red-600 text-white p-2 text-center">
          <LoadingSpinner className="inline-block w-4 h-4" />
        </div>
      ) : alertsError ? (
        <div className="bg-red-600 text-white p-2 text-center">
          Error loading alerts: {alertsError.message}
        </div>
      ) : alerts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-red-600 text-white p-2 text-center overflow-hidden"
        >
          <motion.p
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            Alert: {alerts[0]?.protocol || 'Unknown Protocol'} - ${(alerts[0]?.estimatedLoss) || 4579285714.3}M detected!
          </motion.p>
        </motion.div>
      ) : (
        <div className="bg-red-600 text-white p-2 text-center">No active alerts</div>
      )}

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50 dark:from-background dark:to-background/80">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
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
              <Button variant="outline" onClick={() => setUseOnChain(!useOnChain)}>
                {useOnChain ? "Show Database Exploits" : "Show On-Chain Exploits"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {displayedLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : displayedError ? (
        <div className="text-center py-12 text-destructive">
          Error loading data: {displayedError.message}
        </div>
      ) : (
        <>
          <section  className="container px-4 py-12 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Exploits</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalExploits}</div>
                  <p className="text-xs text-muted-foreground">{monthlyExploitsChange} from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Funds Lost</CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalFundsLost.toFixed(1)}M</div>
                  <p className="text-xs text-muted-foreground">{monthlyFundsLostChange} from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Latest Hack</CardTitle>
                  <Clock className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {latestExploit ? new Date(latestExploit.date).toLocaleDateString() : "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground">{latestExploit?.protocol || "None"}</p>
                </CardContent>
              </Card>
            </motion.div>
          </section>

          <section className="container px-4 py-12 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Recent Exploits</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {recentExploits.length === 0 ? (
                <p className="text-muted-foreground col-span-3 text-center">No recent exploits found.</p>
              ) : (
                recentExploits.map((exploit) => (
                  <ExploitCard
                    key={exploit.id}
                    date={new Date(exploit.date).toLocaleDateString()}
                    protocol={exploit.protocol}
                    type={exploit.type}
                    fundsLost={`$${Number(exploit.fundsLost) / 1e6}M`}
                    status={exploit.metadata?.status ?? "Confirmed"}
                  />
                ))
              )}
            </motion.div>
            <div className="mt-8 text-center">
              <Link href="/exploits">
                <Button variant="outline">View All Exploits</Button>
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Signature Footer */}
      <footer className="text-center py-4 text-muted-foreground">
        Built by Harsh Sharma |{" "}
        <a href="https://github.com/harshdev2909" className="text-blue-400 hover:underline">
          GitHub
        </a>
      </footer>
    </main>
  );
}