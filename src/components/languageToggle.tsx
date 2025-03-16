"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
    toggleLanguage: () => void
    currentLanguage: string
}

export function LanguageToggle({ toggleLanguage, currentLanguage }: LanguageToggleProps) {
    return (
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {currentLanguage === "en" ? "EN" : "PT"}
        </Button>
    )
}

