"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
    "p-2 mb-4 text-xs flex items-center border-l-4 transition-colors bg-opacity-20 rounded-r",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground border-primary",
                info:
                    "bg-blue-700 text-blue-200 border-blue-700",
                success:
                    "bg-green-700 text-green-200 border-green-700",
                warning:
                    "bg-yellow-700 text-yellow-200 border-yellow-700",
                error:
                    "bg-red-700 text-red-200 border-red-700",
                tip:
                    "bg-orange-700 text-orange-200 border-orange-700",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    asChild?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    ({ className, role = "alert", variant, asChild = false, ...props }, ref) => {
        const Comp = asChild ? "div" : "div"
        return (
            <Comp
                className={cn(alertVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)

Alert.displayName = "Alert"

export { Alert, alertVariants }