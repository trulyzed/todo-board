import { FC } from "react"
import { Ticket } from "@/components/todo/ticket/Ticket"

type CategoryProps = {
  title: string
}

export const Category:FC<CategoryProps> = ({
  title
}) => {
  const tickets = [
    {
      title: "Ticket 1"
    },
  ]
  return (
    <div className="flex flex-col rounded-xl p-2 bg-zinc-900 max-h-full">
      <h4 className="font-bold text-slate-50 p-2">{title}</h4>
      <div className="flex flex-col p-1 mt-1 gap-2 overflow-y-auto max-h-full">
        {tickets.map((i, index) => <Ticket key={index} {...i} />)}
      </div>
    </div>
  )
}
