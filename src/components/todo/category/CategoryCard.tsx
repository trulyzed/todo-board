'use client'

import { forwardRef, useCallback, useRef } from "react"
import { TicketCard } from "@/components/todo/ticket/TicketCard"
import { EditCategory } from "./EditCategory"
import { Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "@/components/todo/ticket/AddTicket"
import { appendClass } from "@/lib/utils/classNameUtils"
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

  const handleDrag: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    console.log(sourceId, targetId)
  }, [])

  const { dragListeners, dropListeners, getState } = useDragDrop({onDrop: handleDrag, identifier: 'ticket'})

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
      {tickets.length ?
        <div ref={ticketsContainerRef} className="flex flex-col p-1 mt-1 overflow-y-auto max-h-full mb-2 vertical-scrollbar">
          {tickets.map((i, index) => (
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
