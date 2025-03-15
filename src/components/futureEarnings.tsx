"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import type { Investment } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "@/components/ui/chart"

interface FutureEarningsProps {
    investments: Investment[]
}

export function FutureEarnings({ investments }: FutureEarningsProps) {
    const { t } = useTranslation()
    const [projectionYears, setProjectionYears] = useState(5)
    const [growthRate, setGrowthRate] = useState(8) // Default 8% annual growth
    const [timeframe, setTimeframe] = useState("optimistic")

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)

    // Calculate projected earnings based on growth rate and years
    const getProjectedData = (baseRate: number) => {
        const data = []
        let currentValue = totalInvested

        // Start with current year (0)
        data.push({
            year: 0,
            value: currentValue,
        })

        // Project for the specified number of years
        for (let year = 1; year <= projectionYears; year++) {
            currentValue = currentValue * (1 + baseRate / 100)
            data.push({
                year,
                value: currentValue,
            })
        }

        return data
    }

    // Generate different scenarios
    const conservativeData = getProjectedData(growthRate * 0.5) // Half the growth rate
    const moderateData = getProjectedData(growthRate)
    const optimisticData = getProjectedData(growthRate * 1.5) // 1.5x the growth rate

    // Get final values for each scenario
    const conservativeFinal = conservativeData[conservativeData.length - 1].value
    const moderateFinal = moderateData[moderateData.length - 1].value
    const optimisticFinal = optimisticData[optimisticData.length - 1].value

    // Calculate total returns
    const conservativeReturn = conservativeFinal - totalInvested
    const moderateReturn = moderateFinal - totalInvested
    const optimisticReturn = optimisticFinal - totalInvested

    // Calculate ROI percentages
    const conservativeROI = (conservativeReturn / totalInvested) * 100
    const moderateROI = (moderateReturn / totalInvested) * 100
    const optimisticROI = (optimisticReturn / totalInvested) * 100

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("futureEarnings", { rate: (growthRate * 0.5).toFixed(1) })}</CardTitle>
                <CardDescription>{t("futureEarningsDesc", { rate: (growthRate * 0.5).toFixed(1) })}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">
                                {t("projectionYears", { rate: (growthRate * 0.5).toFixed(1) })}: {projectionYears}
                            </label>
                            <span className="text-sm text-muted-foreground">1-10 {t("years", { rate: (growthRate * 0.5).toFixed(1) })}</span>
                        </div>
                        <Slider
                            value={[projectionYears]}
                            min={1}
                            max={10}
                            step={1}
                            onValueChange={(value) => setProjectionYears(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">
                                {t("annualGrowthRate", { rate: (growthRate * 0.5).toFixed(1) })}: {growthRate}%
                            </label>
                            <span className="text-sm text-muted-foreground">1-15%</span>
                        </div>
                        <Slider
                            value={[growthRate]}
                            min={1}
                            max={15}
                            step={0.5}
                            onValueChange={(value) => setGrowthRate(value[0])}
                        />
                    </div>

                    <Tabs defaultValue="optimistic" value={timeframe} onValueChange={setTimeframe}>
                        <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="conservative">{t("conservative", { rate: (growthRate * 0.5).toFixed(1) })}</TabsTrigger>
                            <TabsTrigger value="moderate">{t("moderate", { rate: growthRate.toFixed(1) })}</TabsTrigger>
                            <TabsTrigger value="optimistic">{t("optimistic", { rate: (growthRate * 1.5).toFixed(1) })}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="conservative" className="mt-0">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">{t("conservativeScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("conservativeScenarioDesc", { rate: (growthRate * 0.5).toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedValue", { rate: growthRate.toFixed(1) })}</p>
                                        <p className="text-2xl font-bold">{formatCurrency(conservativeFinal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 1.5).toFixed(1) })}</p>
                                        <p className="text-2xl font-bold text-green-500">+{formatCurrency(conservativeReturn)}</p>
                                        <p className="text-sm text-green-500">+{conservativeROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={conservativeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#10b981" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="moderate" className="mt-0">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">{t("moderateScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("moderateScenarioDesc", { rate: growthRate.toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-2xl font-bold">{formatCurrency(moderateFinal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-2xl font-bold text-green-500">+{formatCurrency(moderateReturn)}</p>
                                        <p className="text-sm text-green-500">+{moderateROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={moderateData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#3b82f6" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="optimistic" className="mt-0">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold">{t("optimisticScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {t("optimisticScenarioDesc", { rate: (growthRate * 1.5).toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-2xl font-bold">{formatCurrency(optimisticFinal)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-2xl font-bold text-green-500">+{formatCurrency(optimisticReturn)}</p>
                                        <p className="text-sm text-green-500">+{optimisticROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={optimisticData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    )
}