import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"

export async function GET(request: Request) {
  const session = await getServerSession(authConfig)
  if (!session) return new Response("Unauthorized", {status: 401})
  else if (!session.user?.email) return new Response("No email found!", {status: 502})

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  const data = await prisma.board.findMany({
    where: {
      userId: user?.id
    },
    include: {
      categories: true
    }
  })
  return NextResponse.json(data)
}
