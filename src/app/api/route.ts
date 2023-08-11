import { NextResponse } from "next/server"
import { prisma } from "@/lib/database/prisma"

export async function GET(request: Request) {
  const data = await prisma.ticket.findMany()
  return NextResponse.json({ data })
}
