
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export const useAuthorized = () => {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin')
    },
  })
}