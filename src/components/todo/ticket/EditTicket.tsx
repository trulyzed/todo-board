'use client'

import { editTicket } from "@/queries/client/ticket"
import { FC, useCallback, useTransition } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { useRouter } from "next/navigation"
import { Pencil } from "@phosphor-icons/react"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { InlineFormProps } from "@/components/form/inline/types"

type EditTicketProps = {
  defaultValue: string
  refId: string
  onToggle?: InlineFormProps['onToggle']
}

export const EditTicket:FC<EditTicketProps> = ({
  defaultValue,
  refId,
  onToggle
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const handleSuccessfulEdit = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  const handleClickEvent = useCallback((event: Event) => {
    event.stopPropagation()
  }, [])

  return (
    <InlineForm
      className=''
      defaultValue={defaultValue}
      refId={refId}
      query={editTicket}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulEdit}
      onToggle={onToggle}
      clickEventHandler={handleClickEvent}
      render={(renderProps) => (
        <Pencil {...renderProps} color="white" className={appendNewClasses("group-hover:block hidden absolute right-2", [renderProps.className])} />
      )}
    />
  )
}