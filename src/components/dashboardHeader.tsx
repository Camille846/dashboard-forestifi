"use client"

import { useState } from "react"
import { Bell, Moon, Sun, Globe, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTranslation } from "@/lib/i18n"
import {AppSidebar} from "@/components/sidebar";

interface DashboardHeaderProps {
    toggleTheme: () => void
    currentTheme: string
    toggleLanguage: () => void
    currentLanguage: string
}

export function DashboardHeader({ toggleTheme, currentTheme, toggleLanguage, currentLanguage }: DashboardHeaderProps) {
    const { t } = useTranslation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center py-4 lg:py-0 border-b border-border bg-primary rounded-3xl px-4 mt-5 mx-5">
            <div className="flex items-center mb-0">
                <div className="flex items-center">
                    <div className="h-24 w-24 rounded-full flex items-center justify-center mr-2">
                        <img src="/logo-lightmode.svg" alt="ForestiFi" />
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-md mx-4 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder={t("searchPlaceholder")} className="pl-8 bg-background" />
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <div className="mr-2 sm:hidden">
                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5 text-white" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full bg-transparent border-0">
                            <AppSidebar setSelectedComponent={() => {}} isOpen={isMobileMenuOpen} toggleSidebar={() => {}} />
                        </SheetContent>
                    </Sheet>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleLanguage}
                    title={currentLanguage === "en" ? "Switch to Portuguese" : "Mudar para Inglês"}
                    className="text-white cursor-pointer"
                >
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">{t("toggleLanguage")}</span>
                </Button>

                <Button variant="ghost" size="icon" onClick={toggleTheme} title={t("toggleTheme")} className="text-white cursor-pointer">
                    {currentTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span className="sr-only">{t("toggleTheme")}</span>
                </Button>

                <Button variant="ghost" size="icon" title={t("notifications")} className="text-white cursor-pointer">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">{t("notifications")}</span>
                </Button>

                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>CG</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

