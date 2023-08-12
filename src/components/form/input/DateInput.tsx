'use client'

import { ChangeEvent, FC, useCallback } from "react"
import { Field } from "@/components/form/types"
import { DATE_FORMAT } from "@/components/form/constants"

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
    onChange(e.target.value)
  }, [onChange])

  return (
    <input
      className={className}
      name={id}
      type="text"
      placeholder={placeholder || `Date format ${DATE_FORMAT}`}
      pattern={"[0-9]{2}/[0-9]{2}/[0-9]{4} [0-9]{2}:[0-9]{2}"}
      value={value}
      onChange={handleChange}
      required={required}
      autoFocus={autoFocus}
    />
  )
}