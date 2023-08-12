'use client'

import { FC, ReactElement, cloneElement, useCallback, useMemo, useState } from "react"
import { Field, FormProps } from "@/components/form/types"
import { Form } from "@/components/form/Form"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { CancelAction } from "./CancelAction"

type InlineFormProps = {
  className?: string
  children: ReactElement
  defaultValue?: string
  refId?: string
  query: (payload: any) => Promise<any>
  fieldId: string
  required?: Field['required']
  inputType?: Field['inputType']
  onSuccess?: (resp: any) => void
  clearOnSuccess?: boolean
}

export const InlineForm:FC<InlineFormProps> = ({
  className='', children, defaultValue, refId, query, fieldId, required=false, inputType="Text", onSuccess, clearOnSuccess
}) => {
  const [showInput, setShowInput] = useState(false)
  const [processing, setProcessing] = useState(false)

  const fields = useMemo<FormProps['fields']>(() => ([{
    id: fieldId,
    inputType,
    required,
  }]), [fieldId, inputType, required])
  const defaultValues = useMemo<FormProps['defaultValues']>(() => defaultValue !== undefined ? ({[fieldId]: defaultValue}) : undefined, [fieldId, defaultValue])

  const handleToggleInput = useCallback(() => {
    setShowInput(prevVal => !prevVal)
  }, [])

  const clickableChildren = useMemo(() => cloneElement(children, {
    onClick: handleToggleInput,
    className: appendNewClasses(children.props.className, ['cursor-pointer']),
  }), [children, handleToggleInput])

  const handleSubmit: FormProps['onSubmit'] = useCallback((values) => {
    if (processing) return
    setProcessing(true)
    query({
      ...values,
      ...refId && {id: refId}
    }).then((resp) => {
      onSuccess?.(resp)
      setShowInput(false)
    }).finally(() => {
      setProcessing(false)
    })
  }, [processing, query, refId, onSuccess])

  return !showInput ? clickableChildren : (
    <Form
      className={appendNewClasses("", [className])}
      fields={fields}
      onSubmit={handleSubmit}
      actions={[<CancelAction key={'cancelAction'} onCancel={handleToggleInput} />]}
      defaultValues={defaultValues}
      clearOnSuccess={clearOnSuccess}
      submitLabel={processing ? "..." : undefined}
    />
  )
}