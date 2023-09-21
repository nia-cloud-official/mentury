"use client"

import { Button } from "./ui/button"
import { signIn } from "next-auth/react"

export const SignInButton = () => {
    return (
        <Button
            variant='outline'
            onClick={() => signIn('google')}
        >
            Sign in
        </Button>
    )
}