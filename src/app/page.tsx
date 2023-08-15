'use client'

import { useCallback, useContext, useEffect, useMemo } from "react"
import { AddCategory } from "@/components/todo/category/AddCategory"
import { CategoryCard } from "@/components/todo/category/CategoryCard"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { editCategory, getCategories, updateCategoryOrders } from "@/queries/client/category"
import { useQuery } from "@/hooks/useQuery"
import { Category } from "@prisma/client"
import { HomePageSkeleton } from "@/components/layout/loader/skeletons/HomePageSkeleton"
import { CategoryWithTickets } from "@/context/dataProvider/types"
import { useDraggable } from "@/hooks/dragAndDrop/useDraggable"
import { UseDropArguments, useDroppable } from "@/hooks/dragAndDrop/useDroppable"
import { appendClass } from "@/lib/utils/classNameUtils"

export default function Page() {
  const { data, loading } = useQuery<Category[]>({query: getCategories})
  const { sortedCategories, setCategories } = useContext(DataContext)

  const handleDrag: UseDropArguments['onDrop'] = useCallback(({sourceId, targetId}) => {
    const newSortedCategories = [...sortedCategories]
    const sourceIndex = newSortedCategories.findIndex(i => i.id === sourceId)
    const targetIndex = newSortedCategories.findIndex(i => i.id === targetId)
    const source = newSortedCategories[sourceIndex]
    newSortedCategories.splice(sourceIndex, 1)
    newSortedCategories.splice(targetIndex, 0, source)
    const newCategories = newSortedCategories.map((i, index) => ({...i, order: index}))
    setCategories(newCategories)
    updateCategoryOrders({orders: newCategories.map(i => ({id: i.id, order: i.order}))})
  }, [sortedCategories, setCategories])

  const { listeners: draggableListeners, getState: getDraggableState } = useDraggable()
  const { listeners: droppableListeners, getState: getDroppableState } = useDroppable({onDrop: handleDrag})
  
  useEffect(() => {
    setCategories(data || [])
  }, [setCategories, data])

  return loading ?
    <HomePageSkeleton />
    : (
      <div className="flex items-start grow p-4 gap-3 overflow-x-auto">
          {sortedCategories.map(i => (
            <div {...droppableListeners(i.id)} key={i.id} className={appendClass("basis-64 shrink-0 grow-0 h-full", [getDroppableState(i.id)?.draggingOver ? "droppable-container" : ""])}>
              <CategoryCard {...draggableListeners(i.id)} id={i.id} title={i.title} tickets={(i as CategoryWithTickets).tickets} className={getDraggableState(i.id)?.dragging ? "draggable-item" : ""} />
            </div>
          ))}
        <AddCategory />
      </div>
    )
}
