import { AuthProvider } from '@/context/AuthProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar/Navbar'
import { TicketDetails } from '@/components/todo/ticket/TicketDetails'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo Board',
  description: 'A simple todo board application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {/* <TicketDetails title={"Ticket 1"} description={"This is a description"} expiry={"20/14/23"} /> */}
          <main className='flex h-content'>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
