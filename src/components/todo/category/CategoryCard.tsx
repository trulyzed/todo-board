'use client'

import { forwardRef, useCallback, useMemo, useRef } from "react"
import { EditCategory } from "./EditCategory"
import { Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "@/components/todo/ticket/AddTicket"
import { appendClass } from "@/lib/utils/classNameUtils"
import { TicketList } from "../ticket/TicketList"
import { UseDropArguments, useDragDrop } from "@/hooks/dragAndDrop/useDragDrop"

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
  const ticketsContainerRef = useRef<HTMLDivElement>(null)
  const sortedTickets = useMemo(() => tickets.sort((a, b) => (a.order || 0) - (b.order || 0)), [tickets])

  const handleDragDrop: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    console.log('xxxxxxxxx', sourceId, targetId, id, )
  }, [])
  const { dropListeners, getState } = useDragDrop({onDrop: handleDragDrop, identifier: 'ticket', initiatorContext: id})


  const handleSuccessCreate = useCallback(() => {
    ticketsContainerRef.current?.scrollTo(0, ticketsContainerRef.current.scrollHeight)
  }, [])

  return (
    <div
      ref={ref}
      {...otherProps}
      {...dropListeners(id)}
      className={appendClass("flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full", [
        className,
        getState(id)?.entered ? "border-dotted border-4 border-white" : ""
      ])}>
      <div className="p-2">
        <EditCategory refId={id} initialValue={title} />
      </div>
      {sortedTickets.length ?
        <div ref={ticketsContainerRef} className="flex flex-col p-1 mt-1 overflow-y-auto max-h-full mb-2 vertical-scrollbar">
          <TicketList tickets={tickets} categoryId={id} />
        </div>
      : null}
      <AddTicket onSuccess={handleSuccessCreate} refId={id} />
    </div>
  )
})

CategoryCard.displayName = "CategoryCard"
