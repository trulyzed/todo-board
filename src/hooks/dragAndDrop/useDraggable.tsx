import { DragEventHandler, useCallback, useState } from "react"

export type DraggableAttributes = {
  draggable: boolean
  onDragStart: DragEventHandler
  onDragEnd: DragEventHandler
}

export const useDraggable = () => {
  const [state, setState] = useState<{
    [id: string]: {dragging: boolean}
  }>()
  const dragStartHandler: (id: string) => DraggableAttributes['onDragStart'] = useCallback((id) => (event) => {
    event.dataTransfer.setData('text/plain', id)
    setState(prevVal => ({
      ...prevVal,
      [id]: {dragging: true}
    }))
  }, [])

  const dragEndHandler: (id: string) => DraggableAttributes['onDragEnd'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {dragging: false}
    }))
  }, [])

  const listeners: (id: string) => DraggableAttributes = useCallback((id: string) => ({
    draggable: true,
    onDragStart: dragStartHandler(id),
    onDragEnd: dragEndHandler(id),
  }), [dragStartHandler, dragEndHandler])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    listeners,
    getState,
  }
}