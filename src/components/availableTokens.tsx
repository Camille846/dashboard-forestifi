import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, ArrowUpRight, TrendingUp, ShoppingCart, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Leaf } from "lucide-react"
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
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import { toast } from "sonner";

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
    const [currentIndex, setCurrentIndex] = useState(0)

    const handleSimulate = (token: TokenStock) => {
        setSelectedToken(token)
        setInvestmentAmount(token.value) // Default to one token
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
            case "GUA 2":
                return "/logoGua.png"
            case "PIR 2":
                return "/logoPir.jpg"
            default:
                return ""
        }
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % availableTokens.length)
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + availableTokens.length) % availableTokens.length)
    }

    const currentToken = availableTokens[currentIndex]

    return (
        <>
            <Card className="shadow-sm w-full lg:w-[50%] 2xl:w-[30%] card">
                <CardHeader className="pb-2">
                    <CardTitle>{t("availableTokens")}</CardTitle>
                    <CardDescription>{t("availableTokensDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                            <Button
                                variant="ghost"
                                className="absolute left-3 top-2 hover:text-forestiYellow hover:bg-transparent hover:scale-110 transform transition-transform cursor-pointer p-0 hover:bg-primary"
                                onClick={handlePrev}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" className="absolute right-3 top-2 hover:text-forestiYellow hover:bg-transparent hover:scale-110 transform transition-transform cursor-pointer p-0 hover:bg-primary" onClick={handleNext}>
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="border-2 border-primary w-12 h-12">
                                                <AvatarImage src={getLogoSrc(currentToken.name)} alt={currentToken.name} />
                                            </Avatar>
                                            <h3 className="text-2xl font-bold text-primary dark:text-white">{currentToken.name}</h3>
                                        </div>
                                        <p className="text-sm text-black dark:text-forestiYellow">
                                            {t("tokenValue")}: {formatCurrency(currentToken.value)}
                                        </p>
                                    </div>
                                    {currentToken.trend && (
                                        <div
                                            className={`flex items-center ${
                                                currentToken.trend === "up"
                                                    ? "text-forestiGreen"
                                                    : currentToken.trend === "down"
                                                        ? "text-forestiOrange"
                                                        : "text-forestiYellow"
                                            }`}
                                        >
                                            {currentToken.trend === "up" && <ArrowUpRight className="h-4 w-4" />}
                                            {currentToken.trendValue !== 0 && (
                                                <span className="text-sm font-medium ml-1">
                                                    {currentToken.trend === "up" ? "+" : ""}
                                                    {currentToken.trendValue}%
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-muted-foreground">{t("sold")}</span>
                                            <span className="text-sm font-medium">{currentToken.percentageSold}%</span>
                                        </div>
                                        <Progress value={currentToken.percentageSold} className="h-2" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{t("captured")}</p>
                                            <p className="text-sm font-medium">{formatCurrency(currentToken.captured)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">{t("fees")}</p>
                                            <p className="text-sm font-medium">{currentToken.fees}%</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between pt-4 border-t">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 text-primary dark:text-forestiYellow mr-2" />
                                            <span className="text-sm">
                                                {currentToken.buyers} {t("buyers")}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Leaf className="h-4 w-4 text-primary dark:text-forestiYellow mr-2" />
                                            <span className="text-sm">
                                                {currentToken.tokensSold.toLocaleString()} {t("tokensSold")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-[.5rem] lg:gap-2 mt-4 ">
                                        <Button variant="outline" className="w-full bg-forestiOrange dark:bg-forestiOrange dark:hover:bg-forestiOrange/70 text-xs lg:text-base text-white hover:bg-forestiOrange/70 cursor-pointer" onClick={() => handleSimulate(currentToken)}>
                                            <TrendingUp className="h-4 w-4 mr-2" />
                                            {t("simulate")}
                                        </Button>
                                        <Button className="w-full cursor-pointer dark:bg-forestiGreen dark:hover:bg-forestiGreen/70 text-xs lg:text-base " onClick={() => handleBuy(currentToken)}>
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            {t("buy")}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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
                                        <p className="font-medium text-forestiGreen">
                                            {formatCurrency(calculateReturn(investmentAmount, selectedToken.fees))}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-left">{t("projectedGain")}</Label>
                                    <div className="col-span-3">
                                        <p className="font-medium text-forestiGreen">
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
                        <Button variant="outline" onClick={() => setSimulateDialogOpen(false)} className="cursor-pointer">
                            {t("close")}
                        </Button>
                        <Button
                            onClick={() => {
                                setSimulateDialogOpen(false)
                                if (selectedToken) handleBuy(selectedToken)
                            }}
                            className="cursor-pointer dark:bg-forestiGreen dark:hover:bg-forestiGreen/70"
                        >
                            {t("proceedToBuy")}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}