'use client'

import { useCallback, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { AddNew, AddNewProps } from "@/components/todo/addNew/AddNew"
import { createCategory } from "@/queries/client/category"

export const AddCategory = () => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()
  const [processing, setProcessing] = useState(false)
  const handleAddNew: AddNewProps['onSubmit'] = useCallback((values) => {
    setProcessing(true)
    createCategory(values).finally(() => {
      setProcessing(false)
      startTransition(() => {
        router.refresh()
      })
    })
  }, [router])

  return (
    <AddNew className="self-start" onSubmit={handleAddNew} loading={processing} />
  )
}
