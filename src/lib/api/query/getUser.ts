import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth/auth"
import { prisma } from "@/lib/database/prisma"

export const getUser = async () => {
  const session = await getServerSession(authConfig)
  if (!session) {
    return { error: new Response("Unauthorized", {status: 401}) }
  } else if (!session.user) {
    return { error: new Response("No user found!", {status: 404}) }
  } else if (!session.user?.email) {
    return { error: new Response("No email found!", {status: 404}) }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  return { user }
}