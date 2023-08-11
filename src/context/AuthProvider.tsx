'use client'

import { FC, ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

type Props = {
  children: ReactNode
}

export const AuthProvider:FC<Props> = ({children}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}