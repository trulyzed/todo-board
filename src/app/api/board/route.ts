import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getUser } from "@/lib/api/query/getUser"

export async function GET(request: Request) {
  const { user, error } = await getUser()
  if (error) return error

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
