import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import { initialData, initialDataModels } from '@/data/database'
import { PrismaClient } from '@prisma/client'

export const prismaAdapter = PrismaAdapter(prisma as PrismaClient)

// override create user to initialize with data
prismaAdapter.createUser = (data: any) => {
  return prisma.user.create({ data: {
    ...data,
    ...initialData,
  }, include: initialDataModels})
}