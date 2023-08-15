'use client'

import { FC, MutableRefObject, ReactNode, createContext, useRef } from "react"

type DragDropValue = {
  activeDragId?: MutableRefObject<string | null>
  initiatorContext?: MutableRefObject<any | null>
}

type DragDropProviderProps = {
  children: ReactNode
}

const initialValue: DragDropValue = {
  activeDragId: undefined,
  initiatorContext: undefined
}

export const DragDropContext = createContext<DragDropValue>({
  ...initialValue
})

export const DragDropProvider:FC<DragDropProviderProps> = ({
  children
}) => {
  const activeDragId = useRef(null)
  const initiatorContext = useRef(null)
  return (
    <DragDropContext.Provider value={{
      activeDragId,
      initiatorContext
    }}>
      {children}
    </DragDropContext.Provider>
  )
}