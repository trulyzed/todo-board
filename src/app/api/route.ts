import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const data = await prisma.user.findMany()
  return NextResponse.json({ data })
}
