import { FormEvent, useCallback, useRef, useState } from "react"
import { FormProps, FormValue } from "@/components/form/types"

type UseFormArguments = {
  initialValues?: FormValue
  clearAfterSubmit?: boolean
}

export const useForm = (options?: UseFormArguments) => {
  const { initialValues, clearAfterSubmit } = options || {}
  const [formValues, setFormValues] = useState<FormValue | undefined>(initialValues)
  const [hasUnsavedValue, setHasUnsavedValue] = useState(false)
  
  const setFieldValue: FormProps['setFieldValue'] = useCallback((field, value, changeFromInput) => {
    setFormValues(prevValue => ({
      ...prevValue,
      [field]: value
    }))
    if (changeFromInput) setHasUnsavedValue(true)
  }, [])

  const handleSubmitSuccess = useCallback(() => {
    if (clearAfterSubmit) setFormValues(undefined)
    setHasUnsavedValue(false)
  }, [clearAfterSubmit])

  const handleSubmit = useCallback((onSubmit: (data: FormValue | undefined) => Promise<boolean> | void) => async (e: FormEvent) => {
    e.preventDefault()
    const success = await onSubmit(formValues)
    if (success) handleSubmitSuccess()
  }, [formValues, handleSubmitSuccess])

  const handleReset = useCallback(() => {
    setFormValues(undefined)
    setHasUnsavedValue(false)
  }, [])

  const resetToInitalValue = useCallback(() => {
    setFormValues(initialValues)
  }, [initialValues])

  return {
    formValues,
    setFieldValue,
    handleSubmit,
    hasUnsavedValue,
    handleReset,
    resetToInitalValue
  }
}