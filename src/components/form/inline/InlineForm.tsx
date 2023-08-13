'use client'

import { FC, useCallback, useEffect, useState } from "react"
import { FormValue } from "@/components/form/types"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { InlineFormProps } from "./types"
import { InlineFormField } from "./InlineFormField"
import { useForm } from "@/components/form/hooks/useForm"
import { InlineDisplayField } from "./InlineDisplayField"
import { useDraft } from "@/components/form/hooks/useDraft"

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
  const { formValues, handleSubmit, setFieldValue, hasUnsavedValue, handleReset: resetForm } = useForm({initialValues: {
    [fieldId]: initialValue
  }, clearAfterSubmit})
  const [showForm, setShowForm] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { draft, clearDraft } = useDraft({
    canDraft,
    draftId: `${refId}_${fieldId}`,
    unsavedValue: hasUnsavedValue ? formValues?.[fieldId] : undefined
  })

  useEffect(() => {
    setFieldValue(fieldId, initialValue)
  }, [setFieldValue, initialValue, fieldId])
  
  const handleHideForm = useCallback(() => {
    setShowForm(false)
    resetForm(true)
  }, [resetForm])

  const handleShowForm = useCallback(() => {
    setShowForm(true)
  }, [])

  const onSubmit = useCallback((values: FormValue) => {
    if (processing) return
    setProcessing(true)
    query({
      ...values,
      ...refId && {id: refId},
      ...queryParams
    }).then((resp) => {
      onSuccess?.(resp)
      setShowForm(false)
      clearDraft()
    }).finally(() => {
      setProcessing(false)
    })
  }, [processing, query, queryParams, refId, onSuccess, clearDraft])

  const handleLoadDraft = useCallback((value: string) => {
    setFieldValue(fieldId, value)
    setShowForm(true)
  }, [fieldId, setFieldValue])

  useEffect(() => {
    onToggle?.(showForm)
  }, [showForm, onToggle])

  return (
    <>
      <InlineDisplayField
        show={!showForm}
        render={render}
        clickEventHandler={clickEventHandler}
        onShow={handleShowForm}
        draft={draft}
        onLoadDraft={handleLoadDraft}
      />
      <InlineFormField
        formClassName={appendNewClasses("", [className])}
        show={showForm}
        fieldId={fieldId}
        onHide={handleHideForm}
        setFieldValue={setFieldValue}
        formValues={formValues}
        onSubmit={handleSubmit(onSubmit)}
        inputType={inputType}
        required={required}
        processing={processing}
      />
    </>
  )
}