"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EnvironmentalImpact } from "@/lib/types"
import { useTranslation } from "@/lib/i18n"

interface EnvironmentalImpactSectionProps {
    impact: EnvironmentalImpact | null
}

export function EnvironmentalImpactSection({ impact }: EnvironmentalImpactSectionProps) {
    const { t } = useTranslation()

    if (!impact) return null

    const { co2Reduction, familiesBenefited, hectaresPreserved } = impact

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("environmentalImpact", {rate: (growthRate * 0.5).toFixed(1)})}</CardTitle>
                <CardDescription>{t("yourPositiveImpact", {rate: (growthRate * 0.5).toFixed(1)})}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-[300px] w-full">
                    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ filter: "blur(30px)" }}>
                        <defs>
                            {/* Gradients for each blob */}
                            <radialGradient id="gradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="gradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                            </radialGradient>
                        </defs>

                        {/* Background blobs */}
                        <circle cx="200" cy="150" r="120" fill="url(#gradient1)" />
                        <circle cx="160" cy="180" r="100" fill="url(#gradient2)" />
                        <circle cx="240" cy="140" r="90" fill="url(#gradient3)" />
                    </svg>

                    {/* Overlay content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            {/* CO2 Reduction */}
                            <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-lg">
                                    <div className="text-2xl font-bold text-green-600">{co2Reduction}</div>
                                    <div className="text-xs text-muted-foreground">{t("tons", {rate: (growthRate * 0.5).toFixed(1)})} CO₂</div>
                                </div>
                            </div>

                            {/* Hectares Preserved */}
                            <div className="absolute left-1/4 top-2/3 -translate-x-1/2 -translate-y-1/2 text-center">
                                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-lg">
                                    <div className="text-2xl font-bold text-blue-600">{hectaresPreserved}</div>
                                    <div className="text-xs text-muted-foreground">ha</div>
                                </div>
                            </div>

                            {/* Families Benefited */}
                            <div className="absolute right-1/4 top-2/3 translate-x-1/2 -translate-y-1/2 text-center">
                                <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-4 shadow-lg">
                                    <div className="text-2xl font-bold text-purple-600">{familiesBenefited}</div>
                                    <div className="text-xs text-muted-foreground">{t("families", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{t("co2Reduction", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                        <div className="text-xs text-muted-foreground">{t("environmentalMetric1", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-blue-600">{t("hectaresPreserved", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                        <div className="text-xs text-muted-foreground">{t("environmentalMetric2", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-medium text-purple-600">{t("familiesBenefited", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                        <div className="text-xs text-muted-foreground">{t("environmentalMetric3", {rate: (growthRate * 0.5).toFixed(1)})}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

