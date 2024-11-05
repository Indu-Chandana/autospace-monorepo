'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

// we did this, beacause of the app/web -> layout.tsx is the (server component)
export const SessionProvider = ({
    children,
}: { children: React.ReactNode }) => {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}