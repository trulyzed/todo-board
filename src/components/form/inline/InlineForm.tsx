'use client'

import { FC, useCallback, useEffect, useState } from "react"
import { FormValue } from "@/components/form/types"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { InlineFormProps } from "./types"
import { InlineFormField } from "./InlineFormField"
import { useForm } from "@/components/form/hooks/useForm"
import { InlineDisplayField } from "./InlineDisplayField"

export const InlineForm:FC<InlineFormProps> = ({
  className='',
  render,
  initialValue,
  refId,
  query,
  queryParams,
  fieldId,
  required=false,
  inputType="Text",
  onSuccess,
  clearAfterSubmit,
  onToggle,
  clickEventHandler,
  canDraft
}) => {
  const { formValues, handleSubmit, setFieldValue, hasUnsavedValue, resetToInitalValue } = useForm({initialValues: {
    [fieldId]: initialValue
  }, clearAfterSubmit})
  const [showInput, setShowInput] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    setFieldValue(fieldId, initialValue)
  }, [setFieldValue, initialValue, fieldId])
  
  const handleHideInput = useCallback(() => {
    setShowInput(false)
  }, [])

  const handleToggleInput = useCallback(() => {
    setShowInput(!showInput)
    if (!showInput) resetToInitalValue()
  }, [resetToInitalValue, showInput])

  const onSubmit = useCallback((values: FormValue) => {
    if (processing) return
    setProcessing(true)
    query({
      ...values,
      ...refId && {id: refId},
      ...queryParams
    }).then((resp) => {
      onSuccess?.(resp)
      setShowInput(false)
    }).finally(() => {
      setProcessing(false)
    })
  }, [processing, query, queryParams, refId, onSuccess])

  const handleLoadDraft = useCallback((value: string) => {
    setFieldValue(fieldId, value)
    setShowInput(true)
  }, [fieldId, setFieldValue])

  useEffect(() => {
    onToggle?.(showInput)
  }, [showInput, onToggle])

  return (
    <>
      <InlineDisplayField
        show={!showInput}
        refId={refId}
        fieldId={fieldId}
        formValues={formValues}
        render={render}
        clickEventHandler={clickEventHandler}
        handleToggleInput={handleToggleInput}
        hasUnsavedValue={hasUnsavedValue}
        canDraft={canDraft}
        onLoadDraft={handleLoadDraft}
      />
      <InlineFormField
        formClassName={appendNewClasses("", [className])}
        show={showInput}
        fieldId={fieldId}
        handleToggleInput={handleToggleInput}
        setFieldValue={setFieldValue}
        formValues={formValues}
        onSubmit={handleSubmit(onSubmit)}
        inputType={inputType}
        required={required}
        onHideInput={handleHideInput}
        processing={processing}
      />
    </>
  )
}