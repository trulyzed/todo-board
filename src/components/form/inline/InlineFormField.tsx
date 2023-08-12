import { FC, useMemo } from "react"
import { InlineFormProps, RenderProps } from "./types"
import { useDraftValue } from "@/hooks/useDraftValue"
import { Eye } from "@phosphor-icons/react"

type InlineFormFieldProps = {
  render: InlineFormProps['render']
  clickEventHandler: InlineFormProps['clickEventHandler']
  handleToggleInput: () => void
  enableDraft?: InlineFormProps['enableDraft']
  refId: InlineFormProps['refId']
  fieldId: InlineFormProps['fieldId']
}

export const InlineFormField:FC<InlineFormFieldProps> = ({
  refId,
  fieldId,
  render,
  clickEventHandler,
  handleToggleInput,
  enableDraft,
}) => {
  const draft = useDraftValue(!!enableDraft, `${refId}_${fieldId}`)
  const renderProps: RenderProps = useMemo(() => ({
    onClick: (event) => {
      clickEventHandler?.(event)
      handleToggleInput()
    },
    className: 'cursor-pointer',
  }), [clickEventHandler, handleToggleInput])

  return (
    <div className="flex items-center gap-2">
      <div className="grow">
        {render(renderProps)}
      </div>
      {draft ?
        <button className="text-red flex items-center gap-1 ml-auto text-sm text-blue-800 font-bold">
          <Eye weight="bold" />
          Draft
        </button>
      : null}
    </div>
  )
}