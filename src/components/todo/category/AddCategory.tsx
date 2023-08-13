'use client'

import { useCallback, useTransition } from "react"
import { useRouter } from "next/navigation"
import { createCategory } from "@/queries/client/category"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"
import { Button } from "@/components/interactive/Button"

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
      render={(renderProps) => (
        <Button {...renderProps} className="inline w-[max-content]">
          <Plus weight="bold" />
          {"Add Category"}
        </Button>
      )}
    />
  )
}
