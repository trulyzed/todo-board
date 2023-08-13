import { FormEvent, useCallback, useState } from "react"
import { FormValue } from "@/components/form/types"

type UseFormArguments = {
  initialValues?: FormValue
  clearAfterSubmit?: boolean
}

export const useForm = (options?: UseFormArguments) => {
  const { initialValues, clearAfterSubmit } = options || {}
  const [formValues, setFormValues] = useState<FormValue | undefined>(initialValues)
  
  const setFieldValue = useCallback((field: string, value?: string) => {
    setFormValues(prevValue => ({
      ...prevValue,
      [field]: value
    }))
  }, [])

  const handleSubmitSuccess = useCallback(() => {
    if (clearAfterSubmit) setFormValues(undefined)
  }, [clearAfterSubmit])

  const handleSubmit = useCallback((onSubmit: (data: FormValue | undefined) => Promise<boolean> | void) => async (e: FormEvent) => {
    e.preventDefault()
    const success = await onSubmit(formValues)
    if (success) handleSubmitSuccess()
  }, [formValues, handleSubmitSuccess])

  return {
    formValues,
    setFieldValue,
    handleSubmit,
  }
}