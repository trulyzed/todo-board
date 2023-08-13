'use client'

import { FC, useMemo, useRef } from "react"
import { InlineFormProps } from "./types"
import { Form } from "@/components/form/Form"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
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
  handleToggleInput: () => void
  show: boolean
  onHideInput: () => void
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
  handleToggleInput,
  onHideInput,
  onSubmit,
  processing
}) => {
  const formRef = useRef(null)
  useDetectOutsideClick(formRef, onHideInput)
  useDetectKeyPress(undefined, onHideInput)
  const fields = useMemo<FormProps['fields']>(() => ([{
    id: fieldId,
    inputType,
    required,
  }]), [fieldId, inputType, required])

  return show ? (
    <Form
      ref={formRef}
      className={appendNewClasses("", [formClassName])}
      fields={fields}
      setFieldValue={setFieldValue}
      formValues={formValues}
      onSubmit={onSubmit}
      actions={[<CancelAction key={'cancelAction'} onCancel={handleToggleInput} />]}
      submitLabel={processing ? "..." : undefined}
      autofocusField={fieldId}
    />
  ) : null
}

