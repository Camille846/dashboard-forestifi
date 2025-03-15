import { Suspense } from "react"
import Loading from "@/components/ui/loading"
import localFont from "next/font/local"

const BRSonoma = localFont({ src: '../../public/fonts/BRSonoma-Regular.otf' })

export default function Home() {
    return (
        <main className={`${BRSonoma.className}`}>
            <Suspense fallback={<Loading />}></Suspense>
        </main>
    )
}