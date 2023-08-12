import { apiClient } from "@/lib/api/apiClient"
import { cookies } from "next/headers"

export const getCategories = async () => {
  const { data } = await apiClient(cookies().toString()).get('/board')

  try {
    const [board] = JSON.parse(data || null)
    return board.categories
  } catch (error) {}
}
