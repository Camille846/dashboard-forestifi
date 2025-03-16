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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [timeframe, setTimeframe] = useState("month")

    const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0)
    const totalReturn = investments.reduce((sum, inv) => sum + (inv.currentValue - inv.amount), 0)
    const returnPercentage = (totalReturn / totalInvested) * 100
    const isPositiveReturn = totalReturn >= 0

    const totalCarbonCredits = investments.reduce((sum, inv) => sum + (inv.carbonCredits || 0), 0)

    return (
        <Card className="shadow-sm 2xl:w-[75%] lg:w-[70%] 2xl:ml-10">
            <CardHeader className="pb-2">
                <CardTitle>{t("investmentOverview")}</CardTitle>
                <CardDescription>{t("trackYourInvestments")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 lg:mb-2 2xl:mb-6">
                    <Card className="bg-primary lg:py-2 2xl:py-6">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white">{t("totalInvested")}</p>
                                    <h3 className="text-lg 2xl:text-2xl font-bold text-forestiYellow dark:text-forestiGreen">{formatCurrency(totalInvested)}</h3>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-green-500/10 dark:bg-foreground/10 flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-forestiYellow dark:text-forestiGreen" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary lg:py-2 2xl:py-6">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white">{t("totalReturn")}</p>
                                    <h3 className="text-lg 2xl:text-2xl font-bold flex items-center text-forestiYellow dark:text-forestiGreen">
                                        {formatCurrency(totalReturn)}
                                        {isPositiveReturn ? (
                                            <ArrowUpRight className="h-4 w-4 text-white ml-1" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4 text-forestiOrange ml-1" />
                                        )}
                                    </h3>
                                    <p className={`text-xs ${isPositiveReturn ? "text-white" : "text-forestiOrange"}`}>
                                        {returnPercentage.toFixed(2)}%
                                    </p>
                                </div>
                                <div
                                    className={`h-10 w-10 rounded-full ${isPositiveReturn ? "bg-green-500/10 dark:bg-foreground/10" : "bg-forestiOrange/10"} flex items-center justify-center`}
                                >
                                    <TrendingUp className={`h-5 w-5 ${isPositiveReturn ? "text-forestiYellow dark:text-forestiGreen" : "text-forestiOrange"}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary lg:py-2 2xl:py-6">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white">{t("carbonCredits")}</p>
                                    <h3 className="text-lg 2xl:text-2xl font-bold text-forestiYellow dark:text-forestiGreen">{totalCarbonCredits.toLocaleString()}</h3>
                                    <p className="text-xs text-white">{t("tonsCO2Offset")}</p>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-green-500/10 dark:bg-foreground/10 flex items-center justify-center">
                                    <svg
                                        className="h-5 w-5 text-forestiYellow dark:text-forestiGreen"
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
                    <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-3 mb-4">
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

