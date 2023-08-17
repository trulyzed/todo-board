import { FC, useMemo } from "react"
import { TicketCard } from "./TicketCard"
import { Ticket } from "@prisma/client"
import { useTicketDragDrop } from "./hooks/useTicketDragDrop"

type TicketListProps = {
  categoryId: string
  tickets: Ticket[]
}

export const TicketList: FC<TicketListProps> = ({
  categoryId,
  tickets=[],
}) => {
  const sortedTickets = useMemo(() => tickets.sort((a, b) => (a.order || 0) - (b.order || 0)), [tickets])
  const { dragListeners, dropListeners, getState, enableDropInTicketList } = useTicketDragDrop({categoryId})

  return (
    sortedTickets.map((i, index) => (
      <div key={index} {...enableDropInTicketList() ? dropListeners(i.id) : {}} className={`py-1 ${getState(i.id)?.entered ? "border-dotted border-4 border-white opacity-40" : ""}`}>
        <TicketCard
          {...dragListeners(i.id)}
          className={`${getState(i.id)?.dragging ? "opacity-40" : ""}`}
          categoryId={categoryId} id={i.id} title={i.title}
        />
      </div>
    ))
  )
}