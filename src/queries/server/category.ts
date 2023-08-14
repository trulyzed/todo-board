import { apiClient } from "@/lib/api/apiClient"
import { Category } from "@prisma/client"
import { cookies } from "next/headers"

export const getCategories = async () => {
  const { data } = await apiClient(cookies().toString()).get('/board')

  try {
    const [board] = JSON.parse(data || null)
    return board.categories as Category[]
  } catch (error) {
    throw error
  }
}
