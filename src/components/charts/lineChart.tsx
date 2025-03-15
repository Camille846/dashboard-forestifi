"use client"

import { useMemo } from "react"
import type { Investment } from "@/lib/types"
import { useTheme } from "next-themes"
import { useTranslation } from "@/lib/i18n"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "@/components/ui/chart"

interface InvestmentChartProps {
    timeframe: "week" | "month" | "year" | "all"
    investments: Investment[]
}

export function InvestmentChart({ timeframe, investments }: InvestmentChartProps) {
    const { theme } = useTheme()
    const { t } = useTranslation()

    // Generate mock chart data based on timeframe
    const chartData = useMemo(() => {
        const now = new Date()
        const data = []

        let days = 7
        if (timeframe === "month") days = 30
        if (timeframe === "year") days = 365
        if (timeframe === "all") days = 730

        // Generate data points
        for (let i = days; i >= 0; i--) {
            const date = new Date(now)
            date.setDate(date.getDate() - i)

            // Create some random fluctuation for the mock data
            const totalValue = investments.reduce((sum, inv) => {
                // Create a unique but deterministic fluctuation for each investment
                const fluctuation = Math.sin(date.getTime() / 1000000 + inv.id.charCodeAt(0)) * 0.1
                return sum + inv.amount * (1 + fluctuation)
            }, 0)

            data.push({
                date: date.toISOString().split("T")[0],
                value: totalValue,
            })
        }

        return data
    }, [timeframe, investments])

    // Calculate the domain for the Y axis
    const minValue = Math.min(...chartData.map((d) => d.value)) * 0.95
    const maxValue = Math.max(...chartData.map((d) => d.value)) * 1.05

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                    />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => {
                            const date = new Date(value)
                            if (timeframe === "week") {
                                return date.toLocaleDateString(undefined, { weekday: "short" })
                            } else if (timeframe === "month") {
                                return date.toLocaleDateString(undefined, { day: "numeric", month: "numeric" })
                            } else {
                                return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
                            }
                        }}
                    />
                    <YAxis
                        domain={[minValue, maxValue]}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        formatter={(value: number) => [`R$${value.toFixed(2)}`, t("portfolioValue")]}
                        labelFormatter={(label) => {
                            const date = new Date(label)
                            return date.toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            })
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        name={t("portfolioValue")}
                        stroke="#78D484"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

