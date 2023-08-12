'use client'

import { editCategory } from "@/queries/client/category"
import { FC, useCallback, useTransition } from "react"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { useRouter } from "next/navigation"
import { appendNewClasses } from "@/lib/utils/classNameUtils"

type EditCategoryProps = {
  defaultValue: string
  refId: string
}

export const EditCategory:FC<EditCategoryProps> = ({
  defaultValue,
  refId
}) => {
  const router = useRouter()
  const [isPendingTransition, startTransition] = useTransition()

  const handleSuccessfulEdit = useCallback(() => {
    startTransition(() => {
      router.refresh()
    })
  }, [router])

  return (
    <InlineForm
      className=''
      defaultValue={defaultValue}
      refId={refId}
      query={editCategory}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulEdit}
      render={(renderProps) => (
        <h4 {...renderProps} className={appendNewClasses("font-bold text-slate-50", [renderProps.className])}>{defaultValue}</h4>
      )}
    />
  )
}