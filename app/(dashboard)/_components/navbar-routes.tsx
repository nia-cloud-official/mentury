"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, Octagon } from "lucide-react"
import { UserNavigation } from "@/components/user-navigation"
import { useAuth } from "@clerk/nextjs"

export const NavbarRoutes = () => {
    const pathname = usePathname()
    const { sessionId } = useAuth()

    const isTeacherPage = pathname?.startsWith("/teacher")
    const isPlayerPage = pathname?.includes("/chapter")

    return (
        <div className="flex gap-x-2 ml-auto mx-5">
            {isTeacherPage || isPlayerPage ? (
                <Link href='/'>
                    <Button className="mr-4" variant="ghost">
                        <LogOut className="w-4 h-4" />
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
            {sessionId && <UserNavigation />}
        </div>
    )
}