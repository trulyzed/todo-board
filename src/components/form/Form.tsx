'use client'

import { ChangeEvent, FormEvent, forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { Field, FormProps } from "./types"
import { TextInput } from "./input/TextInput"
import { DateInput } from "./input/DateInput"
import { TextAreaInput } from "./input/TextAreaInput"

export const Form = forwardRef<HTMLFormElement, FormProps>(({
  className,
  fields,
  defaultValues,
  onSubmit,
  onSaveDraft,
  submitLabel="Save",
  actions,
  clearOnSuccess,
  autofocusField
}, ref) => {
  const [formValues, setFormValues] = useState(defaultValues)
  const hasChangedRef = useRef(false)

  const handleChange = useCallback((id: Field['id']) => (value: string) => {
    setFormValues(prevValue => ({
      ...prevValue,
      [id]: value
    }))
    hasChangedRef.current = true
  }, [])

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const submitted = await onSubmit(formValues)
    if (submitted) hasChangedRef.current = false
    if (clearOnSuccess) setFormValues(undefined)
  }, [formValues, onSubmit, clearOnSuccess])

  // Save as draft before unload if values are changed
  useEffect(() => {
    if (!onSaveDraft) return
    const handleBeforeUnload = () => {
      if (hasChangedRef.current) onSaveDraft(formValues)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [formValues, onSaveDraft])

  return (
    <form ref={ref} className={`flex flex-col gap-2 ${className}`} onSubmit={handleSubmit}>
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