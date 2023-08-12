import { ChangeEvent, FC, useCallback } from "react"
import { Field } from "@/components/form/types"

export const TextAreaInput:FC<Omit<Field, "inputType"> & {
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
    <textarea
      className={className}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required={required}
      autoFocus={autoFocus}
      rows={10}
    ></textarea>
  )
}