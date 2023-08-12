'use client'

import { ChangeEvent, FC, useCallback } from "react"
import { Field } from "@/components/form/types"

export const DateInput:FC<Omit<Field, "inputType"> & {
  className: string
  value?: string
  autoFocus?: boolean
  onChange: (value: string) => void
}> = ({
  className,
  id,
  placeholder,
  required,
  value='',
  autoFocus,
  onChange
}) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('xxxxxxxxxx', e.target.value)

  }, [onChange])

  return (
    <input
      className={className}
      name={id}
      type="text"
      placeholder={placeholder || "Date format DD/MM/YYYY HH:MM"}
      pattern={"[0-9]{1,2}/[0-9]{1,2}/[0-9]{4} [0-9]{1,2}:[0-9]{1,2}"}
      value={value}
      onChange={handleChange}
      required={required}
      autoFocus={autoFocus}
    />
  )
}