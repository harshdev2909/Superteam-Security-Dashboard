"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface AnalyticsData {
  totalExploits: number;
  totalFundsLost: number;
  avgResponseTime: number;
  mostCommonType: string;
  exploitTypes: { name: string; value: number; fill: string }[];
  fundsLostOverTime: { date: string; value: number }[];
  protocolFrequency: { protocol: string; category: string; count: number }[];
}

export function useAnalytics(timeRange: string = "all", currency: string = "usd") {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<AnalyticsData>('http://localhost:4000/analytics', {
          params: { timeRange, currency },
        });
        setAnalytics(response.data);
        setLoading(false);

        console.log("Analytics data:", response.data);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to fetch analytics");
        console.error("Analytics error:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange, currency]);

  return { analytics, loading, error };
}