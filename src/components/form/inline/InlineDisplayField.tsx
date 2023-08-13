'use client'

import { FC, useCallback, useMemo } from "react"
import { InlineFormProps, RenderProps } from "./types"
import { Pencil } from "@phosphor-icons/react"
import { useDraft } from "@/components/form/hooks/useDraft"
import { FormProps } from "@/components/form/types"

type InlineDisplayFieldProps = {
  show: boolean
  refId: InlineFormProps['refId']
  fieldId: InlineFormProps['fieldId']
  formValues: FormProps['formValues']
  render: InlineFormProps['render']
  handleToggleInput: () => void
  clickEventHandler: InlineFormProps['clickEventHandler']
  hasUnsavedValue: boolean
  canDraft?: boolean
  onLoadDraft?: (value: string) => void
}

export const InlineDisplayField:FC<InlineDisplayFieldProps> = ({
  show,
  refId,
  fieldId,
  formValues,
  render,
  clickEventHandler,
  handleToggleInput,
  hasUnsavedValue,
  canDraft=false,
  onLoadDraft,
}) => {
  const { draft } = useDraft({
    canDraft,
    draftId: `${refId}_${fieldId}`,
    unsavedValue: hasUnsavedValue ? formValues?.[fieldId] : undefined
  })

  const renderProps: RenderProps = useMemo(() => ({
    onClick: (event) => {
      clickEventHandler?.(event)
      handleToggleInput()
    },
    className: 'cursor-pointer',
  }), [clickEventHandler, handleToggleInput])

  const handleLoadDraft = useCallback(() => {
    if (!draft || !onLoadDraft) return
    onLoadDraft(draft)
  }, [onLoadDraft, draft])

  return show ? (
    <div className="flex items-center gap-2">
      <div className="grow">
        {render(renderProps)}
      </div>
      {draft ?
        <button className="text-red flex items-center gap-1 px-[4px] py-[2px] rounded ml-auto text-xs text-yellow-400 font-bold uppercase bg-yellow-900" onClick={handleLoadDraft}>
          Draft
          <Pencil weight="bold" />
        </button>
      : null}
    </div>
  ) : null
}

