'use client'

import { FC } from "react"
import { Button } from "@/components/interactive/Button"

type CancelActionProps = {
  label?: string
  onCancel: () => void
}

export const CancelAction:FC<CancelActionProps> = ({
  label="Cancel",
  onCancel
}) => {
  return (
    <Button variant="danger" link textSize="text-sm" onClick={onCancel} className={'text-sm'}>
      {label}
    </Button>
  )
}