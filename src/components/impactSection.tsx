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
        <Card className="shadow-sm lg:w-[30%] card dark:bg-primary">
            <CardHeader className="pb-2">
                <CardTitle>{t("environmentalImpact")}</CardTitle>
                <CardDescription>{t("yourPositiveImpact")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-[300px] w-full">
                    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ filter: "blur(30px)" }}>
                        <defs>
                            {/* Gradients */}
                            <radialGradient id="gradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#2D4F4A" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#2D4F4A" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#78D484" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#78D484" stopOpacity="0.1" />
                            </radialGradient>
                            <radialGradient id="gradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#FFF085" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#FFF085" stopOpacity="0.1" />
                            </radialGradient>
                        </defs>

                        {/* Background blobs */}
                        <circle cx="200" cy="150" r="120" fill="url(#gradient1)" />
                        <circle cx="160" cy="180" r="120" fill="url(#gradient2)" />
                        <circle cx="240" cy="140" r="120" fill="url(#gradient3)" />
                    </svg>

                    {/* Overlay */}
                    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="bg-forestiYellow rounded-full p-6 shadow-lg w-32 h-32 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-primary">{co2Reduction}</div>
                            <div className="text-xs text-primary">{t("tons")} CO₂</div>
                        </div>
                    </div>

                    <div className="absolute left-1/4 top-2/3 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="bg-primary dark:bg-forestiGreen rounded-full p-4 shadow-lg w-32 h-32 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-white dark:text-primary">{hectaresPreserved}</div>
                            <div className="text-xs text-white">hectares</div>
                        </div>
                    </div>

                    <div className="absolute right-1/4 top-2/3 translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="bg-forestiOrange rounded-full p-4 shadow-lg w-32 h-32 flex flex-col items-center justify-center">
                            <div className="text-2xl font-bold text-black dark:text-primary">{familiesBenefited}</div>
                            <div className="text-xs text-black dark:text-primary">{t("familiesBenefited")}</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-yellow-500"
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
                            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-green-500"
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

                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center mr-2">
                                <svg
                                    className="h-4 w-4 text-orange-500"
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
                </div>
            </CardContent>
        </Card>
    )
}

