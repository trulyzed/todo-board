'use client'

import { FC, useCallback, useRef } from "react"
import { TicketCard } from "@/components/todo/ticket/TicketCard"
import { EditCategory } from "./EditCategory"
import { Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "../ticket/AddTicket"

type CategoryCardProps = {
  id: string
  title: string
  tickets: TicketType[]
}

export const CategoryCard:FC<CategoryCardProps> = ({
  id,
  title,
  tickets=[],
}) => {
  const ticketsContainerRef = useRef<HTMLDivElement>(null)

  const handleSuccessCreate = useCallback(() => {
    ticketsContainerRef.current?.scrollTo(0, ticketsContainerRef.current.scrollHeight)
  }, [])

  return (
    <div className="flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full">
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
}
