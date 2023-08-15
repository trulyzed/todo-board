import { FC, useCallback, useContext, useMemo } from "react"
import { TicketCard } from "../ticket/TicketCard"
import { DragDropContext } from "@/context/DragDropProvider"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { Ticket } from "@prisma/client"
import { UseDropArguments, useDragDrop } from "@/hooks/dragAndDrop/useDragDrop"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { changeTicketOrders } from "@/queries/client/ticket"
import { appendClass } from "@/lib/utils/classNameUtils"

type TicketListProps = {
  categoryId: string
  tickets: Ticket[]
}

export const TicketList: FC<TicketListProps> = ({
  categoryId,
  tickets=[],
}) => {
  const { categories, setCategories } = useContext(DataContext)
  const { initiatorContext } = useContext(DragDropContext)
  const sortedTickets = useMemo(() => tickets.sort((a, b) => (a.order || 0) - (b.order || 0)), [tickets])

  const handleDragDrop: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    const sourceCategoryId = initiatorContext?.current
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
  const { dragListeners, dropListeners, getState } = useDragDrop({onDrop: handleDragDrop, identifier: 'ticket', initiatorContext: categoryId})

  return (
    sortedTickets.map((i, index) => (
      <div key={index} {...dropListeners(categoryId)} className={appendClass("py-1", [getState(i.id)?.entered ? "border-dotted border-4 border-white bg-zinc-200" : ""])}>
        <TicketCard
          {...dragListeners(i.id)}
          className={appendClass("", [getState(i.id)?.dragging ? "opacity-40 border-dotted border-4 border-white" : ""])}
          categoryId={categoryId} id={i.id} title={i.title}
        />
      </div>
    ))
  )
}