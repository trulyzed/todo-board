'use client'

import { FC, useCallback } from "react"
import { Form } from "@/components/form/Form"
import { FormProps } from "@/components/form/types"
import { Subtitles, Article, Calendar } from "@phosphor-icons/react"

type TicketDetailsProps = {
  title: string
  description?: string
  expiry?: string
}

export const TicketDetails:FC<TicketDetailsProps> = ({
  title
}) => {
  const handleSubmit: FormProps['onSubmit'] = useCallback((values) => {
    console.log(values)
  }, [])

  const handleSaveDraft: Required<FormProps>['onSaveDraft'] = useCallback((values) => {
    console.log('xxxx', values)
  }, [])

  const fields: FormProps['fields'] = [
    {
      id: "title",
      inputType: "Text",
      label: <Subtitles weight="bold" color="white" />,
      required: true
    },
    {
      id: "description",
      inputType: "TextArea",
      label: <Article weight="bold" color="white" />,
    },
    {
      id: "expiry",
      inputType: "DateTime",
      label: <Calendar weight="bold" color="white" />,
    }
  ]
  return (
    <div className="rounded-lg bg-zinc-700 p-4">
      <Form fields={fields} onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
    </div>
  )
}
