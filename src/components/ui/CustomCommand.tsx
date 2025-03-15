import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function Command({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
                className
            )}
            {...props}
        />
    )
}

function CommandInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex h-9 items-center gap-2 border-b px-3">
            <ChevronDown className="size-4 shrink-0 opacity-50" />
            <input
                className={cn(
                    "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        </div>
    )
}

function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
                className
            )}
            {...props}
        />
    )
}

function CommandEmpty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("py-6 text-center text-sm", className)} {...props} />
    )
}

function CommandGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "text-foreground overflow-hidden p-1",
                className
            )}
            {...props}
        />
    )
}

interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    className?: string
    value: string
    onSelect: (value: string) => void
}

function CommandItem({ className, value, onSelect, ...props }: CommandItemProps) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        onSelect(value)
    }

    return (
        <div
            className={cn(
                "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
                className
            )}
            onClick={handleClick}
            {...props}
        />
    )
}

export {
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
}