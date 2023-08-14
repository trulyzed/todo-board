'use client'

import { useCallback, useContext } from "react"
import { createCategory } from "@/queries/client/category"
import { InlineForm } from "@/components/form/inline/InlineForm"
import { Plus } from "@phosphor-icons/react"
import { Button } from "@/components/interactive/Button"
import { Category } from "@prisma/client"
import { DataContext } from "@/context/dataProvider/DataProvider"

export const AddCategory = () => {
  const { addCategory } = useContext(DataContext)

  const handleSuccessfulCreate = useCallback((data: Category) => {
    addCategory(data)
  }, [addCategory])

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
      clearAfterSubmit
    />
  )
}
