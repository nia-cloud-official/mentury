"use client"

import Image from "next/image"
import { useUser, useClerk } from "@clerk/nextjs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogOut } from "lucide-react"

export const UserNavigation = () => {
    const { isLoaded, isSignedIn, user } = useUser()
    const { signOut } = useClerk()
    if (!isLoaded || !isSignedIn) return null
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {user && (
                    <Image
                        src={user.imageUrl}
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.fullName && (
                            <p className="font-medium">{user.fullName}</p>
                        )}
                        {user.emailAddresses && (
                            <p className="truncate w-[200px] text-sm text-neutral-700">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut()
                    }}
                    className="text-red-600 cursor-pointer"
                >
                    Log out
                    <LogOut className="w-4 h-4 ml-2" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}