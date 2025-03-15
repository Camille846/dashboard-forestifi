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
import { TokenFilter } from "@/components/tokenFilter"
import { AvailableTokens } from "@/components/availableTokens"
import { FutureEarnings } from "@/components/futureEarnings"
import Loading from "@/components/ui/loading";


export default function Dashboard() {
    const [investments, setInvestments] = useState<Investment[]>([])
    const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([])
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
                setFilteredInvestments(investmentsData)
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

    const handleTokenFilterChange = (selectedTokens: string[]) => {
        if (selectedTokens.length === 0) {
            setFilteredInvestments(investments)
        } else {
            // This is a mock implementation since we don't have token types in our current data model
            // In a real implementation, you would filter based on the token type of each investment
            const filtered = investments.filter((_, index) => {
                // Just for demonstration, we'll use the index to simulate different token types
                const mockTokenType = index === 0 ? "pirarucu" : index === 1 ? "guarana" : index === 2 ? "apoena" : "acai"
                return selectedTokens.includes(mockTokenType)
            })
            setFilteredInvestments(filtered)
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loading />
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

            <div className="mt-6">
                <TokenFilter onFilterChange={handleTokenFilterChange} />
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <InvestmentOverview investments={filteredInvestments} />
                </div>
                <div>
                    <EnvironmentalImpactSection impact={environmentalImpact} />
                </div>
            </div>

            <div className="mt-8">
                <AvailableTokens />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <InvestmentPortfolio investments={filteredInvestments} />
                </div>
                <div>
                    <RecentTransactions transactions={filteredInvestments.flatMap((inv) => inv.transactions || [])} />
                </div>
            </div>

            <div className="mt-8">
                <FutureEarnings investments={filteredInvestments} />
            </div>
        </div>
    )
}

