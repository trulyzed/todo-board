'use client'

import { FC, useCallback, useMemo } from "react"
import { InlineFormProps, RenderProps } from "./types"
import { Pencil } from "@phosphor-icons/react"

type InlineDisplayFieldProps = {
  show: boolean
  render: InlineFormProps['render']
  onShow: () => void
  clickEventHandler: InlineFormProps['clickEventHandler']
  draft?: string
  onLoadDraft?: (value: string) => void
}

export const InlineDisplayField:FC<InlineDisplayFieldProps> = ({
  show,
  render,
  clickEventHandler,
  onShow,
  draft,
  onLoadDraft,
}) => {
  const renderProps: RenderProps = useMemo(() => ({
    onClick: (event) => {
      clickEventHandler?.(event)
      onShow()
    },
    className: 'cursor-pointer',
  }), [clickEventHandler, onShow])

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

