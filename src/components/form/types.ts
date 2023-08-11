import { ReactNode } from "react"
import { InputTypes } from "./constants"

export type Field = {
  id: string
  inputType: keyof typeof InputTypes
  label?: ReactNode
  placeholder?: string
  required?: boolean
}

export type FormValue = {
  [key: Field["id"]]: string
}

export type FormProps = {
  fields: Field[]
  defaultValues?: FormValue
  onSubmit: (values?: FormValue) => void
  onSaveDraft?: (values?: FormValue) => void
}