'use client'

import { FC, useCallback, useState } from "react"
import { Plus } from "@phosphor-icons/react"
import { Form } from "@/components/form/Form"
import { FormProps } from "@/components/form/types"

export type AddNewProps = {
  title?: string
  className?: string
  loading?: boolean
  onSubmit: FormProps['onSubmit']
}

const fields: FormProps['fields'] = [
  {
    id: "title",
    inputType: "Text",
    required: true,
    placeholder: "Category Title"
  }
]

export const AddNew:FC<AddNewProps> = ({
  title="Add New",
  className,
  loading,
  onSubmit
}) => {
  const [showInput, setShowInput] = useState(false)

  const handleToggleInput = useCallback(() => {
    setShowInput(prevVal => !prevVal)
  }, [])

  const handleSubmit: FormProps['onSubmit'] = useCallback((values) => {
    if (loading) return
    onSubmit(values)
  }, [loading, onSubmit])

  return !showInput ? (
    <button className={`rounded bg-blue-800 px-2 py-1 text-white ${className} flex items-center gap-2 shrink-0`} onClick={handleToggleInput}>
      <Plus weight="bold" />
      {title}
    </button>
  ) : (
    <Form
      className="shrink-0"
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Add"
      actions={[
        <button key={"cancel"} className={`rounded bg-red-500 px-2 py-1 text-white ${className} flex items-center gap-2`} onClick={handleToggleInput}>
          Cancel
        </button>
      ]}
      clearOnSubmit
    />
  )
}