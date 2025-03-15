"use client"

import { Home, BarChart2, Leaf, DollarSign, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

interface MobileNavProps {
    setIsOpen: (isOpen: boolean) => void
}

export function MobileNav({ setIsOpen }: MobileNavProps) {
    const { t } = useTranslation()

    const navItems = [
        { icon: Home, label: t("dashboard"), href: "#" },
        { icon: BarChart2, label: t("investments"), href: "#" },
        { icon: Leaf, label: t("environmentalImpact"), href: "#" },
        { icon: DollarSign, label: t("transactions"), href: "#" },
        { icon: Settings, label: t("settings"), href: "#" },
        { icon: HelpCircle, label: t("help"), href: "#" },
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center py-4 border-b">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">EA</span>
                </div>
                <h2 className="text-lg font-bold">{t("forestifi")}</h2>
            </div>

            <nav className="flex-1 py-4">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.label}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t py-4">
                <Button variant="ghost" className="w-full justify-start text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logout")}
                </Button>
            </div>
        </div>
    )
}

