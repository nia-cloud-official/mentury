"use client"

import Link from "next/link"
import type { User } from "next-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import { UserAvatar } from "./user-avatar"

interface UserAccountProps {
    user: Pick<User, "name" | "image" | "email">
}

export const UserAccount = ({
    user
}: UserAccountProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar
                    className="w-10 h-10"
                    user={{
                        name: user.name || null,
                        image: user.image || null
                    }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="backdrop-blur-md" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        {user.name && <p className="font-medium">{user.name}</p>}
                        {user.email && (
                            <p className="w-[200px] truncate text-sm text-neutral-700">
                                {user.email}
                            </p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(event) => {
                        event.preventDefault()
                        signOut().catch(console.error)
                    }}
                    className="text-orange-600 cursor-pointer"
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}