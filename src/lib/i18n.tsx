"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define translations
const translations = {
    en: {
        loading: "Loading...",
        forestiFi: "ForestiFi",
        searchPlaceholder: "Search investments, assets or transactions...",
        toggleLanguage: "Toggle language",
        toggleTheme: "Toggle theme",
        notifications: "Notifications",
        dashboard: "Dashboard",
        investments: "Investments",
        environmentalImpact: "Environmental Impact of Investments",
        transactions: "Transactions",
        settings: "Settings",
        help: "Help",
        logout: "Logout",
        investmentOverview: "Investment Overview",
        trackYourInvestments: "Track your sustainable investments",
        totalInvested: "Total Invested",
        totalReturn: "Total Return",
        carbonCredits: "Carbon Credits",
        tonsCO2Offset: "Tons of CO2 offset",
        investmentPerformance: "Investment Performance",
        week: "Week",
        month: "Month",
        year: "Year",
        all: "All",
        portfolioValue: "Portfolio Value",
        yourPositiveImpact: "Your positive impact on the environment",
        co2Reduction: "CO2 Reduction",
        familiesBenefited: "Families benefited",
        waterConservation: "Water Conservation",
        hectaresPreserved: "Hectares preserved",
        tons: "tons",
        investmentPortfolio: "Investment Portfolio",
        yourNaturalAssets: "Your natural assets in the Amazon",
        assetName: "Asset Name",
        type: "Type",
        invested: "Invested",
        currentValue: "Current Value",
        return: "Return",
        purchaseDate: "Purchase Date",
        recentTransactions: "Recent Transactions",
        latestActivity: "Latest activity in your portfolio",
        noRecentTransactions: "No recent transactions",
    },
    pt: {
        loading: "Carregando...",
        forestiFi: "ForestiFi",
        searchPlaceholder: "Buscar investimentos, ativos ou transações...",
        toggleLanguage: "Alternar idioma",
        toggleTheme: "Alternar tema",
        notifications: "Notificações",
        dashboard: "Painel",
        investments: "Investimentos",
        environmentalImpact: "Impacto Ambiental dos Investimentos",
        transactions: "Transações",
        settings: "Configurações",
        help: "Ajuda",
        logout: "Sair",
        investmentOverview: "Visão Geral de Investimentos",
        trackYourInvestments: "Acompanhe seus investimentos sustentáveis",
        totalInvested: "Total Investido",
        totalReturn: "Retorno Total",
        carbonCredits: "Créditos de Carbono",
        tonsCO2Offset: "Toneladas de CO2 compensadas",
        investmentPerformance: "Desempenho do Investimento",
        week: "Semana",
        month: "Mês",
        year: "Ano",
        all: "Todos",
        portfolioValue: "Valor da Carteira",
        yourPositiveImpact: "Seu impacto positivo no meio ambiente",
        co2Reduction: "Redução de CO2",
        familiesBenefited: "Famílias beneficiadas",
        waterConservation: "Conservação de Água",
        hectaresPreserved: "Hectares preservados",
        tons: "toneladas",
        investmentPortfolio: "Carteira de Investimentos",
        yourNaturalAssets: "Seus ativos naturais na Amazônia",
        assetName: "Nome do Ativo",
        type: "Tipo",
        invested: "Investido",
        currentValue: "Valor Atual",
        return: "Retorno",
        purchaseDate: "Data de Compra",
        recentTransactions: "Transações Recentes",
        latestActivity: "Atividade recente em sua carteira",
        noRecentTransactions: "Sem transações recentes",
    },
}

// Create context
type TranslationContextType = {
    t: (key: string) => string
    locale: string
    setLocale: (locale: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Provider component
export function TranslationProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<string>("pt")

    const t = (key: string): string => {
        return translations[locale as keyof typeof translations]?.[key as keyof (typeof translations)["en"]] || key
    }

    return <TranslationContext.Provider value={{ t, locale, setLocale }}>{children}</TranslationContext.Provider>
}

// Hook for using translations
export function useTranslation() {
    const context = useContext(TranslationContext)

    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider")
    }

    return context
}

