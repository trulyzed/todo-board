'use client'

import { forwardRef, useCallback, useRef } from "react"
import { TicketCard } from "@/components/todo/ticket/TicketCard"
import { EditCategory } from "./EditCategory"
import { Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "@/components/todo/ticket/AddTicket"
import { appendClass } from "@/lib/utils/classNameUtils"

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

  const handleSuccessCreate = useCallback(() => {
    ticketsContainerRef.current?.scrollTo(0, ticketsContainerRef.current.scrollHeight)
  }, [])

  return (
    <div ref={ref} {...otherProps} className={appendClass("flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full", [className])}>
      <div className="p-2">
        <EditCategory refId={id} initialValue={title} />
      </div>
      {tickets.length ?
        <div ref={ticketsContainerRef} className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full mb-2 vertical-scrollbar">
          {tickets.map((i, index) => <TicketCard key={index} {...i} />)}
        </div>
      : null}
      <AddTicket onSuccess={handleSuccessCreate} refId={id} />
    </div>
  )
})

CategoryCard.displayName = "CategoryCard"
