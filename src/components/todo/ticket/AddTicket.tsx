'use client'

import { FC, useCallback, useMemo, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createTicket } from "@/queries/client/ticket"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"
import { appendNewClasses } from "@/lib/utils/classNameUtils"

type AddTicketProps = {
  onSuccess?: () => void
  refId: string
}

export const AddTicket:FC<AddTicketProps> = ({
  onSuccess,
  refId,
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const queryParams = useMemo(() => ({categoryId: refId}), [refId])

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
      queryParams={queryParams}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulCreate}
      render={(renderProps) => (
        <button {...renderProps} className={appendNewClasses(`self-start rounded bg-blue-800 px-2 py-1 text-white flex items-center gap-2 shrink-0`, [renderProps.className])}>
          <Plus weight="bold" />
          {"Add Ticket"}
        </button>
      )}
    />
  )
}
