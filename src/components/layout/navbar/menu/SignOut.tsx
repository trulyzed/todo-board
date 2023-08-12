"use client"

import { signOut } from "next-auth/react"
import { useCallback } from "react"
import { SignOut as SignOutIcon } from "@phosphor-icons/react"

export const SignOut = () => {
  const handleSignOut = useCallback(() => {
    signOut()
  }, [])

  return (
    <button className="rounded bg-red-500 text-white py-1 px-2" onClick={handleSignOut} title="Sign out">
      <SignOutIcon weight="bold" />
    </button>
  )
}