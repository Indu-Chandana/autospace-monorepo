'use client'
import { Button } from "../atoms/Button"
import { IconDoorExit } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'

export const LogoutButton = () => {
    return (
        <Button
            variant="outlined"
            onClick={() => {
                signOut()
            }}
            className="flex gap-2"
        >
            <IconDoorExit /> Logout
        </Button>
    )
}