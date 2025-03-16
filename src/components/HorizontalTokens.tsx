import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, ShoppingCart, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"
import { formatCurrency } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
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
import { toast } from "sonner"

interface TokenStock {
    id: string
    name: string
    percentageSold: number
    value: number
    fees: number
    trend?: "up" | "down" | "stable"
    trendValue?: number
}

const tokens: TokenStock[] = [
    {
        id: "gua1",
        name: "GUA 1",
        percentageSold: 75,
        value: 25.0,
        fees: 9.6,
        trend: "up",
        trendValue: 2.5,
    },
    {
        id: "pir1",
        name: "PIR 1",
        percentageSold: 5,
        value: 25.0,
        fees: 8.26,
        trend: "stable",
        trendValue: 0,
    },
    {
        id: "cac1",
        name: "CAC 1",
        percentageSold: 10,
        value: 25.0,
        fees: 7.5,
        trend: "down",
        trendValue: -1.5,
    },
    {
        id: "gua2",
        name: "GUA 2",
        percentageSold: 12,
        value: 25.0,
        fees: 9.6,
    },
    {
        id: "pir2",
        name: "PIR 2",
        percentageSold: 10,
        value: 25.0,
        fees: 8.26,
    },
]

export function HorizontalTokens() {
    const { t } = useTranslation()
    const [simulateDialogOpen, setSimulateDialogOpen] = useState(false)
    const [selectedToken, setSelectedToken] = useState<TokenStock | null>(null)
    const [investmentAmount, setInvestmentAmount] = useState<number>(25)

    const handleSimulate = (token: TokenStock) => {
        setSelectedToken(token)
        setInvestmentAmount(token.value)
        setSimulateDialogOpen(true)
    }

    const handleBuy = (token: TokenStock) => {
        toast(t("initiatingPurchase", { token: token.name }), {
            description: t("purchaseDescription", { token: token.name }),
            action: {
                label: t("undo"),
                onClick: () => console.log(t("undo")),
            },
        })
    }

    const calculateReturn = (amount: number, feePercentage: number) => {
        const returnAmount = amount * (1 + feePercentage / 100)
        return returnAmount
    }

    const calculateGain = (amount: number, feePercentage: number) => {
        return amount * (feePercentage / 100)
    }

    const getLogoSrc = (name: string) => {
        switch (name) {
            case "GUA 1":
                return "/logoGua.png"
            case "PIR 1":
                return "/logoPir.jpg"
            case "CAC 1":
                return "/logoCac.png"
            case "GUA 2":
                return "/logoGua.png"
            case "PIR 2":
                return "/logoPir.jpg"
            default:
                return ""
        }
    }

    return (
        <>
        <div className="w-full overflow-x-auto mt-5 lg:mx-10 2xl:mx-32">
            <div className="grid grid-cols-2 sm:grid-cols-none sm:flex sm:flex-row gap-4 min-w-full sm:min-w-0">
                {tokens.map((token) => (
                    <Card key={token.id} className="w-full sm:w-[150px] shrink-0">
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {/* Avatar e Nome */}
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-8 h-8 border-2 border-primary">
                                        <AvatarImage src={getLogoSrc(token.name)} alt={token.name} />
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-primary text-sm">{token.name}</h3>
                                        <p className="text-xs font-medium">
                                            {formatCurrency(token.value)}
                                        </p>
                                    </div>
                                </div>

                                {/* Porcentagem Vendida */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">{t("sold")}</span>
                                        <span>{token.percentageSold}%</span>
                                    </div>
                                    <Progress value={token.percentageSold} className="h-1" />
                                </div>

                                {/* Fees */}
                                <div className="text-xs">
                                    <span className="text-muted-foreground">{t("fees")}: </span>
                                    <span className="font-medium text-green-500">+{token.fees}%</span>
                                </div>

                                {/* Botões */}
                                <div className="flex flex-col gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="w-full bg-forestiOrange text-white hover:bg-forestiOrange/70"
                                        onClick={() => handleSimulate(token)}
                                    >
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        {t("simulate")}
                                    </Button>
                                    <Button 
                                        size="sm"
                                        className="w-full dark:bg-forestiGreen dark:hover:bg-forestiGreen/70"
                                        onClick={() => handleBuy(token)}
                                    >
                                        <ShoppingCart className="h-3 w-3 mr-1" />
                                        {t("buy")}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
        {/* Dialog de Simulação */}
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
                            <div className="col-span-3 text-xs lg:text-base">
                                <div className="relative text-xs lg:text-base">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                    <div className="relative">
                                        <Input
                                            id="investment"
                                            type="text"
                                            value={investmentAmount}
                                            className="pl-7 pr-8"
                                            readOnly
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
                                            <button
                                                type="button"
                                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                                onClick={() => setInvestmentAmount(prev => prev + (selectedToken?.value || 25))}
                                            >
                                                <ChevronUp className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                                onClick={() => setInvestmentAmount(prev => Math.max(selectedToken?.value || 25, prev - (selectedToken?.value || 25)))}
                                            >
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedToken && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-left">{t("tokens")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium">{(investmentAmount / selectedToken.value)}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-left">{t("projectedReturn")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium text-green-500">
                                            {formatCurrency(calculateReturn(investmentAmount, selectedToken.fees))}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-left">{t("projectedGain")}</Label>
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
