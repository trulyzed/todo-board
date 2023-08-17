import { apiClient } from "@/lib/api/apiClient"
import { Category } from "@prisma/client"

export const getCategories = async () => {
  const { data } = await apiClient(undefined, true).get('/board')

  try {
    const [board] = JSON.parse(data || null)
    return board?.categories as Category[]
  } catch (error) {
    throw error
  }
}

export const createCategory = async (payload: any) => {
  const { data } = await apiClient(undefined, true).post('/category', JSON.stringify(payload))

  try {
    return JSON.parse(data || null) as Category
  } catch (error) {
    throw error
  }
}

export const editCategory = async (payload: any) => {
  const { data } = await apiClient(undefined, true).patch('/category/', JSON.stringify(payload))

  try {
    return JSON.parse(data || null) as Category
  } catch (error) {
    throw error
  }
}


export const changeCategoryOrders = async (payload: any) => {
  const { data } = await apiClient(undefined, true).patch('/change-order/categories/', JSON.stringify(payload))

  try {
    return JSON.parse(data || null) as Category[]
  } catch (error) {
    throw error
  }
}
