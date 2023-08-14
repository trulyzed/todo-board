'use client'

import { FC, ReactNode, createContext, useCallback, useState } from "react"
import { Category, Ticket } from "@prisma/client"
import { CategoryWithTickets } from "./types"

type DataContextValue = {
  categories: Category[]
  setCategories: (categories: Category[]) => void
  addCategory: (category: Category) => void
  editCategory: (id: string, category: Category) => void
  addTicket: (categoryId: string, ticket: Ticket) => void
  editTicket: (categoryId: string, id: string, ticket: Ticket) => void
}

type DataContextProviderProps = {
  children: ReactNode
}

const initialValue: DataContextValue = {
  categories: [],
  setCategories: () => {},
  addCategory: () => {},
  editCategory: () => {},
  addTicket: () => {},
  editTicket: () => {},
}

export const DataContext = createContext<DataContextValue>({
  ...initialValue
})

export const DataContextProvider:FC<DataContextProviderProps> = ({
  children
}) => {
  const [categories, setCategories] = useState<DataContextValue['categories']>([])

  const addCategory:DataContextValue['addCategory'] = useCallback((category) => {
    setCategories(prevVal => ([
      ...prevVal,
      category
    ]))
  }, [])

  const editCategory:DataContextValue['editCategory'] = useCallback((id, category) => {
    const newCategories = [...categories]
    const matchedIndex = newCategories.findIndex(i => i.id === id)
    if (matchedIndex >= 0) {
      newCategories[matchedIndex] = category
      setCategories(newCategories)
    }
  }, [categories])

  const addTicket:DataContextValue['addTicket'] = useCallback((categoryId, ticket) => {
    const newCategories = [...categories as CategoryWithTickets[]]
    const matchedCategoryIndex = newCategories.findIndex(i => i.id === categoryId)
    if (matchedCategoryIndex >= 0) {
      newCategories[matchedCategoryIndex].tickets.push(ticket)
      setCategories(newCategories)
    }
  }, [categories])

  const editTicket:DataContextValue['editTicket'] = useCallback((categoryId, id, ticket) => {
    const newCategories = [...categories as CategoryWithTickets[]]
    const matchedCategoryIndex = newCategories.findIndex(i => i.id === categoryId)
    const matchedTicketIndex = newCategories[matchedCategoryIndex]?.tickets.findIndex(i => i.id === id)
    if (matchedCategoryIndex >= 0 && matchedTicketIndex >= 0) {
      newCategories[matchedCategoryIndex].tickets[matchedTicketIndex] = ticket
      setCategories(newCategories)
    }
  }, [categories])

  return (
    <DataContext.Provider value={{
      categories,
      setCategories,
      addCategory,
      editCategory,
      addTicket,
      editTicket,
    }}>
      {children}
    </DataContext.Provider>
  )
}