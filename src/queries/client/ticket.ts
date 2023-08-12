import { apiClient } from "@/lib/api/apiClient"

export const createTicket = async (payload: any) => {
  const { data } = await apiClient(undefined, true).post('/ticket', JSON.stringify(payload))

  try {
    return JSON.parse(data || null)
  } catch (error) {
    throw error
  }
}

export const editTicket = async (payload: any) => {
  const { data } = await apiClient(undefined, true).patch('/ticket/', JSON.stringify(payload))

  try {
    return JSON.parse(data || null)
  } catch (error) {
    throw error
  }
}