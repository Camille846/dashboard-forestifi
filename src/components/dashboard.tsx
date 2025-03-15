"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { fetchInvestments, fetchEnvironmentalImpact } from "@/lib/api"
import type { Investment, EnvironmentalImpact } from "@/lib/types"
import { DashboardHeader } from "@/components/dashboardHeader"
import { InvestmentOverview } from "@/components/investmentOverview"
import { EnvironmentalImpactSection } from "@/components/impactSection"
import { InvestmentPortfolio } from "@/components/investmentPortfolio"
import { RecentTransactions } from "@/components/recentTransactions"
import { useTranslation } from "@/lib/i18n"

export default function Dashboard() {
    const [investments, setInvestments] = useState<Investment[]>([])
    const [environmentalImpact, setEnvironmentalImpact] = useState<EnvironmentalImpact | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { theme, setTheme } = useTheme()
    const { t, locale, setLocale } = useTranslation()

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const investmentsData = await fetchInvestments()
                const impactData = await fetchEnvironmentalImpact()

                setInvestments(investmentsData)
                setEnvironmentalImpact(impactData)
            } catch (error) {
                console.error("Failed to load dashboard data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const toggleLanguage = () => {
        setLocale(locale === "en" ? "pt" : "en")
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>{t("loading")}</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <DashboardHeader
                toggleTheme={toggleTheme}
                currentTheme={theme || "light"}
                toggleLanguage={toggleLanguage}
                currentLanguage={locale}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <InvestmentOverview investments={investments} />
                </div>
                <div>
                    <EnvironmentalImpactSection impact={environmentalImpact} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <InvestmentPortfolio investments={investments} />
                </div>
                <div>
                    <RecentTransactions transactions={investments.flatMap((inv) => inv.transactions || [])} />
                </div>
            </div>
        </div>
    )
}

