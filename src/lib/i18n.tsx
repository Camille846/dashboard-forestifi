"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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
        tokenizationGuide: "Tokenization Guide",
        tokenizationGuideDesc: "Learn how natural asset tokenization works",
        chooseAsset: "Choose a Sustainable Asset",
        chooseAssetDesc:
            "Browse the platform to find available tokenized assets, such as managed Pirarucu fish, Guaraná, or Apoena projects. Each asset represents a real-world sustainable investment opportunity in the Amazon region.",
        acquireTokens: "Acquire Tokens",
        acquireTokensDesc:
            "Investors can purchase fractional tokens (e.g., PIROI tokens for Pirarucu fish management). These tokens represent a share of the total asset and provide access to potential financial returns.",
        fundsTransferred: "Funds Are Transferred",
        fundsTransferredDesc:
            "After the investment phase, the platform transfers the collected funds to the asset's managing entity (e.g., APOENA for Pirarucu). The project owner uses the funds to sustain and grow the sustainable operation.",
        assetCommercialized: "Asset Is Commercialized",
        assetCommercializedDesc:
            "Once the asset (e.g., fish, agricultural products) is sold in the market, it generates revenue. A predefined percentage of the profits is returned to investors.",
        receiveReturns: "Receive Returns",
        receiveReturnsDesc:
            "The platform distributes earnings to token holders based on their investment share. In addition to financial returns, investors contribute to environmental conservation efforts, such as CO₂ reduction and biodiversity protection.",
        previous: "Previous",
        next: "Next",
        futureEarnings: "Future Earnings Projection",
        futureEarningsDesc: "Estimate your potential returns over time",
        projectionYears: "Projection Years",
        years: "years",
        annualGrowthRate: "Annual Growth Rate",
        conservative: "Conservative",
        moderate: "Moderate",
        optimistic: "Optimistic",
        conservativeScenario: "Conservative Scenario",
        conservativeScenarioDesc: "Based on a lower annual growth rate of {rate}%",
        moderateScenario: "Moderate Scenario",
        moderateScenarioDesc: "Based on the expected annual growth rate of {rate}%",
        optimisticScenario: "Optimistic Scenario",
        optimisticScenarioDesc: "Based on a higher annual growth rate of {rate}%",
        projectedValue: "Projected Value",
        projectedReturn: "Projected Return",
        filterByToken: "Filter by Token",
        tokensSelected: "tokens selected",
        searchTokens: "Search tokens...",
        noTokensFound: "No tokens found",
        clearFilters: "Clear filters",
        availableTokens: "Available Tokens",
        availableTokensDesc: "Latest token offerings available for investment",
        tokenValue: "Token Value",
        sold: "Sold",
        captured: "Captured",
        fees: "Fees",
        buyers: "buyers",
        tokensSold: "tokens sold",
        simulate: "Simulate",
        buy: "Buy",
        simulateInvestment: "Simulate Investment",
        simulateInvestmentDesc: "See potential returns for {token} with {fee}% fee",
        investment: "Investment",
        tokens: "Tokens",
        projectedGain: "Projected Gain",
        simulationNote:
            "If you invest {investment}, with a {fee}% fee, you will receive approximately {return}, for a gain of {gain}.",
        close: "Close",
        proceedToBuy: "Proceed to Buy",
        environmentalMetric1: "Total CO₂ reduction achieved",
        environmentalMetric2: "Amazon rainforest area preserved",
        environmentalMetric3: "Local families supported",
        issuer: "Issuer",
        initialInvestment: "Initial investment",
        carbonCreditDividend: "Carbon credit dividend",
        initiatingPurchase: "Initiating purchase process...",
        purchaseDescription: `Congratulations! The purchase of {token} is being processed.`,
        undo: "Undo",
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
        tokenizationGuide: "Guia de Tokenização",
        tokenizationGuideDesc: "Aprenda como funciona a tokenização de ativos naturais",
        chooseAsset: "Escolha um Ativo Sustentável",
        chooseAssetDesc:
            "Navegue pela plataforma para encontrar ativos tokenizados disponíveis, como pirarucu gerenciado, guaraná ou projetos Apoena. Cada ativo representa uma oportunidade de investimento sustentável no mundo real na região amazônica.",
        acquireTokens: "Adquira Tokens",
        acquireTokensDesc:
            "Os investidores podem comprar tokens fracionados (por exemplo, tokens PIROI para manejo de pirarucu). Esses tokens representam uma parte do ativo total e fornecem acesso a potenciais retornos financeiros.",
        fundsTransferred: "Fundos São Transferidos",
        fundsTransferredDesc:
            "Após a fase de investimento, a plataforma transfere os fundos coletados para a entidade gestora do ativo (por exemplo, APOENA para Pirarucu). O proprietário do projeto usa os fundos para sustentar e expandir a operação sustentável.",
        assetCommercialized: "Ativo É Comercializado",
        assetCommercializedDesc:
            "Uma vez que o ativo (por exemplo, peixes, produtos agrícolas) é vendido no mercado, ele gera receita. Uma porcentagem predefinida dos lucros é devolvida aos investidores.",
        receiveReturns: "Receba Retornos",
        receiveReturnsDesc:
            "A plataforma distribui os ganhos aos detentores de tokens com base em sua participação no investimento. Além dos retornos financeiros, os investidores contribuem para os esforços de conservação ambiental, como redução de CO₂ e proteção da biodiversidade.",
        previous: "Anterior",
        next: "Próximo",
        futureEarnings: "Projeção de Ganhos Futuros",
        futureEarningsDesc: "Estime seus retornos potenciais ao longo do tempo",
        projectionYears: "Anos de Projeção",
        years: "anos",
        annualGrowthRate: "Taxa de Crescimento Anual",
        conservative: "Conservador",
        moderate: "Moderado",
        optimistic: "Otimista",
        conservativeScenario: "Cenário Conservador",
        conservativeScenarioDesc: "Baseado em uma taxa de crescimento anual mais baixa de {rate}%",
        moderateScenario: "Cenário Moderado",
        moderateScenarioDesc: "Baseado na taxa de crescimento anual esperada de {rate}%",
        optimisticScenario: "Cenário Otimista",
        optimisticScenarioDesc: "Baseado em uma taxa de crescimento anual mais alta de {rate}%",
        projectedValue: "Valor Projetado",
        projectedReturn: "Retorno Projetado",
        filterByToken: "Filtrar por Token",
        tokensSelected: "tokens selecionados",
        searchTokens: "Buscar tokens...",
        noTokensFound: "Nenhum token encontrado",
        clearFilters: "Limpar filtros",
        availableTokens: "Tokens Disponíveis",
        availableTokensDesc: "Últimas ofertas de tokens disponíveis para investimento",
        tokenValue: "Valor do Token",
        sold: "Vendido",
        captured: "Captado",
        fees: "Taxas",
        buyers: "compradores",
        tokensSold: "tokens vendidos",
        simulate: "Simular",
        buy: "Comprar",
        simulateInvestment: "Simular Investimento",
        simulateInvestmentDesc: "Veja retornos potenciais para {token} com taxa de {fee}%",
        investment: "Investimento",
        tokens: "Tokens",
        projectedGain: "Ganho Projetado",
        simulationNote:
            "Se você investir {investment}, com uma taxa de {fee}%, receberá aproximadamente {return}, para um ganho de {gain}.",
        close: "Fechar",
        proceedToBuy: "Prosseguir para Compra",
        environmentalMetric1: "Redução total de CO₂ alcançada",
        environmentalMetric2: "Área preservada da floresta amazônica",
        environmentalMetric3: "Famílias locais apoiadas",
        issuer: "Emissor",
        initialInvestment: "Investimento inicial",
        carbonCreditDividend: "Dividendo de crédito de carbono",
        initiatingPurchase: "Iniciando processo de compra...",
        purchaseDescription: `Parabéns! A compra de {token} está sendo processada.`,
        undo: "Desfazer",
    },
}

type TranslationContextType = {
    t: (key: string, params?: Record<string, string>) => string
    locale: string
    setLocale: (locale: string) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<string>(() => {
        // Verifica se há uma preferência salva, senão usa "pt" como padrão
        if (typeof window !== 'undefined') {
            return localStorage.getItem('language') || "pt"
        }
        return "pt"
    })

    const handleSetLocale = (newLocale: string) => {
        setLocale(newLocale)
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', newLocale)
        }
    }

    const t = (key: string, params?: Record<string, string>): string => {
        let text = translations[locale as keyof typeof translations]?.[key as keyof (typeof translations)["en"]] || key

        // Replace parameters if provided
        if (params) {
            Object.entries(params).forEach(([param, value]) => {
                text = text.replace(`{${param}}`, value)
            })
        }

        return text
    }

    return <TranslationContext.Provider value={{ t, locale, setLocale: handleSetLocale }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
    const context = useContext(TranslationContext)

    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider")
    }

    return context
}


