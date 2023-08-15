import { useCallback, useState, DragEventHandler } from "react"

type DroppableAttributes = {
  onDrop: DragEventHandler
  onDragOver: DragEventHandler
  onDragLeave: DragEventHandler
}

export type UseDropArguments = {
  onDrop: (data: {sourceId: string; targetId: string;}) => void
}

export const useDroppable = ({onDrop}: UseDropArguments) => {
  const [state, setState] = useState<{
    [id: string]: {draggingOver: boolean}
  }>()

  const dropHandler: (id: string) => DroppableAttributes['onDrop'] = useCallback((id) => (event) => {
    onDrop({sourceId: event.dataTransfer.getData('text/plain'), targetId: id})
  }, [onDrop])

  const dragOverHandler: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    event.preventDefault()
    setState(prevVal => ({
      ...prevVal,
      [id]: {draggingOver: true}
    }))
  }, [])

  const dragLeaveHandler: (id: string) => DroppableAttributes['onDragLeave'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {draggingOver: false}
    }))
  }, [])

  const listeners: (id: string) => DroppableAttributes = useCallback((id: string) => ({
    onDrop: dropHandler(id),
    onDragOver: dragOverHandler(id),
    onDragLeave: dragLeaveHandler(id),
  }), [dropHandler, dragOverHandler, dragLeaveHandler,])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    listeners,
    getState,
  }
}