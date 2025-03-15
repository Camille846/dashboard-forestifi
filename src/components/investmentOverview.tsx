"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Investment } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { InvestmentChart } from "@/components/charts/lineChart"
import { useTranslation } from "@/lib/i18n"

interface InvestmentOverviewProps {
    investments: Investment[]
}

export function InvestmentOverview({ investments }: InvestmentOverviewProps) {
    const { t } = useTranslation()
    const [timeframe, setTimeframe] = useState("month")

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
    const totalReturn = investments.reduce((sum, inv) => sum + (inv.currentValue - inv.amount), 0)
    const returnPercentage = (totalReturn / totalInvested) * 100
    const isPositiveReturn = totalReturn >= 0

    // Calculate total carbon credits
    const totalCarbonCredits = investments.reduce((sum, inv) => sum + (inv.carbonCredits || 0), 0)

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("investmentOverview")}</CardTitle>
                <CardDescription>{t("trackYourInvestments")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="bg-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between ">
                                <div>
                                    <p className="text-sm text-white">{t("totalInvested")}</p>
                                    <h3 className="text-2xl font-bold text-white">{formatCurrency(totalInvested)}</h3>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-forestiYellow" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white">{t("totalReturn")}</p>
                                    <h3 className="text-2xl font-bold flex items-center text-white">
                                        {formatCurrency(totalReturn)}
                                        {isPositiveReturn ? (
                                            <ArrowUpRight className="h-4 w-4 text-forestiGreen ml-1" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4 text-red-500 ml-1" />
                                        )}
                                    </h3>
                                    <p className={`text-xs ${isPositiveReturn ? "text-forestiGreen" : "text-red-500"}`}>
                                        {returnPercentage.toFixed(2)}%
                                    </p>
                                </div>
                                <div
                                    className={`h-10 w-10 rounded-full ${isPositiveReturn ? "bg-white/10" : "bg-forestiOrange"} flex items-center justify-center`}
                                >
                                    <TrendingUp className={`h-5 w-5 ${isPositiveReturn ? "text-forestiYellow" : "text-forestiOrange"}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white">{t("carbonCredits")}</p>
                                    <h3 className="text-2xl font-bold text-white">{totalCarbonCredits.toLocaleString()}</h3>
                                    <p className="text-xs text-forestiGreen">{t("tonsCO2Offset")}</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                                    <svg
                                        className="h-5 w-5 text-forestiYellow"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <path
                                            d="M8 12L11 15L16 9"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="month" onValueChange={setTimeframe}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">{t("investmentPerformance")}</h3>
                        <TabsList>
                            <TabsTrigger value="week">{t("week")}</TabsTrigger>
                            <TabsTrigger value="month">{t("month")}</TabsTrigger>
                            <TabsTrigger value="year">{t("year")}</TabsTrigger>
                            <TabsTrigger value="all">{t("all")}</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="week" className="mt-0">
                        <InvestmentChart timeframe="week" investments={investments} />
                    </TabsContent>

                    <TabsContent value="month" className="mt-0">
                        <InvestmentChart timeframe="month" investments={investments} />
                    </TabsContent>

                    <TabsContent value="year" className="mt-0">
                        <InvestmentChart timeframe="year" investments={investments} />
                    </TabsContent>

                    <TabsContent value="all" className="mt-0">
                        <InvestmentChart timeframe="all" investments={investments} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

