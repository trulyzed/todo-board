'use client'

import { FC, useCallback, useContext } from "react"
import { editCategory as editCategoryAPI } from "@/queries/client/category"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { appendClass } from "@/lib/utils/classNameUtils"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { Category } from "@prisma/client"

type EditCategoryProps = {
  initialValue: string
  refId: string
}

export const EditCategory:FC<EditCategoryProps> = ({
  initialValue,
  refId
}) => {
  const { editCategory } = useContext(DataContext)

  const handleSuccessfulEdit = useCallback((data: Category) => {
    editCategory(refId, data)
  }, [editCategory, refId])

  return (
    <InlineForm
      className=''
      initialValue={initialValue}
      refId={refId}
      query={editCategoryAPI}
      fieldId={'title'}
      required
      onSuccess={handleSuccessfulEdit}
      render={(renderProps) => (
        <h4 {...renderProps} className={appendClass("font-bold text-slate-50", [renderProps.className])}>{initialValue}</h4>
      )}
    />
  )
}