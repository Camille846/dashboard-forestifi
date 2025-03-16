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

    // Calcular projecao futura com base no montante investido e taxa de crescimento
    const getProjectedData = (baseRate: number) => {
        const data = []
        let currentValue = totalInvested

        data.push({
            year: 0,
            value: currentValue,
        })

        // Projecao para cada ano
        for (let year = 1; year <= projectionYears; year++) {
            currentValue = currentValue * (1 + baseRate / 100)
            data.push({
                year,
                value: currentValue,
            })
        }

        return data
    }

    // Gerar dados para cada cenário
    const conservativeData = getProjectedData(growthRate * 0.5) // Half the growth rate
    const moderateData = getProjectedData(growthRate)
    const optimisticData = getProjectedData(growthRate * 1.5) // 1.5x the growth rate

    // Ter o valor final de cada cenário
    const conservativeFinal = conservativeData[conservativeData.length - 1].value
    const moderateFinal = moderateData[moderateData.length - 1].value
    const optimisticFinal = optimisticData[optimisticData.length - 1].value

    // Calculo do retorno de investimento
    const conservativeReturn = conservativeFinal - totalInvested
    const moderateReturn = moderateFinal - totalInvested
    const optimisticReturn = optimisticFinal - totalInvested

    // Calculo de porcentagem de retorno de investimento
    const conservativeROI = (conservativeReturn / totalInvested) * 100
    const moderateROI = (moderateReturn / totalInvested) * 100
    const optimisticROI = (optimisticReturn / totalInvested) * 100

    return (
        <Card className="shadow-sm w-full lg:py-4 2xl:py-6 lg:gap-3 2xl:ml-10 lg:ml-5">
            <CardHeader className="pb-1 lg:pb-0">
                <CardTitle className="text-lg lg:text-xl">{t("futureEarnings", { rate: (growthRate * 0.5).toFixed(1) })}</CardTitle>
                <CardDescription className="text-sm">{t("futureEarningsDesc", { rate: (growthRate * 0.5).toFixed(1) })}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 lg:space-y-3">
                    <div className="flex flex-col lg:flex-row gap-6 w-full 2xl:flex-col">
                        <div className="space-y-1 lg:space-y-2 w-full">
                            <div className="flex justify-between">
                                <label className="text-xs lg:text-sm font-medium">
                                    {t("projectionYears", { rate: (growthRate * 0.5).toFixed(1) })}: {projectionYears}
                                </label>
                                <span className="text-xs lg:text-sm text-muted-foreground">1-10 {t("years", { rate: (growthRate * 0.5).toFixed(1) })}</span>
                            </div>
                            <Slider
                                value={[projectionYears]}
                                min={1}
                                max={10}
                                step={1}
                                onValueChange={(value) => setProjectionYears(value[0])}
                            />
                        </div>

                        <div className="space-y-1 lg:space-y-2 w-full">
                            <div className="flex justify-between">
                                <label className="text-xs lg:text-sm font-medium">
                                    {t("annualGrowthRate", { rate: (growthRate * 0.5).toFixed(1) })}: {growthRate}%
                                </label>
                                <span className="text-xs lg:text-sm text-muted-foreground">1-15%</span>
                            </div>
                            <Slider
                                value={[growthRate]}
                                min={1}
                                max={15}
                                step={0.5}
                                onValueChange={(value) => setGrowthRate(value[0])}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="optimistic" value={timeframe} onValueChange={setTimeframe}>
                        <TabsList className="grid grid-cols-3 mb-2 lg:mb-4">
                            <TabsTrigger value="conservative" className="text-xs lg:text-sm">{t("conservative", { rate: (growthRate * 0.5).toFixed(1) })}</TabsTrigger>
                            <TabsTrigger value="moderate" className="text-xs lg:text-sm">{t("moderate", { rate: growthRate.toFixed(1) })}</TabsTrigger>
                            <TabsTrigger value="optimistic" className="text-xs lg:text-sm">{t("optimistic", { rate: (growthRate * 1.5).toFixed(1) })}</TabsTrigger>
                        </TabsList>

                        <TabsContent value="conservative" className="mt-0">
                            <div className="mb-2 lg:mb-4">
                                <h3 className="text-sm lg:text-base font-semibold">{t("conservativeScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    {t("conservativeScenarioDesc", { rate: (growthRate * 0.5).toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-2 lg:mt-4">
                                    <div>
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedValue", { rate: growthRate.toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-forestiOrange">{formatCurrency(conservativeFinal)}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 1.5).toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-green-500">+{formatCurrency(conservativeReturn)}</p>
                                        <p className="text-xs lg:text-sm text-green-500">+{conservativeROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[150px] lg:h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={conservativeData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#F87B36" activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="moderate" className="mt-0">
                            <div className="mb-2 lg:mb-4">
                                <h3 className="text-sm lg:text-base font-semibold">{t("moderateScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    {t("moderateScenarioDesc", { rate: growthRate.toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-2 lg:mt-4">
                                    <div>
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-forestiOrange">{formatCurrency(moderateFinal)}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-green-500">+{formatCurrency(moderateReturn)}</p>
                                        <p className="text-xs lg:text-sm text-green-500">+{moderateROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[150px] lg:h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={moderateData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#F87B36" activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="optimistic" className="mt-0">
                            <div className="mb-2 lg:mb-4">
                                <h3 className="text-sm lg:text-base font-semibold">{t("optimisticScenario", { rate: (growthRate * 0.5).toFixed(1) })}</h3>
                                <p className="text-xs lg:text-sm text-muted-foreground">
                                    {t("optimisticScenarioDesc", { rate: (growthRate * 1.5).toFixed(1) })}
                                </p>
                                <div className="grid grid-cols-2 gap-2 lg:gap-4 mt-2 lg:mt-4">
                                    <div>
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-forestiOrange">{formatCurrency(optimisticFinal)}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <p className="text-xs lg:text-sm text-muted-foreground">{t("projectedReturn", { rate: (growthRate * 0.5).toFixed(1) })}</p>
                                        <p className="text-base lg:text-xl font-bold text-forestiGreen">+{formatCurrency(optimisticReturn)}</p>
                                        <p className="text-xs lg:text-sm text-forestiGreen">+{optimisticROI.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[150px] lg:h-[200px] text-primary">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={optimisticData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="year" label={{ value: t("years", { rate: (growthRate * 0.5).toFixed(1) }), position: "insideBottom", offset: -5 }} />
                                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                                        <Tooltip
                                            formatter={(value: number) => [formatCurrency(value), t("projectedValue", { rate: (growthRate * 0.5).toFixed(1) })]}
                                            labelFormatter={(label) => `${t("year", { rate: (growthRate * 0.5).toFixed(1) })} ${label}`}
                                            contentStyle={{ backgroundColor: '#1a1a1a', color: '#FFF' }}
                                            />
                                        <Line type="monotone" dataKey="value" stroke="#F87B36" activeDot={{ r: 6 }} />
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