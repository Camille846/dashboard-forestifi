"use client"
import { useState, useEffect } from "react"
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
import Loading from "@/components/ui/loading"
import { AppSidebar } from "@/components/sidebar"

export default function Dashboard() {
    const [investments, setInvestments] = useState<Investment[]>([])
    const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([])
    const [environmentalImpact, setEnvironmentalImpact] = useState<EnvironmentalImpact | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [selectedComponent, setSelectedComponent] = useState<string>("overview")
    const { theme, setTheme } = useTheme()
    const { locale, setLocale } = useTranslation()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
            const filtered = investments.filter((_, index) => {
                let mockTokenType: string
                switch (index) {
                    case 0:
                        mockTokenType = "gua1"
                        break
                    case 1:
                        mockTokenType = "gua2"
                        break
                    case 2:
                        mockTokenType = "pir1"
                        break
                    case 3:
                        mockTokenType = "pir2"
                        break
                    case 4:
                        mockTokenType = "cac1"
                        break
                    default:
                        mockTokenType = "gua1"
                }
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

    const renderComponent = () => {
        switch (selectedComponent) {
            case "overview":
                return (
                    <div className="flex flex-col lg:flex-row gap-5 justify-center lg:w-[85vw]">
                        <InvestmentOverview investments={filteredInvestments} />
                        <EnvironmentalImpactSection impact={environmentalImpact} />
                    </div>
                )
            case "portfolio":
                return (
                    <div className="flex gap-5 justify-center w-[85vw]">
                        <InvestmentPortfolio investments={filteredInvestments} />
                        <RecentTransactions transactions={filteredInvestments.flatMap((inv) => inv.transactions || [])} />
                    </div>
                )
            case "earnings":
                return (
                    <div className="flex gap-5 justify-center w-[85vw]">
                        <FutureEarnings investments={filteredInvestments} />
                        <AvailableTokens />
                    </div>
                )
            default:
                return <InvestmentOverview investments={filteredInvestments} />
        }
    }

    return (
        <div className="flex">
            <AppSidebar setSelectedComponent={setSelectedComponent} isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="flex-1">
                <DashboardHeader
                    toggleTheme={toggleTheme}
                    currentTheme={theme || "light"}
                    toggleLanguage={toggleLanguage}
                    currentLanguage={locale}
                />
                <div className="container mx-4 px-4">
                    <div className="mt-6">
                        <TokenFilter onFilterChange={handleTokenFilterChange} />
                    </div>
                    <div className="mt-8">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    )
}