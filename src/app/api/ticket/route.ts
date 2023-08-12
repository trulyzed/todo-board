import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getUser } from "@/lib/api/query/getUser"

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
  const { title, categoryId }: { title: string; categoryId: string } = await request.json()
  const { user, error } = await getUser()
  if (error) return error

  const category = await prisma.category.findUnique({
    where: {
      board: {
        userId: user!.id
      },
      id: categoryId
    }
  })

  if (!categoryId || !category) return new Response("Category not found", {status: 404})
  else if (!title) return new Response("Bad data", {status: 400})


  const data = await prisma.ticket.create({
    data: {
      title,
      categoryId
    }
  })
  return NextResponse.json(data)
}

export async function PATCH(request: Request) {
  const { title, id }: { title: string; id: string } = await request.json()
  const { user, error } = await getUser()
  if (error) return error

  if (!title) return new Response("Bad data", {status: 400})

  const data = await prisma.ticket.update({
    where: {
      id,
      category: {
        board: {
          userId: user?.id
        }
      }
    },
    data: {
      title,
    }
  })
  return NextResponse.json(data)
}
