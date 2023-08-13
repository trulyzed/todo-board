'use client'

import { FC, MouseEventHandler, useCallback, useState } from "react"
import { EditTicket } from "./EditTicket"
import { TicketDetails } from "./ticketDetails/TicketDetails"
import { Modal } from "@/components/layout/modal/Modal"

type TicketCardProps = {
  title: string
  id: string
}
export const TicketCard:FC<TicketCardProps> = ({
  title,
  id,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleClick: MouseEventHandler = useCallback((e) => {
    if (isEditing) return
    setShowDetails(true)
  }, [isEditing])

  const handleClose = useCallback(() => {
    setShowDetails(false)
  }, [])

  return (
    <>
      <Modal show={showDetails} onClose={handleClose}>
        <TicketDetails id={id} title={title} />
      </Modal>
      <div className="rounded-lg bg-zinc-700 flex items-center justify-between p-2 group cursor-pointer" onClick={handleClick}>
        {!isEditing ? <p className="text-white select-none">{title}</p> : null}
        <EditTicket refId={id} initialValue={title} onToggle={setIsEditing} />
      </div>
    </>
    )
}
