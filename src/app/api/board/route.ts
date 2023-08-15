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
      categories: {
        include: {
          tickets: true
        }
      }
    }
  })
  return NextResponse.json(data)
}


export async function PATCH(request: Request) {
  const { orders=[] }: { orders: {id: string; order: number}[] } = await request.json()
  const { user, error } = await getUser()
  if (error) return error

  const board = await prisma.board.findFirst({
    where: {
      userId: user?.id
    }
  })

  if (!board) return new Response("Board not found", {status: 404})

  const batchQueries = orders.map(i => prisma.category.update({
    where: {
      id: i.id,
      board: {
        userId: user?.id
      },
      boardId: board.id
    },
    data: {
      order: i.order
    }
  }))

  const data = prisma.$transaction(batchQueries)
  return NextResponse.json(data)
}