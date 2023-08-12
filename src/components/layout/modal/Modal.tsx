'use client'

import { FC, ReactNode, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";
import { useDetectKeyPress } from "@/hooks/useDetectKeyPress";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";

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

  return show ? (
    createPortal(
      <div ref={modalRef} className="w-[calc(100vw_-_50%)] h-[calc(100vw_-_50%)] bg-black/80 absolute inset-0 m-auto overflow-y-auto rounded">
        <div className="relative">
          <button className="absolute right-0 bg-slate-200 rounded p-2 m-2" onClick={handleClose}>
            <X weight="bold" />
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
      </div>,
      document.getElementById('modal-root')!
    )
  ) : null
}