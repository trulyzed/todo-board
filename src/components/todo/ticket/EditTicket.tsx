'use client'

import { editTicket as editTicketAPI } from "@/queries/client/ticket"
import { FC, useCallback, useContext } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Pencil } from "@phosphor-icons/react"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { InlineFormProps } from "@/components/form/inline/types"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { Ticket } from "@prisma/client"

type EditTicketProps = {
  initialValue: string
  refId: string
  categoryId: string
  onToggle?: InlineFormProps['onToggle']
}

export const EditTicket:FC<EditTicketProps> = ({
  initialValue,
  refId,
  categoryId,
  onToggle
}) => {
  const { editTicket } = useContext(DataContext)

  const handleSuccessfulEdit = useCallback((data: Ticket) => {
    editTicket(categoryId, refId, data)
  }, [editTicket, categoryId, refId])

  const handleClickEvent = useCallback((event: Event) => {
    event.stopPropagation()
  }, [])

  return (
    <InlineForm
      className=''
      initialValue={initialValue}
      refId={refId}
      query={editTicketAPI}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulEdit}
      onToggle={onToggle}
      clickEventHandler={handleClickEvent}
      render={(renderProps) => (
        <Pencil {...renderProps} color="white" className={appendNewClasses("group-hover:block hidden right-2", [renderProps.className])} />
      )}
    />
  )
}