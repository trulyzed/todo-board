import { PrismaClient } from "@prisma/client"

export const prisma = (new PrismaClient()).$extends({
  query: {
    ticket: {
      async update({model, operation, args, query}) {
        const result = await query(args)
        const ticket =  await prisma.ticket.findUnique({
          where: {
            id: args.where.id
          },
          include: {
            category: {
              include: {
                board: true
              }
            }
          }
        })
        const userId = ticket?.category.board.userId
        if (ticket && userId) {
          await prisma.history.create({
            data: {
              model,
              operation,
              userId: userId,
              modelId: ticket.id,
              params: JSON.stringify(args.data)
            }
          })
        }
        return result
      }
    }
  }
})