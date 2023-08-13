import { FormEventHandler, ReactNode } from "react"
import { InputTypes } from "./constants"

export type Field = {
  id: string
  inputType: keyof typeof InputTypes
  label?: ReactNode
  placeholder?: string
  required?: boolean
}

export type FormValue = {
  [key: Field["id"]]: string | undefined
} | undefined

export type FormProps = {
  className?: string
  fields: Field[]
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel?: string
  actions?: ReactNode
  autofocusField?: Field['id']
  formValues?: FormValue
  setFieldValue: (field: string, value: string) => void
}