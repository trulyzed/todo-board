import { DragDropContext } from "@/context/DragDropProvider"
import { DataContext } from "@/context/dataProvider/DataProvider"
import { UseDropArguments, useDragDrop } from "@/hooks/dragAndDrop/useDragDrop"
import { changeCategoryOrders } from "@/queries/client/category"
import { useCallback, useContext } from "react"

type UseCategoryDropArguments = {
  
}

export const useCategoryDragDrop = ({}: UseCategoryDropArguments) => {
  const { initiatorContext, activeDragId } = useContext(DragDropContext)
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
    changeCategoryOrders({orders: newCategories.map(i => ({id: i.id, order: i.order}))})
  }, [sortedCategories, setCategories])

  const enableDropInCategory = useCallback((categoryId: string) => {
    return (categoryId !== initiatorContext) && activeDragId?.startsWith('ticket')
  }, [initiatorContext, activeDragId])

  const { dragListeners, dropListeners, getState } = useDragDrop({onDrop: handleDrag, identifier: 'category'})

  return {
    dragListeners,
    dropListeners,
    getState,
    enableDropInCategory
  }
}