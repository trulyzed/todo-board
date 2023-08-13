'use client'

import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { FormProps, FormValue } from "@/components/form/types"
import { Form } from "@/components/form/Form"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { CancelAction } from "./CancelAction"
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick"
import { useDetectKeyPress } from "@/hooks/useDetectKeyPress"
import { InlineFormProps } from "./types"
import { InlineFormField } from "./InlineFormField"
import { useForm } from "@/components/form/hooks/useForm"

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
  enableDraft
}) => {
  const formRef = useRef(null)
  const { formValues, handleSubmit, setFieldValue } = useForm({initialValues: {
    [fieldId]: initialValue
  }, clearAfterSubmit})
  const [showInput, setShowInput] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    setFieldValue(fieldId, initialValue)
  }, [setFieldValue, initialValue, fieldId])

  const fields = useMemo<FormProps['fields']>(() => ([{
    id: fieldId,
    inputType,
    required,
  }]), [fieldId, inputType, required])
  
  const handleHideInput = useCallback(() => {
    setShowInput(false)
  }, [])

  useDetectOutsideClick(formRef, handleHideInput)
  useDetectKeyPress(undefined, handleHideInput)

  const handleToggleInput = useCallback(() => {
    setShowInput(prevVal => !prevVal)
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
      setShowInput(false)
    }).finally(() => {
      setProcessing(false)
    })
  }, [processing, query, queryParams, refId, onSuccess])

    // // Save as draft before unload if values are changed
    // useEffect(() => {
    //   if (!onSaveDraft) return
    //   const handleBeforeUnload = () => {
    //     if (hasChangedRef.current) onSaveDraft(formValues)
    //   }
  
    //   window.addEventListener('beforeunload', handleBeforeUnload)
    //   return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload)
    //   }
    // }, [formValues, onSaveDraft])

  // const handleSaveDraft: FormProps['onSaveDraft'] = useCallback((values?: FormValue) => {
  //   if (!enableDraft) return
  //   if (values?.[fieldId]) localStorage.setItem(`draft_${refId}_${fieldId}`, values[fieldId])
  // }, [enableDraft, fieldId, refId])

  useEffect(() => {
    onToggle?.(showInput)
  }, [showInput, onToggle])

  return !showInput ?
    <InlineFormField
      refId={refId}
      fieldId={fieldId}
      clickEventHandler={clickEventHandler}
      handleToggleInput={handleToggleInput}
      render={render}
      enableDraft={enableDraft}
    />
    : <Form
        ref={formRef}
        className={appendNewClasses("", [className])}
        fields={fields}
        setFieldValue={setFieldValue}
        formValues={formValues}
        onSubmit={handleSubmit(onSubmit)}
        actions={[<CancelAction key={'cancelAction'} onCancel={handleToggleInput} />]}
        submitLabel={processing ? "..." : undefined}
        autofocusField={fieldId}
      />
}

//         onSaveDraft={handleSaveDraft}