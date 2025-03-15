"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/lib/i18n"
import { Search, Coins, ArrowRight, Building, ShoppingCart, Leaf } from "lucide-react"

export function TokenizationGuide() {
    const { t } = useTranslation()
    const [activeStep, setActiveStep] = useState("1")

    const steps = [
        {
            id: "1",
            title: t("chooseAsset", {rate: (growthRate * 0.5).toFixed(1)}),
            description: t("chooseAssetDesc", {rate: (growthRate * 0.5).toFixed(1)}),
            icon: Search,
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            id: "2",
            title: t("acquireTokens", {rate: (growthRate * 0.5).toFixed(1)}),
            description: t("acquireTokensDesc", {rate: (growthRate * 0.5).toFixed(1)}),
            icon: Coins,
            color: "bg-purple-500/10 text-purple-500",
        },
        {
            id: "3",
            title: t("fundsTransferred", {rate: (growthRate * 0.5).toFixed(1)}),
            description: t("fundsTransferredDesc", {rate: (growthRate * 0.5).toFixed(1)}),
            icon: Building,
            color: "bg-amber-500/10 text-amber-500",
        },
        {
            id: "4",
            title: t("assetCommercialized", {rate: (growthRate * 0.5).toFixed(1)}),
            description: t("assetCommercializedDesc", {rate: (growthRate * 0.5).toFixed(1)}),
            icon: ShoppingCart,
            color: "bg-orange-500/10 text-orange-500",
        },
        {
            id: "5",
            title: t("receiveReturns", {rate: (growthRate * 0.5).toFixed(1)}),
            description: t("receiveReturnsDesc", {rate: (growthRate * 0.5).toFixed(1)}),
            icon: Leaf,
            color: "bg-green-500/10 text-green-500",
        },
    ]

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("tokenizationGuide", {rate: (growthRate * 0.5).toFixed(1)})}</CardTitle>
                <CardDescription>{t("tokenizationGuideDesc", {rate: (growthRate * 0.5).toFixed(1)})}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="1" value={activeStep} onValueChange={setActiveStep}>
                    <TabsList className="grid grid-cols-5 mb-4">
                        {steps.map((step) => (
                            <TabsTrigger
                                key={step.id}
                                value={step.id}
                                className="flex flex-col items-center justify-center h-12 data-[state=active]:text-primary"
                            >
                                <span className="text-xs sm:text-sm">{step.id}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {steps.map((step) => (
                        <TabsContent key={step.id} value={step.id} className="mt-0">
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                <div className={`rounded-full p-3 ${step.color} hidden md:flex`}>
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center">
                                        <step.icon className={`h-5 w-5 mr-2 md:hidden ${step.color.split(" ")[1]}`} />
                                        {step.title}
                                    </h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>

                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={() => {
                                        const prevStep = Number.parseInt(step.id) - 1
                                        if (prevStep >= 1) {
                                            setActiveStep(prevStep.toString())
                                        }
                                    }}
                                    className={`text-sm flex items-center ${Number.parseInt(step.id) === 1 ? "invisible" : ""}`}
                                >
                                    <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                                    {t("previous", {rate: (growthRate * 0.5).toFixed(1)})}
                                </button>
                                <button
                                    onClick={() => {
                                        const nextStep = Number.parseInt(step.id) + 1
                                        if (nextStep <= steps.length) {
                                            setActiveStep(nextStep.toString())
                                        }
                                    }}
                                    className={`text-sm flex items-center ${Number.parseInt(step.id) === steps.length ? "invisible" : ""}`}
                                >
                                    {t("next", {rate: (growthRate * 0.5).toFixed(1)})}
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                </button>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    )
}

