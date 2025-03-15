"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Coins, ArrowUpRight, TrendingUp, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"

interface TokenStock {
    id: string
    name: string
    percentageSold: number
    captured: number
    value: number
    fees: number
    buyers: number
    tokensSold: number
    trend?: "up" | "down" | "stable"
    trendValue?: number
}

const availableTokens: TokenStock[] = [
    {
        id: "gua2",
        name: "GUA 2",
        percentageSold: 75,
        captured: 105000,
        value: 25.0,
        fees: 9.6,
        buyers: 46,
        tokensSold: 4200,
        trend: "up",
        trendValue: 2.5,
    },
    {
        id: "pir2",
        name: "PIR 2",
        percentageSold: 5,
        captured: 37800,
        value: 25.0,
        fees: 8.26,
        buyers: 57,
        tokensSold: 1512,
        trend: "stable",
        trendValue: 0,
    },
]

export function AvailableTokens() {
    const { t } = useTranslation()
    const [simulateDialogOpen, setSimulateDialogOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState<TokenStock | null>(null)
    const [investmentAmount, setInvestmentAmount] = useState<number>(25)

    const handleSimulate = (token: TokenStock) => {
        setSelectedToken(token)
        setInvestmentAmount(token.value) // Default to one token
        setSimulateDialogOpen(true)
    }

    const handleBuy = (token: TokenStock) => {
        // In a real application, this would navigate to a purchase flow
        // or open a purchase dialog
        alert(`Initiating purchase of ${token.name} token`)
    }

    const calculateReturn = (amount: number, feePercentage: number) => {
        const returnAmount = amount * (1 + feePercentage / 100)
        return returnAmount
    }

    const calculateGain = (amount: number, feePercentage: number) => {
        return amount * (feePercentage / 100)
    }

    return (
        <>
            <Card className="shadow-sm h-full">
                <CardHeader className="pb-2">
                    <CardTitle>{t("availableTokens")}</CardTitle>
                    <CardDescription>{t("availableTokensDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {availableTokens.map((token) => (
                            <Card key={token.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold">{token.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {t("tokenValue")}: {formatCurrency(token.value)}
                                            </p>
                                        </div>
                                        {token.trend && (
                                            <div
                                                className={`flex items-center ${
                                                    token.trend === "up"
                                                        ? "text-green-500"
                                                        : token.trend === "down"
                                                            ? "text-red-500"
                                                            : "text-yellow-500"
                                                }`}
                                            >
                                                {token.trend === "up" && <ArrowUpRight className="h-4 w-4" />}
                                                {token.trendValue !== 0 && (
                                                    <span className="text-sm font-medium ml-1">
                            {token.trend === "up" ? "+" : ""}
                                                        {token.trendValue}%
                          </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm text-muted-foreground">{t("sold")}</span>
                                                <span className="text-sm font-medium">{token.percentageSold}%</span>
                                            </div>
                                            <Progress value={token.percentageSold} className="h-2" />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">{t("captured")}</p>
                                                <p className="text-sm font-medium">{formatCurrency(token.captured)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground mb-1">{t("fees")}</p>
                                                <p className="text-sm font-medium">{token.fees}%</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                                                <span className="text-sm">
                          {token.buyers} {t("buyers")}
                        </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Coins className="h-4 w-4 text-muted-foreground mr-2" />
                                                <span className="text-sm">
                          {token.tokensSold.toLocaleString()} {t("tokensSold")}
                        </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mt-4">
                                            <Button variant="outline" className="w-full" onClick={() => handleSimulate(token)}>
                                                <TrendingUp className="h-4 w-4 mr-2" />
                                                {t("simulate")}
                                            </Button>
                                            <Button className="w-full" onClick={() => handleBuy(token)}>
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                {t("buy")}
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={simulateDialogOpen} onOpenChange={setSimulateDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t("simulateInvestment")}</DialogTitle>
                        <DialogDescription>
                            {selectedToken &&
                                t("simulateInvestmentDesc", { token: selectedToken.name, fee: selectedToken.fees.toString() })}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="investment" className="text-right">
                                {t("investment")}
                            </Label>
                            <div className="col-span-3">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <Input
                                        id="investment"
                                        type="number"
                                        value={investmentAmount}
                                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                        className="pl-7"
                                        min={selectedToken?.value || 25}
                                        step={selectedToken?.value || 25}
                                    />
                                </div>
                            </div>
                        </div>

                        {selectedToken && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">{t("tokens")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium">{(investmentAmount / selectedToken.value).toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">{t("projectedReturn")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium text-green-500">
                                            {formatCurrency(calculateReturn(investmentAmount, selectedToken.fees))}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">{t("projectedGain")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium text-green-500">
                                            +{formatCurrency(calculateGain(investmentAmount, selectedToken.fees))}
                                            <span className="text-sm text-muted-foreground ml-2">({selectedToken.fees}%)</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-muted p-3 rounded-md mt-2">
                                    <p className="text-sm">
                                        {t("simulationNote", {
                                            investment: formatCurrency(investmentAmount),
                                            return: formatCurrency(calculateReturn(investmentAmount, selectedToken.fees)),
                                            gain: formatCurrency(calculateGain(investmentAmount, selectedToken.fees)),
                                            fee: selectedToken.fees.toString(),
                                        })}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSimulateDialogOpen(false)}>
                            {t("close")}
                        </Button>
                        <Button
                            onClick={() => {
                                setSimulateDialogOpen(false)
                                if (selectedToken) handleBuy(selectedToken)
                            }}
                        >
                            {t("proceedToBuy")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

