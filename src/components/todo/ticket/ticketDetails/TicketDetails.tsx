'use client'

import { FC, useCallback, useEffect, useState, useTransition } from "react"
import { getTicket } from "@/queries/client/ticket"
import { EditTicketDetails } from "./EditTicketDetails"
import { useRouter } from "next/navigation"
import { formatDate } from "@/lib/utils/dateUtils"

type TicketDetailsProps = {
  id: string
  title: string
  description?: string
  expiresAt?: string
}

export const TicketDetails:FC<TicketDetailsProps> = ({
  id,
  title,
  description,
  expiresAt,
}) => {
  const [ticketDetails, setTicketDetails] = useState({id, title, description, expiresAt})
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  useEffect(() => {
    (async () => {
      const data = await getTicket({id})
      setTicketDetails({
        ...data,
        expiresAt: formatDate(data.expiresAt)
      })
    })()
  }, [id])

  const handleSuccessfulEdit = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  return (
    <div className="rounded-lg bg-zinc-400 p-4">
      <EditTicketDetails {...ticketDetails} onSuccess={handleSuccessfulEdit} />
    </div>
  )
}
