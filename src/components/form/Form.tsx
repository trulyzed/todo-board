'use client'

import { forwardRef, useCallback } from "react"
import { FormProps } from "./types"
import { TextInput } from "./input/TextInput"
import { DateInput } from "./input/DateInput"
import { TextAreaInput } from "./input/TextAreaInput"

export const Form = forwardRef<HTMLFormElement, FormProps>(({
  className,
  fields,
  formValues,
  setFieldValue,
  onSubmit,
  submitLabel="Save",
  actions,
  autofocusField
}, ref) => {
  const handleChange = useCallback((field: string) => (value: string) => setFieldValue(field, value), [setFieldValue])

  return (
    <form ref={ref} className={`flex flex-col gap-2 ${className}`} onSubmit={onSubmit}>
      {fields.map(i => (
        <div key={i.id} className="flex gap-2">
          {i.label ? <label className="shrink-0" htmlFor={i.id}>{i.label}</label> : null}
          {i.inputType === "TextArea" ?
            <TextAreaInput
              id={i.id}
              className="w-full rounded p-2"
              value={formValues?.[i.id] || ""}
              onChange={handleChange(i.id)}
              required={i.required}
              placeholder={i.placeholder}
              autoFocus={autofocusField === i.id}
            />
            : i.inputType === "DateTime" ?
              <DateInput
                id={i.id}
                className="w-full rounded p-2"
                value={formValues?.[i.id] || ""}
                onChange={handleChange(i.id)}
                required={i.required}
                placeholder={i.placeholder}
                autoFocus={autofocusField === i.id}
              />
            : <TextInput
                id={i.id}
                className="w-full rounded p-2"
                value={formValues?.[i.id] || ""}
                onChange={handleChange(i.id)}
                required={i.required}
                placeholder={i.placeholder}
                autoFocus={autofocusField === i.id}
              />
          }
        </div>
      ))}
      <div className="flex items-center gap-1">
        <button className="self-start bg-blue-800 rounded py-1 px-2 text-white" type="submit">{submitLabel}</button>
        {actions}
      </div>
    </form>
  )
})

Form.displayName = "Form"