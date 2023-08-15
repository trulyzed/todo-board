import { getUser } from "@/lib/api/query/getUser";
import { getJSONableError } from "@/lib/api/utils";
import { prisma } from "@/lib/database/prisma";
import { Ticket } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { orders=[], deletedTicketId, newTicket }: {
    orders: {id: string; order: number; categoryId: string}[]
    deletedTicketId?: string
    newTicket?: Ticket
  } = await request.json()
  const { user, error } = await getUser()
  if (error) return error

  const board = await prisma.board.findFirst({
    where: {
      userId: user?.id
    }
  })

  if (!board) return new Response("Board not found", {status: 404})

  if (deletedTicketId) {
    await prisma.ticket.delete({
      where: {
        id: deletedTicketId,
        category: {
          boardId: board.id
        }
      },
    })
  }

  if (newTicket) {
    const category = await prisma.category.findUnique({
      where: {
        board: {
          userId: user!.id
        },
        id: newTicket.categoryId
      }
    })
  
    if (!category) return new Response(getJSONableError("Category not found"), {status: 404})

    await prisma.ticket.create({
      data: newTicket
    })
  }

  const batchQueries = orders.map(i => prisma.ticket.update({
    where: {
      id: i.id,
      categoryId: i.categoryId,
      category: {
        boardId: board.id
      }
    },
    data: {
      order: i.order
    }
  }))

  const data = prisma.$transaction(batchQueries)
  return NextResponse.json(data)
}