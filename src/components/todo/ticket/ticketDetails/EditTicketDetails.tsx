'use client'

import { FC, useMemo } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { editTicket } from "@/queries/client/ticket"
import { Subtitles, Article } from "@phosphor-icons/react"
import { TicketField } from "./TicketField"
import { InlineFormProps } from "@/components/form/inline/types"

type EditTicketDetailsProps = {
  id: string
  title: string
  description?: string
  expiresAt?: string
  onSuccess?: InlineFormProps['onSuccess']
}

export const EditTicketDetails:FC<EditTicketDetailsProps> = ({
  id,
  title,
  description,
  onSuccess,
}) => {
  const fields = useMemo<InlineFormProps[]>(() => ([
    {
      fieldId: "title",
      refId: id,
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={title} icon={<Subtitles weight="bold" />} />,
      defaultValue: title,
      onSuccess: onSuccess
    },
    {
      fieldId: "description",
      refId: id,
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={description} icon={<Article weight="bold" />} />,
      defaultValue: description,
      onSuccess: onSuccess
    },
  ]), [onSuccess, id, title, description])

  return (
    <div className="flex flex-col gap-3">
      {fields.map((field) => <InlineForm key={field.fieldId} {...field} />)}
    </div>
  )
}
