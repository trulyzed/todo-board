import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getUser } from "@/lib/api/query/getUser"

export async function POST(request: Request) {
  const { title }: { title: string } = await request.json()
  const { user, error } = await getUser()
  if (error) return error

  const board = await prisma.board.findFirst({
    where: {
      userId: user?.id
    }
  })

  if (!board) return new Response("Board not found", {status: 404})
  else if (!title) return new Response("Bad data", {status: 400})

  const data = await prisma.category.create({
    data: {
      title,
      boardId: board?.id
    }
  })
  return NextResponse.json(data)
}
