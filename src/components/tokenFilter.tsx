"use client";

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/CustomCommand"

interface TokenFilterProps {
    onFilterChange: (selectedTokens: string[]) => void
}

export function TokenFilter({ onFilterChange }: TokenFilterProps) {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false)
    const [selectedTokens, setSelectedTokens] = useState<string[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [growthRate] = useState(8) // Default 8% annual growth

    const tokens = [
        { value: "gua1", label: "Guaraná Urupadí (GUA1)", bgColor: "bg-forestiGreen", textColor: "text-primary" },
        { value: "gua2", label: "Guaraná Urupadí (GUA2)", bgColor: "bg-forestiGreen", textColor: "text-primary" },
        { value: "pir1", label: "Pirarucu (PIR 1)", bgColor: "bg-forestiYellow", textColor: "text-primary" },
        { value: "pir2", label: "Pirarucu (PIR 2)", bgColor: "bg-forestiYellow", textColor: "text-primary" },
        { value: "cac1", label: "Cacau selvagem (CAC 1)", bgColor: "bg-forestiOrange", textColor: "text-black" },
    ]

    const handleSelect = (currentValue: string) => {
        let newSelectedTokens: string[]

        if (selectedTokens.includes(currentValue)) {
            newSelectedTokens = selectedTokens.filter((value) => value !== currentValue)
        } else {
            newSelectedTokens = [...selectedTokens, currentValue]
        }

        setSelectedTokens(newSelectedTokens)
        onFilterChange(newSelectedTokens)
    }

    const clearFilters = () => {
        setSelectedTokens([])
        onFilterChange([])
    }

    const filteredTokens = tokens.filter(token =>
        token.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="flex items-start lg:items-center space-x-2 lg:flex-row flex-col">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between bg-primary text-white hover:bg-primary/60 cursor-pointer">
                        {selectedTokens.length > 0 ? `${selectedTokens.length} ${t("tokensSelected", {rate: (growthRate * 0.5).toFixed(1)})}` : t("filterByToken", {rate: (growthRate * 0.5).toFixed(1)})}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput
                            placeholder={t("searchTokens", {rate: (growthRate * 0.5).toFixed(1)})}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <CommandList>
                            <CommandGroup>
                                {filteredTokens.map((token) => (
                                    <CommandItem key={token.value} value={token.value} onSelect={handleSelect} className="hover:bg-primary/10">
                                        <Check
                                            className={cn("mr-2 h-4 w-4", selectedTokens.includes(token.value) ? "opacity-100" : "opacity-0")}
                                        />
                                        {token.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {selectedTokens.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                    {t("clearFilters", {rate: (growthRate * 0.5).toFixed(1)})}
                </Button>
            )}

            <div className="flex flex-wrap gap-1 ml-2">
                {selectedTokens.map((token) => {
                    const selectedToken = tokens.find((t) => t.value === token)
                    return (
                        <Badge key={token} variant="secondary" className={`cursor-pointer ${selectedToken?.bgColor} ${selectedToken?.textColor}`} onClick={() => handleSelect(token)}>
                            {selectedToken?.label}
                            <span className="ml-1 text-xs">×</span>
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}