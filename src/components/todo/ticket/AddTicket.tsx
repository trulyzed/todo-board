'use client'

import { FC, useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createTicket } from "@/queries/client/ticket"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"

type AddTicketProps = {
  onSuccess?: () => void
}

export const AddTicket:FC<AddTicketProps> = ({
  onSuccess
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const handleSuccessfulCreate = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
    onSuccess?.()
  }, [router, onSuccess])

  return (
    <InlineForm
      className={''}
      query={createTicket}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulCreate}
    >
      <button className={`self-start rounded bg-blue-800 px-2 py-1 text-white flex items-center gap-2 shrink-0`}>
        <Plus weight="bold" />
        {"Add Ticket"}
      </button>
    </InlineForm>
  )
}
