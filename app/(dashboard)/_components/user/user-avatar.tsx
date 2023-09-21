import type { User } from "next-auth"
import { Avatar, type AvatarProps } from "@radix-ui/react-avatar"
import Image from "next/image"
import { AvatarFallback } from "@/components/ui/avatar"

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, "name" | "image">
}

export const UserAvatar = ({
    user,
    ...props
}: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <div className="relative">
                    <Image
                        src={user.image}
                        alt="picture"
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        width={40}
                        height={40}
                    />
                </div>
            ): (
                <AvatarFallback>
                    <span className="sr-only">
                        {user?.name}
                    </span>
                </AvatarFallback>
            )}
        </Avatar>
    )
}