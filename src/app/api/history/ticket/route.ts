import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"
import { getUser } from "@/lib/api/query/getUser"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticketId = searchParams.get('ticketId')
  if (!ticketId) return new Response("No ticket Id found", {status: 400})

  const { user, error } = await getUser()
  if (error) return error

  const data = await prisma.history.findMany({
    where: {
      model: 'Ticket',
      userId: user?.id,
      modelId: ticketId,
    },
  })
  return NextResponse.json(data)
}
