import './globals.css'
import { AuthProvider } from '@/context/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar/Navbar'

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
          <main className='flex h-content'>
            {children}
          </main>
        </AuthProvider>
        <div id='modal-root' />
      </body>
    </html>
  )
}
