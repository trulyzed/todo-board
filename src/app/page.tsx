'use client'

import { useContext, useEffect } from "react"
import { AddCategory } from "@/components/todo/category/AddCategory"
import { CategoryCard } from "@/components/todo/category/CategoryCard"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { getCategories } from "@/queries/client/category"
import { useQuery } from "@/hooks/useQuery"
import { Category } from "@prisma/client"
import { HomePageSkeleton } from "@/components/layout/loader/skeletons/HomePageSkeleton"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { useDraggable } from "@/hooks/dragAndDrop/useDraggable"
import { useDroppable } from "@/hooks/dragAndDrop/useDroppable"
import { appendClass } from "@/lib/utils/classNameUtils"

export default function Page() {
  const { data, loading } = useQuery<Category[]>({query: getCategories})
  const { categories, setCategories } = useContext(DataContext)
  const { listeners: draggableListeners, getState: getDraggableState } = useDraggable()
  const { listeners: droppableListeners, getState: getDroppableState } = useDroppable()

  useEffect(() => {
    setCategories(data || [])
  }, [setCategories, data])

  return loading ?
    <HomePageSkeleton />
    : (
      <div className="flex items-start grow p-4 gap-3 overflow-x-auto">
          {categories.map(i => (
            <div key={i.id} className={appendClass("basis-64 shrink-0 grow-0 h-full", [getDroppableState(i.id)?.draggingOver ? "droppable-container" : ""])} {...droppableListeners(i.id)}>
              <CategoryCard id={i.id} title={i.title} tickets={(i as CategoryWithTickets).tickets} {...draggableListeners(i.id)} className={getDraggableState(i.id)?.dragging ? "draggable-item" : ""} />
            </div>
          ))}
        <AddCategory />
      </div>
    )
}
