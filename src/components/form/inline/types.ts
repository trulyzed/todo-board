import { ReactNode } from "react"
import { Field } from "@/components/form/types"

export type RenderProps = {
  onClick: (e: any) => void,
  className: string
}

export type InlineFormProps = {
  className?: string
  initialValue?: string
  refId?: string
  render: (props: RenderProps) => ReactNode
  query: (payload: any) => Promise<any>
  queryParams?: any
  fieldId: string
  required?: Field['required']
  inputType?: Field['inputType']
  onSuccess?: (resp: any) => void
  clearAfterSubmit?: boolean
  onToggle?: (status: boolean) => void
  clickEventHandler?: (event: Event) => void
  canDraft?: boolean
  onShowForm?: (status: boolean) => void
}