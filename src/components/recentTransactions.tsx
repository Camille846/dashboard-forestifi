import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"

interface RecentTransactionsProps {
    transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const { t } = useTranslation()

    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5) // Show only the 5 most recent transactions

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle>{t("recentTransactions")}</CardTitle>
                <CardDescription>{t("latestActivity")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedTransactions.length > 0 ? (
                        sortedTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                                <div className="flex items-center">
                                    <div
                                        className={`h-8 w-8 rounded-full ${transaction.type === "buy" ? "bg-green-500/10" : "bg-blue-500/10"} flex items-center justify-center mr-3`}
                                    >
                                        {transaction.type === "buy" ? (
                                            <svg
                                                className="h-4 w-4 text-green-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 5L12 19M12 5L6 11M12 5L18 11"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-4 w-4 text-blue-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 19L12 5M12 19L6 13M12 19L18 13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{transaction.description}</p>
                                        <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                                    </div>
                                </div>
                                <div
                                    className={`text-sm font-medium ${transaction.type === "buy" ? "text-green-500" : "text-blue-500"}`}
                                >
                                    {transaction.type === "buy" ? "+" : ""}
                                    {formatCurrency(transaction.amount)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-4">{t("noRecentTransactions")}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

