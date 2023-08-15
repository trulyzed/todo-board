import { DragDropContext } from "@/context/DragDropProvider"
import { DragEventHandler, useCallback, useContext, useState } from "react"

export type DraggableAttributes = {
  draggable: boolean
  onDragStart: DragEventHandler
  onDragEnd: DragEventHandler
}

type DroppableAttributes = {
  onDrop: DragEventHandler
  onDragOver: DragEventHandler
  onDragEnter: DragEventHandler
  onDragLeave: DragEventHandler
}

export type UseDropArguments = {
  onDrop: (data: {sourceId: string; targetId: string;}) => void
  identifier: string
}

export const useDragDrop = ({onDrop, identifier}: UseDropArguments) => {
  const { activeDragId } = useContext(DragDropContext)
  const [state, setState] = useState<{
    [id: string]: {dragging?: boolean; entered?: boolean}
  }>()
  const getUniqueId = useCallback((id: string) => `${identifier}__${id}`, [identifier])
  const getId = useCallback((uniqueId: string) => uniqueId.replace(`${identifier}__`, ''), [identifier])
  const isValidId = useCallback((id: string) => id.startsWith(identifier), [identifier])

  const getState = useCallback((id: string) => {
    const uniqueId = getUniqueId(id)
    return state?.[uniqueId]
  }, [state, getUniqueId])

  // Draggable item listeners
  const dragStartHandler: (id: string) => DraggableAttributes['onDragStart'] = useCallback((id) => (event) => {
    event.stopPropagation()
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
    if (activeDragId) activeDragId.current = id
    setState(prevVal => ({
      ...prevVal,
      [id]: {...prevVal?.[id], dragging: true}
    }))
  }, [activeDragId])

  const dragEndHandler: (id: string) => DraggableAttributes['onDragEnd'] = useCallback((id) => (event) => {
    if (isValidId(activeDragId?.current || '')) {
      setState(prevVal => ({
        ...prevVal,
        [id]: {...prevVal?.[id], dragging: false, entered: false}
      }))
    }
  }, [activeDragId, isValidId])


  // Droppable container listeners
  const dragEnterHandler: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    event.stopPropagation()
    if (isValidId(activeDragId?.current || '')) {
      setState(prevVal => ({
        ...prevVal,
        [id]: {...prevVal?.[id], entered: true}
      }))
    }
  }, [activeDragId, isValidId])

  const dragOverHandler: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    return false
  }, [])

  const dragLeaveHandler: (id: string) => DroppableAttributes['onDragLeave'] = useCallback((id) => (event) => {
    event.stopPropagation()
    if (isValidId(activeDragId?.current || '')) {
      setState(prevVal => ({
        ...prevVal,
        [id]: {...prevVal?.[id], entered: false}
      }))
    }
  }, [activeDragId, isValidId])

  const dropHandler: (id: string) => DroppableAttributes['onDrop'] = useCallback((id) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    const sourceId = event.dataTransfer.getData('text/plain')
    if (isValidId(activeDragId?.current || '')) {
      if (sourceId !== id) onDrop({sourceId: getId(sourceId), targetId: getId(id)})
      setState(undefined)
      return false
    }
  }, [onDrop, getId, isValidId, activeDragId])

  const dragListeners: (id: string) => DraggableAttributes = useCallback((id: string) => {
    const uniqueId = getUniqueId(id)
    return {
      draggable: true,
      onDragStart: dragStartHandler(uniqueId),
      onDragEnd: dragEndHandler(uniqueId),
    }
  }, [dragStartHandler, dragEndHandler, getUniqueId])

  const dropListeners: (id: string) => DroppableAttributes = useCallback((id: string) => {
    const uniqueId = getUniqueId(id)
    return {
      onDrop: dropHandler(uniqueId),
      onDragEnter: dragEnterHandler(uniqueId),
      onDragLeave: dragLeaveHandler(uniqueId),
      onDragOver: dragOverHandler(uniqueId),
    }
  }, [dropHandler, dragEnterHandler, dragOverHandler, dragLeaveHandler, getUniqueId])

  return {
    dragListeners,
    dropListeners,
    getState,
  }
}
