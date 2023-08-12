'use client'

import { FC, MouseEventHandler, useCallback, useState } from "react"
import { EditTicket } from "./EditTicket"
import { TicketDetails } from "./ticketDetails/TicketDetails"

type TicketProps = {
  title: string
  id: string
}
export const Ticket:FC<TicketProps> = ({
  title,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleClick: MouseEventHandler = useCallback((e) => {
    if (isEditing) return
    setShowDetails(true)
  }, [isEditing])

  return showDetails ?
    <TicketDetails id={id} title={title} />
    : (
      <div className="rounded-lg bg-zinc-700 flex items-center justify-between p-2 group relative cursor-pointer" onClick={handleClick}>
        {!isEditing ? <p className="text-white select-none">{title}</p> : null}
        <EditTicket refId={id} defaultValue={title} onToggle={setIsEditing} />
      </div>
    )
}
