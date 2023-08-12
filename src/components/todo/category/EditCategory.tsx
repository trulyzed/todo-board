'use client'

import { editCategory } from "@/queries/client/category"
import { EditableText } from "@/components/todo/edit/EditableText"
import { FC } from "react"

type EditCategoryProps = {
  title: string
  id: string
}

export const EditCategory:FC<EditCategoryProps> = ({
  title, id
}) => {
  return <EditableText text={title} id={id} query={editCategory} payloadIndex="title" elementType="h4" className={"font-bold text-slate-50"} />
}