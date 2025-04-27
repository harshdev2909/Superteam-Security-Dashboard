"use client";

import { useState, useEffect } from "react";

interface LiveAlert {
  id: string;
  timestamp: string;
  protocol: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "investigating" | "resolved";
  description: string;
  estimatedLoss?: string;
  transactionId?: string;
  attackerAddress?: string;
  affectedAddresses?: string[];
  technicalDetails?: string;
}

export function useLiveTracker() {
  const [alerts, setAlerts] = useState<LiveAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    const connectWebSocket = () => {
      ws = new WebSocket('https://superteam-security-dashboard-backend.onrender.com/api/live-tracker');

      ws.onopen = () => {
        console.log('Connected to live tracker WebSocket');
        setConnected(true);
        setLoading(false);
        setError(null);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'initial') {
          setAlerts(message.data);
        } else if (message.type === 'alert') {
          setAlerts((prev) => [message.data, ...prev]);
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from live tracker WebSocket');
        setConnected(false);
        // Attempt to reconnect after 5 seconds
        reconnectTimeout = setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError(new Error('Failed to connect to live tracker'));
        setConnected(false);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  return { alerts, loading, error, connected };
}