'use client'

import { FC, useCallback, useEffect, useState, useTransition } from "react"
import { FormProps } from "@/components/form/types"
import { getTicket } from "@/queries/client/ticket"
import { EditTicketDetails } from "./EditTicketDetails"
import { useRouter } from "next/navigation"

type TicketDetailsProps = {
  id: string
  title: string
  description?: string
  expiresAt?: string
}

export const TicketDetails:FC<TicketDetailsProps> = ({
  id,
  title,
  description,
  expiresAt,
}) => {
  const [ticketDetails, setTicketDetails] = useState({id, title, description, expiresAt})
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  useEffect(() => {
    (async () => {
      const data = await getTicket({id})
      setTicketDetails(data)
    })()
  }, [id])

  const handleSubmit: FormProps['onSubmit'] = useCallback(async (values) => {
    return Promise.resolve(true) 
  }, [])

  const handleSaveDraft: Required<FormProps>['onSaveDraft'] = useCallback((values) => {
    console.log('xxxx', values)
  }, [])

  const handleSuccessfulEdit = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  return (
    <div className="rounded-lg bg-zinc-400 p-4">
      {/* <Form fields={fields} onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} defaultValues={{
        title: 'Title 1'
      }} /> */}
      {/* <InlineForm
        className=''
        defaultValue={defaultValue}
        refId={refId}
        query={editCategory}
        fieldId={'title'}
        required
        onSuccess={handleSuccessfulEdit}
      >
        <h4 className="font-bold text-slate-50">{defaultValue}</h4>
      </InlineForm> */}
      <EditTicketDetails {...ticketDetails} onSuccess={handleSuccessfulEdit} />
    </div>
  )
}
