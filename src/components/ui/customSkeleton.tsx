import { cn } from "@/lib/utils"

export function CustomSkeleton({ 
    className,
    ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton", className)}
            {...props}
        />
    )
}