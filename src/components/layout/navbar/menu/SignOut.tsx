"use client"

import { signOut } from "next-auth/react"
import { useCallback } from "react"
import { SignOut as SignOutIcon } from "@phosphor-icons/react"
import { Button } from "@/components/interactive/Button"

export const SignOut = () => {
  const handleSignOut = useCallback(() => {
    signOut()
  }, [])

  return (
    <Button className="rounded bg-red-500 text-white py-1 px-2" onClick={handleSignOut} title="Sign out">
      <SignOutIcon weight="bold" />
    </Button>
  )
}