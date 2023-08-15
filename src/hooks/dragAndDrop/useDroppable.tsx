import { useCallback, useState, DragEvent, DragEventHandler } from "react"

export type DroppableAttributes = {
  onDrop: DragEventHandler
  onDragEnter: DragEventHandler
  onDragOver: DragEventHandler
  onDragLeave: DragEventHandler
}

export const useDroppable = () => {
  const [state, setState] = useState<{
    [id: string]: {draggingOver: boolean}
  }>()

  const handleDrop: (id: string) => DroppableAttributes['onDrop'] = useCallback((id) => (event) => {
    event.dataTransfer.getData('text/plain')
  }, [])

  const handleDragEnter: (id: string) => DroppableAttributes['onDragEnter'] = useCallback((id) => (event) => {
    event.preventDefault()
    console.log(event.dataTransfer.getData('text/plain'), id)
  }, [])

  const handleDragOver: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    event.preventDefault()
    setState(prevVal => ({
      ...prevVal,
      [id]: {draggingOver: true}
    }))
  }, [])

  const handleDragLeave: (id: string) => DroppableAttributes['onDragLeave'] = useCallback((id) => (event) => {
    event.preventDefault()
    setState(prevVal => ({
      ...prevVal,
      [id]: {draggingOver: false}
    }))
  }, [])

  const listeners: (id: string) => DroppableAttributes = useCallback((id: string) => ({
    onDrop: handleDrop(id),
    onDragEnter: handleDragEnter(id),
    onDragOver: handleDragOver(id),
    onDragLeave: handleDragLeave(id),
  }), [handleDrop, handleDragEnter, handleDragOver, handleDragLeave,])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    listeners,
    getState,
  }
}