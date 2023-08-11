import { getServerSession } from "next-auth"
import { SignOut } from "./menu/SignOut"
import { authConfig } from "@/lib/auth"

export const Navbar = async () => {
  const session = await getServerSession(authConfig)
  if (!session?.user) return null

  return (
    <nav className="flex justify-between items-center bg-white py-5 px-4">
      <div>
        <h4 className="uppercase font-bold text-xl">Todo Board</h4>
      </div>
      <div className="flex items-center gap-10">
        {session.user.name ? <p className="">Welcome, <strong>{session.user.name}</strong></p> : null}
        <SignOut />
      </div>
    </nav>
  )
}