'use client'

import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react"
import { Field, FormProps } from "./types"

export const Form:FC<FormProps> = ({fields, defaultValues, onSubmit, onSaveDraft}) => {
  const [formValues, setFormValues] = useState(defaultValues)

  const handleChange = useCallback((id: Field['id']) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues(prevValue => ({
      ...prevValue,
      [id]: e.target.value
    }))
  }, [])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }, [formValues, onSubmit])

  // Save as draft before unload
  useEffect(() => {
    if (!onSaveDraft) return
    const handleBeforeUnload = () => {
      onSaveDraft(formValues)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [formValues, onSaveDraft])

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {fields.map(i => (
        <div key={i.id} className="flex gap-2">
          <label className="shrink-0" htmlFor={i.id}>{i.label}</label>
          {i.inputType === "TextArea" ?
            <textarea
              className="w-full rounded"
              name={i.id}
              placeholder={i.placeholder}
              value={formValues?.[i.id] || ""}
              onChange={handleChange(i.id)}
              required={i.required}
              rows={10}
            />
            : <input
                className="w-full rounded py-2 px-1"
                name={i.id}
                type="text"
                placeholder={i.placeholder || (i.inputType === "DateTime" ? "Date format DD/MM/YYYY HH:MM" : undefined)}
                value={formValues?.[i.id] || ""}
                onChange={handleChange(i.id)}
                pattern={i.inputType === "DateTime" ? "[0-9]{1,2}/[0-9]{1,2}/[0-9]{4} [0-9]{1,2}:[0-9]{1,2}" : undefined}
                required={i.required}
              />
          }
        </div>
      ))}
      <button className="self-start bg-blue-500 rounded py-1 px-2 text-white" type="submit">Save</button>
    </form>
  )
}