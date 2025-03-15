import type { Investment, EnvironmentalImpact } from "./types"

// Mock API functions to simulate fetching data from a backend
export async function fetchInvestments(): Promise<Investment[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Return mock data
    return [
        {
            id: "inv-001",
            name: "Amazon Rainforest Conservation",
            type: "Forest",
            amount: 25000,
            currentValue: 28750,
            purchaseDate: "2023-01-15",
            location: "Amazonas, Brazil",
            carbonCredits: 125,
            transactions: [
                {
                    id: "tx-001",
                    description: "Initial investment",
                    amount: 25000,
                    date: "2023-01-15",
                    type: "buy",
                },
                {
                    id: "tx-002",
                    description: "Carbon credit dividend",
                    amount: 750,
                    date: "2023-04-15",
                    type: "dividend",
                },
            ],
        },
        {
            id: "inv-002",
            name: "Rio Negro Watershed Protection",
            type: "Water",
            amount: 15000,
            currentValue: 16200,
            purchaseDate: "2023-03-22",
            location: "Manaus, Brazil",
            carbonCredits: 75,
            transactions: [
                {
                    id: "tx-003",
                    description: "Initial investment",
                    amount: 15000,
                    date: "2023-03-22",
                    type: "buy",
                },
            ],
        },
        {
            id: "inv-003",
            name: "Biodiversity Corridor Project",
            type: "Biodiversity",
            amount: 18500,
            currentValue: 19800,
            purchaseDate: "2023-05-10",
            location: "Pará, Brazil",
            carbonCredits: 92,
            transactions: [
                {
                    id: "tx-004",
                    description: "Initial investment",
                    amount: 18500,
                    date: "2023-05-10",
                    type: "buy",
                },
                {
                    id: "tx-005",
                    description: "Carbon credit dividend",
                    amount: 550,
                    date: "2023-08-10",
                    type: "dividend",
                },
            ],
        },
        {
            id: "inv-004",
            name: "Sustainable Agroforestry",
            type: "Forest",
            amount: 12000,
            currentValue: 13800,
            purchaseDate: "2023-07-05",
            location: "Acre, Brazil",
            carbonCredits: 60,
            transactions: [
                {
                    id: "tx-006",
                    description: "Initial investment",
                    amount: 12000,
                    date: "2023-07-05",
                    type: "buy",
                },
            ],
        },
    ]
}

export async function fetchEnvironmentalImpact(): Promise<EnvironmentalImpact> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Return mock data
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

