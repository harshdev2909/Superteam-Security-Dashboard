"use client"

import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface FundsLostData {
  date: string
  value: number
}

interface FundsLostChartProps {
  data: FundsLostData[]
}

export function FundsLostChart({ data }: FundsLostChartProps) {
  return (
    <ChartContainer
      config={{
        funds: {
          label: "Funds Lost (USD)",
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
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `$${value}M`} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent formatter={(value) => `$${value}M`} />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            name="Funds Lost"
            stroke="var(--color-funds)"
            fill="var(--color-funds)"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
