import { DragEventHandler, useCallback, useState } from "react"

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
}

export const useDragDrop = ({onDrop}: UseDropArguments) => {
  const [state, setState] = useState<{
    [id: string]: {dragging?: boolean; entered?: boolean}
  }>()
  const dragStartHandler: (id: string) => DraggableAttributes['onDragStart'] = useCallback((id) => (event) => {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', id)
    setState(prevVal => ({
      ...prevVal,
      [id]: {...prevVal?.[id], dragging: true}
    }))
  }, [])

  const dragEndHandler: (id: string) => DraggableAttributes['onDragEnd'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {...prevVal?.[id], dragging: false, entered: false}
    }))
  }, [])

  const dragEnterHandler: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {...prevVal?.[id], entered: true}
    }))
  }, [])

  const dragLeaveHandler: (id: string) => DroppableAttributes['onDragLeave'] = useCallback((id) => (event) => {
    setState(prevVal => ({
      ...prevVal,
      [id]: {...prevVal?.[id], entered: false}
    }))
  }, [])

  const dragOverHandler: (id: string) => DroppableAttributes['onDragOver'] = useCallback((id) => (event) => {
    event.preventDefault()
    return false
  }, [])

  const dropHandler: (id: string) => DroppableAttributes['onDrop'] = useCallback((id) => (event) => {
    event.stopPropagation()
    event.preventDefault()
    const sourceId = event.dataTransfer.getData('text/plain')
    if (sourceId !== id) onDrop({sourceId, targetId: id})
    setState(undefined)
    return false
  }, [onDrop])

  const dragListeners: (id: string) => DraggableAttributes = useCallback((id: string) => ({
    draggable: true,
    onDragStart: dragStartHandler(id),
    onDragEnd: dragEndHandler(id),
  }), [dragStartHandler, dragEndHandler])

  const dropListeners: (id: string) => DroppableAttributes = useCallback((id: string) => ({
    onDrop: dropHandler(id),
    onDragEnter: dragEnterHandler(id),
    onDragLeave: dragLeaveHandler(id),
    onDragOver: dragOverHandler(id),
  }), [dropHandler, dragEnterHandler, dragOverHandler, dragLeaveHandler,])

  const getState = useCallback((id: string) => {
    return state?.[id]
  }, [state])

  return {
    dragListeners,
    dropListeners,
    getState,
  }
}