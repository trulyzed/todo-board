'use client'

import { FC, ReactNode, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { useDetectKeyPress } from "@/hooks/useDetectKeyPress";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { Button } from "@/components/interactive/Button";

export type ModalProps = {
  title?: ReactNode
  show?: boolean
  children: ReactNode
  onClose?: () => void
}

export const Modal: FC<ModalProps> = ({
  title,
  show,
  children,
  onClose
}) => {
  const modalRef = useRef(null)
  const handleClose = useCallback(() => {
    onClose?.()
  }, [onClose])
  useDetectKeyPress(undefined, handleClose)
  useDetectOutsideClick(modalRef, handleClose)

  if (!show) return null

  return (
    createPortal(
      <div className="bg-slate-900/75 absolute inset-0 m-auto overflow-y-auto flex items-center justify-center">
        <div ref={modalRef} className="w-[50vw] h-[50vh] bg-slate-200 rounded-xl drop-shadow-md">
          <div className="relative self-end">
            <Button onClick={handleClose} className="absolute right-0 bg-red-500 p-2 m-2">
              <X weight="bold" />
            </Button>
          </div>
          <div className="p-5 mt-6">
            {children}
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')!
    )
  )
}