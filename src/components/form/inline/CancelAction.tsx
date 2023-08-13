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
    <Button className={appendNewClasses(`rounded bg-red-500 px-2 py-1 text-white flex items-center gap-2`, [className])} onClick={onCancel}>
      {label}
    </Button>
  )
}