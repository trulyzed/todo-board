'use client'

import { FC, useMemo, useRef } from "react"
import { InlineFormProps } from "./types"
import { Form } from "@/components/form/Form"
import { appendClass } from "@/lib/utils/classNameUtils"
import { Field, FormProps } from "@/components/form/types"
import { CancelAction } from "./CancelAction"
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick"
import { useDetectKeyPress } from "@/hooks/useDetectKeyPress"

type InlineFormFieldProps = {
  formClassName?: string
  fieldId: InlineFormProps['fieldId']
  inputType: Field['inputType']
  required: Field['required']
  formValues: FormProps['formValues']
  setFieldValue: FormProps['setFieldValue']
  onHide: () => void
  show: boolean
  onSubmit: FormProps['onSubmit']
  processing: boolean
}

export const InlineFormField:FC<InlineFormFieldProps> = ({
  formClassName='',
  fieldId,
  inputType,
  required,
  formValues,
  setFieldValue,
  show,
  onHide,
  onSubmit,
  processing
}) => {
  const formRef = useRef(null)
  useDetectOutsideClick(formRef, onHide)
  useDetectKeyPress(undefined, onHide)

  const fields = useMemo<FormProps['fields']>(() => ([{
    id: fieldId,
    inputType,
    required,
  }]), [fieldId, inputType, required])

  return show ? (
    <Form
      ref={formRef}
      className={appendClass("bg-gray-200 rounded p-2", [formClassName])}
      inputClassName="bg-slate-300"
      fields={fields}
      setFieldValue={setFieldValue}
      formValues={formValues}
      onSubmit={onSubmit}
      actions={[<CancelAction key={'cancelAction'} onCancel={onHide} />]}
      autofocusField={fieldId}
      processing={processing}
    />
  ) : null
}

