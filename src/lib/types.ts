export interface Investment {
    id: string
    name: string
    type: "Forest" | "Water" | "Biodiversity"
    amount: number
    currentValue: number
    purchaseDate: string
    location: string
    carbonCredits: number
    transactions?: Transaction[]
}

export interface Transaction {
    id: string
    description: string
    amount: number
    date: string
    type: "buy" | "dividend" | "sell"
}

export interface EnvironmentalImpact {
    co2Reduction: number
    familiesBenefited: number
    waterConservation: number
    hectaresPreserved: number
    historicalData: {
        date: string
        co2Reduction: number
    }[]
}


