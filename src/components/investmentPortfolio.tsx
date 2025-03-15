"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Investment } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"

interface InvestmentPortfolioProps {
    investments: Investment[]
}

export function InvestmentPortfolio({ investments }: InvestmentPortfolioProps) {
    const { t } = useTranslation()
    const [sortBy, setSortBy] = useState<string>("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(column)
            setSortOrder("asc")
        }
    }

    const sortedInvestments = [...investments].sort((a, b) => {
        let comparison = 0

        switch (sortBy) {
            case "name":
                comparison = a.name.localeCompare(b.name)
                break
            case "type":
                comparison = a.type.localeCompare(b.type)
                break
            case "amount":
                comparison = a.amount - b.amount
                break
            case "currentValue":
                comparison = a.currentValue - b.currentValue
                break
            case "return":
                const returnA = ((a.currentValue - a.amount) / a.amount) * 100
                const returnB = ((b.currentValue - b.amount) / b.amount) * 100
                comparison = returnA - returnB
                break
            case "date":
                comparison = new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
                break
            default:
                comparison = 0
        }

        return sortOrder === "asc" ? comparison : -comparison
    })

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("investmentPortfolio")}</CardTitle>
                <CardDescription>{t("yourNaturalAssets")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                                    {t("assetName")} {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>
                                    {t("type")} {sortBy === "type" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("amount")}>
                                    {t("invested")} {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("currentValue")}>
                                    {t("currentValue")} {sortBy === "currentValue" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("return")}>
                                    {t("return")} {sortBy === "return" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                                <TableHead className="cursor-pointer text-right" onClick={() => handleSort("date")}>
                                    {t("purchaseDate")} {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedInvestments.map((investment) => {
                                const returnAmount = investment.currentValue - investment.amount
                                const returnPercentage = (returnAmount / investment.amount) * 100
                                const isPositive = returnAmount >= 0

                                return (
                                    <TableRow key={investment.id}>
                                        <TableCell className="font-medium">{investment.name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    investment.type === "Forest"
                                                        ? "default"
                                                        : investment.type === "Water"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                            >
                                                {investment.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{formatCurrency(investment.amount)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(investment.currentValue)}</TableCell>
                                        <TableCell className={`text-right ${isPositive ? "text-green-500" : "text-red-500"}`}>
                                            {isPositive ? "+" : ""}
                                            {returnPercentage.toFixed(2)}%
                                        </TableCell>
                                        <TableCell className="text-right">{formatDate(investment.purchaseDate)}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

