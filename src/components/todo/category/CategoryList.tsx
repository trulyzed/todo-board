import { Ticket } from "@phosphor-icons/react"
import { Ticket as TicketType } from "@prisma/client"
import { FC, useRef } from "react"

type CategoryListProps = {
  tickets: TicketType[]
}

export const CategoryList: FC<CategoryListProps> = ({
  tickets
}) => {
  const listContainerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={listContainerRef} className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full mb-2">
      {tickets.map((i, index) => <Ticket key={index} {...i} />)}
    </div>
  )
}