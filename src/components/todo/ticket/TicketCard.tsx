'use client'

import { MouseEventHandler, forwardRef, useCallback, useState } from "react"
import { EditTicket } from "./EditTicket"
import { TicketDetails } from "./ticketDetails/TicketDetails"
import { Modal } from "@/components/layout/modal/Modal"

type TicketCardProps = {
  className?: string
  title: string
  id: string
  categoryId: string
}
export const TicketCard = forwardRef<HTMLDivElement, TicketCardProps>(({
  className='',
  title,
  id,
  categoryId,
  ...otherProps
}, ref) => {
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
      <Modal show={showDetails} onClose={handleClose} title={title}>
        <TicketDetails refId={id} categoryId={categoryId} title={title} />
      </Modal>
      <div {...otherProps} ref={ref} className={`rounded-lg bg-zinc-700 flex items-center justify-between p-2 group cursor-pointer ${className}`} onClick={handleClick}>
        {!isEditing ? <p className="text-white select-none">{title}</p> : null}
        <EditTicket categoryId={categoryId} refId={id} initialValue={title} onToggle={setIsEditing} />
      </div>
    </>
    )
})

TicketCard.displayName = "TicketCard"
