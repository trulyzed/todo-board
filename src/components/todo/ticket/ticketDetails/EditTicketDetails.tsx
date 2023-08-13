'use client'

import { FC, ReactNode, useMemo } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { editTicket } from "@/queries/client/ticket"
import { Subtitles, Article, Calendar } from "@phosphor-icons/react"
import { InlineFormProps, RenderProps } from "@/components/form/inline/types"
import { appendNewClasses } from "@/lib/utils/classNameUtils"

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
  expiresAt,
  onSuccess,
}) => {
  const fields = useMemo<InlineFormProps[]>(() => ([
    {
      fieldId: "title",
      refId: id,
      required: true,
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={title} icon={<Subtitles weight="bold" className="shrink-0" />} />,
      initialValue: title,
      onSuccess: onSuccess
    },
    {
      fieldId: "description",
      refId: id,
      inputType: "TextArea",
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={description} icon={<Article weight="bold" className="shrink-0" />} />,
      initialValue: description,
      onSuccess: onSuccess,
      canDraft: true,
    },
    {
      fieldId: "expiresAt",
      refId: id,
      inputType: "DateTime",
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={expiresAt} icon={<Calendar weight="bold" className="shrink-0" />} />,
      initialValue: expiresAt,
      onSuccess: onSuccess
    },
  ]), [onSuccess, id, title, description, expiresAt])

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field) => <InlineForm key={field.fieldId} {...field} />)}
    </div>
  )
}


type TicketFieldProps = {
  value: ReactNode
  icon: ReactNode
} & RenderProps

export const TicketField:FC<TicketFieldProps> = ({
  value,
  icon,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={appendNewClasses("flex items-center bg-gray-200 rounded p-3 gap-2 min-h-[50px]", [otherProps.className])}>
      {icon} {value}
    </div>
  )
}