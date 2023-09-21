"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Octagon } from "lucide-react"

export const NavbarRoutes = () => {
    const pathname = usePathname()

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isPlayerPage = pathname?.includes("/chapter")

    return (
        <div className="flex gap-x-2 ml-auto mx-5">
            {isTeacherPage || isPlayerPage ? (
                <Link href='/'>
                    <Button>
                        <LogOut className="w-4 h-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ) : (
                <Link href="/teacher/courses">
                    <Button variant="ghost" size="sm">
                        <Octagon className="w-4 h-4 mr-2" />
                        Teacher mode
                    </Button>
                </Link>
            )}
        </div>
    )
}