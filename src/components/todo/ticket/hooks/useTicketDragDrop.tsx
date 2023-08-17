import { DragDropContext } from "@/context/DragDropProvider"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { UseDropArguments, useDragDrop } from "@/hooks/dragAndDrop/useDragDrop"
import { changeTicketOrders } from "@/queries/client/ticket"
import { Ticket } from "@prisma/client"
import { useCallback, useContext } from "react"

type UseTicketDragDropArguments = {
  categoryId: string
}

export const useTicketDragDrop = ({categoryId}: UseTicketDragDropArguments) => {
  const { initiatorContext, activeDragId } = useContext(DragDropContext)
  const { categories, setCategories } = useContext(DataContext)

  const handleDragDrop: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    const sourceCategoryId = initiatorContext
    const newSortedCategories = [...categories] as CategoryWithTickets[]
    const sourceCategoryIndex = newSortedCategories.findIndex(i => i.id === sourceCategoryId)
    const targetCategoryIndex = newSortedCategories.findIndex(i => i.id === categoryId)
    const sourceTickets = newSortedCategories[sourceCategoryIndex]?.tickets
    const targetTickets = newSortedCategories[targetCategoryIndex]?.tickets
    const sourceIndex = sourceTickets.findIndex(i => i.id === sourceId)
    const targetIndex = targetTickets.findIndex(i => i.id === targetId)
    const source = sourceTickets[sourceIndex]
    newSortedCategories[sourceCategoryIndex]?.tickets.splice(sourceIndex, 1)
    newSortedCategories[targetCategoryIndex]?.tickets.splice(targetIndex, 0, source)
    const newCategories = newSortedCategories.reduce((a, c) => {
      const tickets = c.tickets.map((i, index) => ({...i, order: index}))
      a.push({...c, tickets})
      return a
    }, [] as CategoryWithTickets[])

    setCategories(newCategories)
    changeTicketOrders({
      orders: newCategories.reduce((a, c) => {
        c.tickets.forEach((i, index) => {
          a.push({id: i.id, categoryId: c.id, order: index})
        })
        return a
      }, [] as {id: string; categoryId: string; order: number}[]),
      deletedTicketId: sourceCategoryIndex !== targetCategoryIndex ? source.id : undefined,
      newTicket: sourceCategoryIndex !== targetCategoryIndex ? {...source, categoryId: categories[targetCategoryIndex].id} as Ticket : undefined,
    })
  }, [categoryId, initiatorContext, categories, setCategories])

  const enableDropInTicketList = useCallback(() => {
    return activeDragId?.startsWith('ticket')
  }, [activeDragId])

  const { dragListeners, dropListeners, getState } = useDragDrop({onDrop: handleDragDrop, identifier: 'ticket', initiatorContext: categoryId})

  return {
    dragListeners,
    dropListeners,
    getState,
    enableDropInTicketList
  }
}