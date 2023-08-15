'use client'

import { forwardRef, useCallback, useContext, useMemo, useRef } from "react"
import { TicketCard } from "@/components/todo/ticket/TicketCard"
import { EditCategory } from "./EditCategory"
import { Ticket, Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "@/components/todo/ticket/AddTicket"
import { appendClass } from "@/lib/utils/classNameUtils"
import { UseDropArguments, useDragDrop } from "@/hooks/dragAndDrop/useDragDrop"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { changeTicketOrders } from "@/queries/client/ticket"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { DragDropContext } from "@/context/DragDropProvider"

type CategoryCardProps = {
  className?: string
  id: string
  title: string
  tickets: TicketType[]
}

export const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(({
  className="",
  id,
  title,
  tickets=[],
  ...otherProps
}, ref) => {
  const { categories, setCategories } = useContext(DataContext)
  const { initiatorContext } = useContext(DragDropContext)
  const ticketsContainerRef = useRef<HTMLDivElement>(null)
  const sortedTickets = useMemo(() => tickets.sort((a, b) => (a.order || 0) - (b.order || 0)), [tickets])

  const handleDragDrop: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    const sourceCategoryId = initiatorContext?.current
    const newSortedCategories = [...categories] as CategoryWithTickets[]
    const sourceCategoryIndex = newSortedCategories.findIndex(i => i.id === sourceCategoryId)
    const targetCategoryIndex = newSortedCategories.findIndex(i => i.id === id)
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
  }, [id, initiatorContext, categories, setCategories])
  const { dragListeners, dropListeners, getState } = useDragDrop({onDrop: handleDragDrop, identifier: 'ticket', initiatorContext: id})

  const handleSuccessCreate = useCallback(() => {
    ticketsContainerRef.current?.scrollTo(0, ticketsContainerRef.current.scrollHeight)
  }, [])

  return (
    <div
      ref={ref}
      {...otherProps}
      className={appendClass("flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full", [className])}>
      <div className="p-2">
        <EditCategory refId={id} initialValue={title} />
      </div>
      {sortedTickets.length ?
        <div ref={ticketsContainerRef} className="flex flex-col p-1 mt-1 overflow-y-auto max-h-full mb-2 vertical-scrollbar">
          {sortedTickets.map((i, index) => (
            <div key={index} {...dropListeners(id)} className={appendClass("py-1", [getState(i.id)?.entered ? "border-dotted border-4 border-white bg-zinc-200" : ""])}>
              <TicketCard
                {...dragListeners(i.id)}
                className={appendClass("", [getState(i.id)?.dragging ? "opacity-40 border-dotted border-4 border-white" : ""])}
                categoryId={id} id={i.id} title={i.title}
              />
            </div>
          ))}
        </div>
      : null}
      <AddTicket onSuccess={handleSuccessCreate} refId={id} />
    </div>
  )
})

CategoryCard.displayName = "CategoryCard"
