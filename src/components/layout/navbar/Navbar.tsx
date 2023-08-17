import { getServerSession } from "next-auth"
import { SignOut } from "./menu/SignOut"
import { authConfig } from "@/lib/auth/auth"
import { Branding } from "./branding/Branding"

export const Navbar = async () => {
  const session = await getServerSession(authConfig)
  if (!session?.user) return null

  return (
    <nav className="flex justify-between items-center bg-white py-5 px-4">
      <div>
        <Branding />
      </div>
      <div className="flex items-center gap-10">
        {session.user.name ? <p className="hidden md:inline text-base">Welcome, <strong>{session.user.name}</strong></p> : null}
        <SignOut />
      </div>
    </nav>
  )
}