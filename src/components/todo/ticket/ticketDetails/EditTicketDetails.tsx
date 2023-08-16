'use client'

import { FC, ReactNode, useMemo } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { editTicket } from "@/queries/client/ticket"
import { Subtitles, Article, Calendar, TextH } from "@phosphor-icons/react"
import { InlineFormProps, RenderProps } from "@/components/form/inline/types"
import { appendClass } from "@/lib/utils/classNameUtils"
import { formatDate } from "@/lib/utils/dateUtils"
import { DATE_DISPLAY_FORMAT, DATE_FORMAT } from "@/components/form/constants"

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
      render: (renderProps) => <TicketField {...renderProps} value={title} icon={<TextH weight="bold" className="shrink-0 text-xl" />} />,
      initialValue: title,
      onSuccess: onSuccess
    },
    {
      fieldId: "description",
      refId: id,
      inputType: "TextArea",
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={description} icon={<Article weight="bold" className="shrink-0 text-xl" />} isTextarea />,
      initialValue: description,
      onSuccess: onSuccess,
      canDraft: true,
    },
    {
      fieldId: "expiresAt",
      refId: id,
      inputType: "DateTime",
      query: editTicket,
      render: (renderProps) => <TicketField {...renderProps} value={expiresAt} icon={<Calendar weight="bold" className="shrink-0 text-xl" />} isDate />,
      initialValue: expiresAt,
      onSuccess: onSuccess,
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
  isTextarea?: boolean
  isDate?: boolean
} & RenderProps

export const TicketField:FC<TicketFieldProps> = ({
  value,
  icon,
  isTextarea,
  isDate,
  ...otherProps
}) => {
  return (
    <div
      {...otherProps}
      className={appendClass("flex items-center bg-gray-200 rounded p-3 gap-2", [
        otherProps.className,
        isTextarea ? "min-h-[100px]" : "min-h-[50px]"
      ])}>
      {icon} {(isDate && typeof value === 'string') ? formatDate(value, DATE_DISPLAY_FORMAT, DATE_FORMAT) : value}
    </div>
  )
}