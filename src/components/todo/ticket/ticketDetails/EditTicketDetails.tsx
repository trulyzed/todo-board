'use client'

import { FC, useCallback, useMemo, useTransition } from "react"
import { InlineForm, InlineFormProps } from "@/components/form/inline/InlineForm"
import { editTicket } from "@/queries/client/ticket"
import { useRouter } from "next/navigation"

type EditTicketDetailsProps = {
  id: string
  title: string
  description?: string
  expiresAt?: string
}

export const EditTicketDetails:FC<EditTicketDetailsProps> = ({
  id,
  title
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const handleSuccessfulEdit = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  const fields = useMemo<InlineFormProps[]>(() => ([
    {
      fieldId: "title",
      refId: id,
      query: editTicket,
      children: <p className="text-white">{title}</p>,
      defaultValue: title,
      onSuccess: handleSuccessfulEdit
    },
  ]), [handleSuccessfulEdit, id, title])

  return (
    <div className="flex flex-col gap-3">
      {fields.map(({children, ...otherProps}, index) => <InlineForm key={index} {...otherProps}>{children}</InlineForm>)}
    </div>
  )
}
