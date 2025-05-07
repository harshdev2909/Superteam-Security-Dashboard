"use client";

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface FundsLostData {
  date: string;
  value: number;
}

interface FundsLostChartProps {
  data: FundsLostData[];
  currency?: "sol" | "usd"; // Make currency optional
}

// ... existing code ...

export function FundsLostChart({ data, currency = "usd" }: FundsLostChartProps) {
  const currencyLabel = currency === "sol" ? "SOL" : "USD";

  return (
    <ChartContainer
      config={{
        funds: {
          label: `Funds Lost (${currencyLabel})`,
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="hsl(var(--muted))" 
          />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--muted))" }}
          />
          <YAxis
            tickFormatter={(value) => (currency === "usd" ? `$${value}M` : `${value} SOL`)}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--muted))" }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => (currency === "usd" ? `$${value}M` : `${value} SOL`)}
              />
            }
            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1 }}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            wrapperStyle={{ paddingBottom: "1rem" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name={`Funds Lost (${currencyLabel})`}
            stroke="var(--color-funds)"
            fill="var(--color-funds)"
            fillOpacity={0.2}
            animationDuration={1000}
            animationBegin={0}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}