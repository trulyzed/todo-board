'use client'

import { FC, MutableRefObject, ReactNode, createContext, useRef } from "react"

type DragDropValue = {
  activeDragId?: MutableRefObject<string | null>
}

type DragDropProviderProps = {
  children: ReactNode
}

const initialValue: DragDropValue = {
  activeDragId: undefined
}

export const DragDropContext = createContext<DragDropValue>({
  ...initialValue
})

export const DragDropProvider:FC<DragDropProviderProps> = ({
  children
}) => {
  const activeDragId = useRef(null)
  return (
    <DragDropContext.Provider value={{
      activeDragId
    }}>
      {children}
    </DragDropContext.Provider>
  )
}