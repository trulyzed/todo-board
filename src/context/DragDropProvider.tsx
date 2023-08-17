'use client'

import { FC, ReactNode, createContext, useState } from "react"

type DragDropValue = {
  activeDragId?: string
  initiatorContext?: string
  setActiveDragId: (value: string) => void
  setInitiatorContext: (value: string) => void
}

type DragDropProviderProps = {
  children: ReactNode
}

const initialValue: DragDropValue = {
  activeDragId: undefined,
  initiatorContext: undefined,
  setActiveDragId: () => {},
  setInitiatorContext: () => {},
}

export const DragDropContext = createContext<DragDropValue>({
  ...initialValue
})

export const DragDropProvider:FC<DragDropProviderProps> = ({
  children
}) => {
  const [activeDragId, setActiveDragId] = useState<string>()
  const [initiatorContext, setInitiatorContext] = useState<string>()
  return (
    <DragDropContext.Provider value={{
      activeDragId,
      initiatorContext,
      setActiveDragId,
      setInitiatorContext
    }}>
      {children}
    </DragDropContext.Provider>
  )
}