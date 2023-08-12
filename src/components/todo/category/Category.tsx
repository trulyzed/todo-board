import { FC } from "react"
import { Ticket } from "@/components/todo/ticket/Ticket"
import { EditCategory } from "./EditCategory"

type CategoryProps = {
  id: string
  title: string
}

export const Category:FC<CategoryProps> = ({
  id,
  title
}) => {
  const tickets = [
    {
      title: "Ticket 1"
    },
  ]
  return (
    <div className="flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full">
      <div className="p-2">
        <EditCategory id={id} title={title} />
      </div>
      <div className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full">
        {tickets.map((i, index) => <Ticket key={index} {...i} />)}
      </div>
    </div>
  )
}
