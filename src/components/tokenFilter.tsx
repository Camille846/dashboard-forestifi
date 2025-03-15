import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n"
import {
    Command,
    CommandEmpty,
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
    const [growthRate] = useState(8) // Default 8% annual growth

    const tokens = [
        { value: "pirarucu", label: "Pirarucu (PIROI)" },
        { value: "guarana", label: "Guaraná (GRNA)" },
        { value: "apoena", label: "Apoena (APNA)" },
        { value: "acai", label: "Açaí (ACAI)" },
        { value: "brazil-nut", label: "Brazil Nut (BZNT)" },
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

    return (
        <div className="flex items-center space-x-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
                        {selectedTokens.length > 0 ? `${selectedTokens.length} ${t("tokensSelected", {rate: (growthRate * 0.5).toFixed(1)})}` : t("filterByToken", {rate: (growthRate * 0.5).toFixed(1)})}
                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder={t("searchTokens", {rate: (growthRate * 0.5).toFixed(1)})} />
                        <CommandList>
                            <CommandEmpty>{t("noTokensFound", {rate: (growthRate * 0.5).toFixed(1)})}</CommandEmpty>
                            <CommandGroup>
                                {tokens.map((token) => (
                                    <CommandItem key={token.value} value={token.value} onSelect={handleSelect}>
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
                        <Badge key={token} variant="secondary" className="cursor-pointer" onClick={() => handleSelect(token)}>
                            {selectedToken?.label}
                            <span className="ml-1 text-xs">×</span>
                        </Badge>
                    )
                })}
            </div>
        </div>
    )
}