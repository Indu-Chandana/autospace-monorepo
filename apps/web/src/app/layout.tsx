import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@autospace/ui/src/app/globals.css' // all FE apps are using same 'lib/UI' tailwind stuff. we changed tailwing.config as well.
import { ApolloProvider } from '@autospace/network/src/config/apollo'
import { SessionProvider } from '@autospace/ui/src/components/molecules/SessionProvider' // 'use client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={inter.className}>{children}</body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
