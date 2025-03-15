import type { EnvironmentalImpact } from "./types"
import type { Investment } from "./types"

// Mock API Funções
export async function fetchInvestments(): Promise<Investment[]> {
    // Simular atraso na API
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Retorna dados fictícios
    return [
        {
            id: "inv-001",
            name: "Guaraná Urupadí",
            type: "GUA",
            issuer: "AAFAU",
            amount: 25000,
            currentValue: 28750,
            purchaseDate: new Date("2023-01-15"),
            location: "Amazonas, Brazil",
            carbonCredits: 125,
            transactions: [
                {
                    id: "tx-001",
                    description: "GUA1 Guarana Selvagem Amazonas",
                    amount: 25000,
                    date: new Date("2023-01-01"),
                    type: "buy",
                },
                {
                    id: "tx-002",
                    description: "GUA2 Guarana Selvagem Amazonas",
                    amount: 750,
                    date: new Date("2024-04-01"),
                    type: "dividend",
                },
            ],
        },
        {
            id: "inv-002",
            name: "Pirarucu de Manejo",
            type: "PIR",
            issuer: "Apoena",
            amount: 15000,
            currentValue: 16200,
            purchaseDate: new Date("2025-02-01"),
            location: "Manaus, Brazil",
            carbonCredits: 75,
            transactions: [
                {
                    id: "tx-003",
                    description: "Pirarucu de Manejo Amazonas",
                    amount: 15000,
                    date: new Date("2023-03-01"),
                    type: "buy",
                },
            ],
        },
        {
            id: "inv-003",
            name: "Cacau-selvagem",
            type: "CAC",
            issuer: "Na'kau",
            amount: 18500,
            currentValue: 19800,
            purchaseDate: new Date("2023-05-01"),
            location: "Pará, Brazil",
            carbonCredits: 92,
            transactions: [
                {
                    id: "tx-004",
                    description: "Cacau-selvagem Pará",
                    amount: 18500,
                    date: new Date("2023-05-01"),
                    type: "buy",
                },
                {
                    id: "tx-005",
                    description: "Cacau-selvagem Pará",
                    amount: 550,
                    date: new Date("2024-08-01"),
                    type: "dividend",
                },
            ],
        },
        {
            id: "inv-004",
            name: "Guaraná Urupadí",
            type: "GUA",
            issuer: "AAFAU",
            amount: 12000,
            currentValue: 13800,
            purchaseDate: new Date("2023-07-01"),
            location: "Amazonas, Brazil",
            carbonCredits: 60,
            transactions: [
                {
                    id: "tx-006",
                    description: "GUA2 Guarana Selvagem Amazonas",
                    amount: 12000,
                    date: new Date("2023-07-01"),
                    type: "buy",
                },
            ],
        },
    ]
}
export async function fetchEnvironmentalImpact(): Promise<EnvironmentalImpact> {
    // Simular atraso na API
    await new Promise((resolve) => setTimeout(resolve, 600))

    // retorna dados fictícios
    return {
        co2Reduction: 352,
        familiesBenefited: 28,
        waterConservation: 12500,
        hectaresPreserved: 50,
        historicalData: [
            { date: "2023-01", co2Reduction: 25 },
            { date: "2023-02", co2Reduction: 48 },
            { date: "2023-03", co2Reduction: 75 },
            { date: "2023-04", co2Reduction: 110 },
            { date: "2023-05", co2Reduction: 145 },
            { date: "2023-06", co2Reduction: 185 },
            { date: "2023-07", co2Reduction: 230 },
            { date: "2023-08", co2Reduction: 275 },
            { date: "2023-09", co2Reduction: 310 },
            { date: "2023-10", co2Reduction: 352 },
        ],
    }
}