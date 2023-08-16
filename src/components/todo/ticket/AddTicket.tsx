'use client'

import { FC, useCallback, useContext, useMemo } from "react"
import { createTicket } from "@/queries/client/ticket"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"
import { appendClass } from "@/lib/utils/classNameUtils"
import { Button } from "@/components/interactive/Button"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { Ticket } from "@prisma/client"

type AddTicketProps = {
  onSuccess?: () => void
  refId: string
}

export const AddTicket:FC<AddTicketProps> = ({
  onSuccess,
  refId,
}) => {
  const { addTicket } = useContext(DataContext)
  const queryParams = useMemo(() => ({categoryId: refId}), [refId])

  const handleSuccessfulCreate = useCallback((data: Ticket) => {
    onSuccess?.()
    addTicket(refId, data)
  }, [addTicket, refId, onSuccess])

  return (
    <InlineForm
      query={createTicket}
      queryParams={queryParams}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulCreate}
      render={(renderProps) => (
        <Button {...renderProps} className={appendClass(``, [renderProps.className, 'bg-sky-800 font-normal'])}>
          <Plus weight="bold" />
          {"Add Ticket"}
        </Button>
      )}
      clearAfterSubmit
    />
  )
}
