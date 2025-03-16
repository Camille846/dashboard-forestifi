import { Button } from "@/components/ui/button"
import { LayoutDashboard, ChartGantt, ChartLine } from "lucide-react"

interface AppSidebarProps {
    setSelectedComponent: (component: string) => void
    isOpen: boolean
    toggleSidebar: () => void
}

export function AppSidebar({ setSelectedComponent, isOpen, toggleSidebar }: AppSidebarProps) {
    return (
        <aside className={`bg-primary text-white h-full lg:h-[100vh] 2xl:h-[80vh] lg:mt-42 p-4 md:mx-10 lg:mx-0 lg:ml-4 md:mt-32 rounded-lg flex flex-col items-center justify-center font-bold text-2xl fixed md:relative z-40 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
            <nav className="flex flex-col gap-6 items-center justify-center">
                <Button
                    variant="ghost"
                    onClick={() => {
                        setSelectedComponent("overview");
                        toggleSidebar();
                    }}
                    className="hover:text-forestiGreen active:text-forestiGreen hover:bg-white/20 cursor-pointer"
                >
                    <LayoutDashboard className="w-40 h-32"/>
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setSelectedComponent("portfolio");
                        toggleSidebar();
                    }}
                    className="hover:text-forestiGreen hover:bg-white/20 active:text-forestiGreen cursor-pointer"
                >
                    <ChartGantt className="w-40 h-32"/>
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setSelectedComponent("earnings");
                        toggleSidebar();
                    }}
                    className="hover:text-forestiGreen hover:bg-white/20 active:text-forestiGreen cursor-pointer"
                >
                    <ChartLine className="w-40 h-32"/>
                </Button>
            </nav>
        </aside>
    )
}