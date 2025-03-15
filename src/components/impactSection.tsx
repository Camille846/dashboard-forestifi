"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EnvironmentalImpact } from "@/lib/types"
import { EnvironmentalImpactChart } from "@/components/charts/pieChart"
import { useTranslation } from "@/lib/i18n"

interface EnvironmentalImpactSectionProps {
    impact: EnvironmentalImpact | null
}

export function EnvironmentalImpactSection({ impact }: EnvironmentalImpactSectionProps) {
    const { t } = useTranslation()

    if (!impact) return null

    const { co2Reduction, familiesBenefited, waterConservation, hectaresPreserved } = impact

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("environmentalImpact")}</CardTitle>
                <CardDescription>{t("yourPositiveImpact")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-14">
                    <EnvironmentalImpactChart impact={impact} />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary text-forestiYellow text-forestiYellow flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-"
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
                            <span className="text-sm">{t("co2Reduction")}</span>
                        </div>
                        <span className="font-medium">
              {co2Reduction.toLocaleString()} {t("tons")}
            </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary text-forestiYellow flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-"
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
                            <span className="text-sm">{t("familiesBenefited")}</span>
                        </div>
                        <span className="font-medium">{familiesBenefited.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary text-forestiYellow flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-"
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
                            <span className="text-sm">{t("waterConservation")}</span>
                        </div>
                        <span className="font-medium">{waterConservation.toLocaleString()} m³</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary text-forestiYellow flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-"
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
                            <span className="text-sm">{t("hectaresPreserved")}</span>
                        </div>
                        <span className="font-medium">{hectaresPreserved.toLocaleString()} ha</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

