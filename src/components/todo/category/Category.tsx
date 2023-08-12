'use client'

import { FC, useCallback, useRef } from "react"
import { Ticket } from "@/components/todo/ticket/Ticket"
import { EditCategory } from "./EditCategory"
import { Ticket as TicketType } from "@prisma/client"
import { AddTicket } from "../ticket/AddTicket"

type CategoryProps = {
  id: string
  title: string
  tickets: TicketType[]
}

export const Category:FC<CategoryProps> = ({
  id,
  title,
  // tickets=[],
}) => {
  const ticketsContainerRef = useRef<HTMLDivElement>(null)
  const tickets = [
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
    {title: "Ticket 1"},
  ]

  const handleSuccessCreate = useCallback(() => {
    ticketsContainerRef.current?.scrollTo(0, ticketsContainerRef.current.scrollHeight)
  }, [])

  return (
    <div className="flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full">
      <div className="p-2">
        <EditCategory refId={id} defaultValue={title} />
      </div>
      <div ref={ticketsContainerRef} className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full mb-2">
        {tickets.map((i, index) => <Ticket key={index} {...i} />)}
      </div>
      <AddTicket onSuccess={handleSuccessCreate} />
    </div>
  )
}
