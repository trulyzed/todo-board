import { DragEvent, useCallback, useState } from "react"

export type DraggableAttributes = {
  draggable: boolean
  onDragStart: (event: DragEvent) => void
  onDragEnd: (event: DragEvent) => void
}

export const useDraggable = () => {
  const [state, setState] = useState<{
    [id: string]: {dragging: boolean}
  }>()
  const handleDragStart: (id: string) => DraggableAttributes['onDragStart'] = useCallback((id) => (event) => {
    event.dataTransfer.setData('text/plain', id)
    setState(prevVal => ({
      ...prevVal,
      [id]: {dragging: true}
    }))
  }, [])

  const handleDragEnd: (id: string) => DraggableAttributes['onDragEnd'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {dragging: false}
    }))
  }, [])

  const listeners: (id: string) => DraggableAttributes = useCallback((id: string) => ({
    draggable: true,
    onDragStart: handleDragStart(id),
    onDragEnd: handleDragEnd(id),
  }), [handleDragStart, handleDragEnd])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    listeners,
    getState,
  }
}