import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n"
import localFont from 'next/font/local'

const BRSonoma = localFont({
    src: [
        {
            path: '../../public/fonts/BRSonoma-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/BRSonoma-Medium.otf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/BRSonoma-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../../public/fonts/BRSonoma-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
})

export const metadata: Metadata = {
    title: "ForestiFi - Transformando o papel do capital para alavancar as cadeias produtivas da Amazônia",
    description: "Confira seus investimentos e o impacto ambiental deles na Amazônia.",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={BRSonoma.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}