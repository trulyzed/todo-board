'use client'

import { Button } from "@/components/interactive/Button"
import { X } from "@phosphor-icons/react"
import { FC, ReactNode, useMemo } from "react"
import { createPortal } from "react-dom"

type AlertProps = {
  children?: ReactNode
  message?: ReactNode
  onClose?: () => void
}

export const Alert:FC<AlertProps> = ({
  children,
  message,
  onClose
}) => {
  const content = useMemo(() => (
    <div className="rounded bg-zinc-100 drop-shadow">
      <div className="self-end">
        <Button onClick={onClose} className="absolute right-0 px-0 py-0 mx-0 my-1" link>
          <X weight="bold" className="fill-red-500"/>
        </Button>
      </div>
      <div className="mt-6 mb-6 ml-4 mr-8">
        {message}
        {children}
      </div>
    </div>
  ), [children, message, onClose])

  return createPortal(content, document.getElementById('notification-root')!)
}