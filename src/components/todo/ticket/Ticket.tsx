'use client'

import { FC, useCallback } from "react"
import { Pencil } from "@phosphor-icons/react"

type TicketProps = {
  title: String
}

export const Ticket:FC<TicketProps> = ({
  title
}) => {
  const handleEdit = useCallback(() => {
    console.log('clicked')
  }, [])

  return (
    <div className="rounded-lg bg-zinc-700 flex items-center justify-between p-2 group relative">
      <p className="text-white">{title}</p>
      <div className="group-hover:block hidden cursor-pointer self-start rounded p-1 bg-zinc-800 absolute right-2">
        <Pencil color="white" onClick={handleEdit} />
      </div>
    </div>
  )
}
