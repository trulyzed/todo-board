'use client'

import { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Field, FormProps } from "@/components/form/types"
import { Form } from "@/components/form/Form"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { CancelAction } from "./CancelAction"
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick"
import { useDetectKeyPress } from "@/hooks/useDetectKeyPress"
import { InlineFormProps, RenderProps } from "./types"


export const InlineForm:FC<InlineFormProps> = ({
  className='',
  render,
  defaultValue,
  refId,
  query,
  queryParams,
  fieldId,
  required=false,
  inputType="Text",
  onSuccess,
  clearOnSuccess,
  onToggle,
  clickEventHandler
}) => {
  const formRef = useRef(null)
  const [showInput, setShowInput] = useState(false)
  const [processing, setProcessing] = useState(false)
  
  const handleHideInput = useCallback(() => {
    setShowInput(false)
  }, [])
  useDetectOutsideClick(formRef, handleHideInput)
  useDetectKeyPress(undefined, handleHideInput)

  const fields = useMemo<FormProps['fields']>(() => ([{
    id: fieldId,
    inputType,
    required,
  }]), [fieldId, inputType, required])
  const defaultValues = useMemo<FormProps['defaultValues']>(() => defaultValue !== undefined ? ({[fieldId]: defaultValue}) : undefined, [fieldId, defaultValue])

  const handleToggleInput = useCallback(() => {
    setShowInput(prevVal => !prevVal)
  }, [])

  const handleSubmit: FormProps['onSubmit'] = useCallback((values) => {
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

  const renderProps: RenderProps = useMemo(() => ({
    onClick: (event) => {
      clickEventHandler?.(event)
      handleToggleInput()
    },
    className: 'cursor-pointer',
  }), [clickEventHandler, handleToggleInput])

  useEffect(() => {
    onToggle?.(showInput)
  }, [showInput, onToggle])

  return !showInput ? render(renderProps) : (
    <Form
      ref={formRef}
      className={appendNewClasses("", [className])}
      fields={fields}
      onSubmit={handleSubmit}
      actions={[<CancelAction key={'cancelAction'} onCancel={handleToggleInput} />]}
      defaultValues={defaultValues}
      clearOnSuccess={clearOnSuccess}
      submitLabel={processing ? "..." : undefined}
      autofocusField={fieldId}
    />
  )
}