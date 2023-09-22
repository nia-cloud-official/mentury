"use client"

import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
    icon: LucideIcon
    label: string
    href: string
}

export const SidebarItem = ({
    icon: Icon,
    label,
    href
}: SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    const isActive = (pathname === '/' && href === '/') ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)

    const onClick = () => {
        router.push(href)
    }

    return (
        <button
            onClick={onClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-sm font-medium pl-6 transition-all",
                isActive && "text-neutral-500 bg-neutral-700/20 hover:bg-neutral-800/30 hover:text-neutral-500"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-neutral-500",
                        isActive && "text-neutral-500"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-neutral-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}