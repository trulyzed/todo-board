import { useCallback, useState, DragEvent } from "react"

export type DroppableAttributes = {
  onDrop: (event: DragEvent) => void
  onDragOver: (event: DragEvent) => void
  onDragLeave: (event: DragEvent) => void
}

export const useDroppable = () => {
  const [state, setState] = useState<{
    [id: string]: {draggingOver: boolean}
  }>()

  const handleDrop: (id: string) => DroppableAttributes['onDrop'] = useCallback((id) => ({
    dataTransfer
  }) => {
    dataTransfer.getData('text/plain')
  }, [])

  const handleDragOver: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => ({
    dataTransfer
  }) => {
    dataTransfer.setData('text/plain', id)
    setState({[id]: {draggingOver: true}})
  }, [])

  const handleDragLeave: (id: string) => DroppableAttributes['onDragLeave'] = useCallback((id) => ({
    dataTransfer
  }) => {
    setState({[id]: {draggingOver: false}})
  }, [])

  const listeners: (id: string) => DroppableAttributes = useCallback((id: string) => ({
    onDrop: handleDrop(id),
    onDragOver: handleDragOver(id),
    onDragLeave: handleDragLeave(id),
  }), [handleDrop, handleDragOver, handleDragLeave])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    listeners,
    getState,
  }
}