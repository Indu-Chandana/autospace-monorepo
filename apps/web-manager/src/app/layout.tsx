import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@autospace/ui/src/app/globals.css' // all FE apps are using same 'lib/UI' tailwind stuff. we changed tailwing.config as well.
import { ApolloProvider } from '@autospace/network/src/config/apollo'
import { SessionProvider } from '@autospace/ui/src/components/molecules/SessionProvider' // 'use client'
import { Header } from '@autospace/ui/src/components/organisms/Header'
import { ToastContainer } from '@autospace/ui/src/components/molecules/Toast'
import { MenuItem } from '@autospace/util/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Autospace | Manager',
  description: 'Generated by create next app',
}

const MENUITEMS: MenuItem[] = [
  { label: 'New Garage', href: '/new-garage' },
  { label: 'Valets', href: '/valets' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <ApolloProvider>
          <body className={inter.className}>
            <Header menuItems={MENUITEMS} />
            {children}
            <ToastContainer />
          </body>
        </ApolloProvider>
      </SessionProvider>
    </html>
  )
}
