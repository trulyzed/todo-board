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
    <div className="rounded bg-zinc-100 p-2 drop-shadow">
      <div className="self-end">
        <Button onClick={onClose} className="absolute right-0 px-0 py-0 mr-2" link>
          <X weight="bold" className="fill-red-500"/>
        </Button>
      </div>
      <div className="mt-3 mb-2 ml-2 mr-5">
        {message}
        {children}
      </div>
    </div>
  ), [children, message, onClose])

  return createPortal(content, document.getElementById('notification-root')!)
}