'use client'

import { Form } from "@/components/form/Form"
import { FormProps } from "@/components/form/types"
import { useRouter } from "next/navigation"
import { FC, ReactHTML, ReactNode, createElement, useCallback, useMemo, useState, useTransition } from "react"

type EditableText = {
  id: string
  payloadIndex: string
  text: string
  elementType: keyof ReactHTML
  className?: string
  query: (payload: any) => Promise<any>
}


export const EditableText: FC<EditableText> = ({
  id,
  payloadIndex,
  text,
  className,
  elementType,
  query
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()
  const [processing, setProcessing] = useState(false)
  const fields = useMemo<FormProps['fields']>(() => [
    {
      id: payloadIndex,
      inputType: "Text",
      required: true
    }
  ], [payloadIndex])

  const handleToggleInput = useCallback(() => {
    setShowInput(prevVal => !prevVal)
  }, [])

  const handleSubmit: FormProps["onSubmit"] = useCallback((values) => {
    if (processing) return
    setProcessing(true)
    query({id, ...values}).finally(() => {
      setProcessing(false)
      setShowInput(false)
      startTransition(() => {
        router.refresh()
      })
    })
  }, [router, processing, id, query])

  const clickableElement = useMemo(() => createElement(elementType, {
    onClick: handleToggleInput,
    className: `${className} cursor-pointer`,
  }, text), [elementType, handleToggleInput, className, text])

  const [showInput, setShowInput] = useState(false)
  return !showInput ? clickableElement
  : <Form
      fields={fields}
      onSubmit={handleSubmit}
      actions={[
        <button key={"cancel"} className={`rounded bg-red-500 px-2 py-1 text-white flex items-center gap-2`} onClick={handleToggleInput}>
          Cancel
        </button>
      ]}
      defaultValues={{[payloadIndex]: text}}
  />
}