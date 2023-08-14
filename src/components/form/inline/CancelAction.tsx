'use client'

import { FC } from "react"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { Button } from "@/components/interactive/Button"

type CancelActionProps = {
  className?: string
  label?: string
  onCancel: () => void
}

export const CancelAction:FC<CancelActionProps> = ({
  className='',
  label="Cancel",
  onCancel
}) => {
  return (
    <Button variant="danger" link className={appendNewClasses(`text-sm`, [className])} onClick={onCancel}>
      {label}
    </Button>
  )
}