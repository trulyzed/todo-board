import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getUser } from "@/lib/api/query/getUser"
import { Ticket } from "@prisma/client"
import { getJSONableError } from "@/lib/api/utils"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticketId = searchParams.get('ticketId')
  if (!ticketId) return new Response("No ticket Id found", {status: 400})

  const { user, error } = await getUser()
  if (error) return error

  const data = await prisma.ticket.findUnique({
    where: {
      category: {
        board: {
          userId: user!.id
        }
      },
      id: ticketId
    },
  })
  return NextResponse.json(data)
}


export async function POST(request: Request) {
  const { title, categoryId }: Ticket = await request.json()
  const { user, error } = await getUser()
  if (error) return error
  const data: Partial<Ticket> = {
    title,
  }
  if ((data.title !== undefined) && !data.title) return new Response(getJSONableError("Title is required"), {status: 400})
  
  const category = await prisma.category.findUnique({
    where: {
      board: {
        userId: user!.id
      },
      id: categoryId
    }
  })

  if (!categoryId || !category) return new Response(getJSONableError("Category not found"), {status: 404})
  else if (!title) return new Response("Bad data", {status: 400})

  const ticketCount = await prisma.ticket.count({where: {categoryId}})

  const ticket = await prisma.ticket.create({
    data: {
      title,
      categoryId,
      order: ticketCount + 1,

    }
  })
  return NextResponse.json(ticket)
}

export async function PATCH(request: Request) {
  const { title, id, description, expiresAt }: Ticket = await request.json()
  const { user, error } = await getUser()
  if (error) return error
  const data: Partial<Ticket> = {
    title,
    description,
    expiresAt
  }
  if ((data.title !== undefined) && !data.title) return new Response(getJSONableError("Title is required"), {status: 400})

  const ticket = await prisma.ticket.update({
    where: {
      id,
      category: {
        board: {
          userId: user?.id
        }
      }
    },
    data
  })
  return NextResponse.json(ticket)
}
