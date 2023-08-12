import { apiClient } from "@/lib/api/apiClient"

export const createCategory = async (payload: any) => {
  const { data } = await apiClient(undefined, true).post('/category', JSON.stringify(payload))

  try {
    return JSON.parse(data || null)
  } catch (error) {}
}