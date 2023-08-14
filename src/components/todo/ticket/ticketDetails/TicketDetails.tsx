'use client'

import { FC, useCallback, useContext, useEffect, useState } from "react"
import { getTicket } from "@/queries/client/ticket"
import { EditTicketDetails } from "./EditTicketDetails"
import { formatDate } from "@/lib/utils/dateUtils"
import { Ticket } from "@prisma/client"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { useQuery } from "@/hooks/useQuery"
import { Spinner } from "@/components/layout/loader/Spinner"

type TicketDetailsProps = {
  refId: string
  categoryId: string
  title: string
  description?: string
  expiresAt?: string
}

interface IFormattedTicket {
  id: string
  title: string
  description?: string
  expiresAt?: string
}

export const TicketDetails:FC<TicketDetailsProps> = ({
  refId,
  categoryId,
  title,
}) => {
  const { data, loading } = useQuery<Ticket>({query: getTicket, params: {id: refId}})
  const { editTicket } = useContext(DataContext)
  const [ticketDetails, setTicketDetails] = useState<IFormattedTicket>({id: refId, title, })
  const { description, expiresAt } = ticketDetails as IFormattedTicket

  useEffect(() => {
    if (!data) return
    setTicketDetails({
      id: data.id,
      title: data.title,
      description: data.description === null ? undefined : data.description,
      expiresAt: data?.expiresAt ? formatDate(data.expiresAt) : ""
    })
  }, [data])

  const handleSuccessfulEdit = useCallback((data: Ticket) => {
    editTicket(categoryId, refId, data)
    setTicketDetails({
      id: data.id,
      title: data.title,
      description: data.description === null ? undefined : data.description ,
      expiresAt: data?.expiresAt ? formatDate(data.expiresAt) : ""
    })
  }, [editTicket, categoryId, refId])

  return loading ? <Spinner className="w-10 h-10" /> :(
    <div className="rounded-lg bg-zinc-100 p-2 my-2">
      <EditTicketDetails
        id={refId}
        title={ticketDetails.title}
        onSuccess={handleSuccessfulEdit}
        description={description === null ? undefined : description}
        expiresAt={expiresAt === null ? undefined : expiresAt as unknown as string}
      />
    </div>
  )
}
