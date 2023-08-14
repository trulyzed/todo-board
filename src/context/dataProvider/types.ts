import { Category, Ticket } from "@prisma/client"

export type CategoryWithTickets = Category & {
  tickets: Ticket[]
}