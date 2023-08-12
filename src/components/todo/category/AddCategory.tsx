'use client'

import { useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createCategory } from "@/queries/client/category"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"

export const AddCategory = () => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const handleSuccessfulCreate = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  return (
    <InlineForm
      className={''}
      query={createCategory}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulCreate}
    >
      <button className={`self-start rounded bg-blue-800 px-2 py-1 text-white flex items-center gap-2 shrink-0`}>
        <Plus weight="bold" />
        {"Add Category"}
      </button>
    </InlineForm>
  )
}
