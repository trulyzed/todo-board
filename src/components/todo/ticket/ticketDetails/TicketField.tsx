import { RenderProps } from "@/components/form/inline/types"
import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { FC, ReactNode } from "react"

type TicketFieldProps = {
  value: ReactNode
  icon: ReactNode
} & RenderProps

export const TicketField:FC<TicketFieldProps> = ({
  value,
  icon,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={appendNewClasses("flex items-center gap-2", [otherProps.className])}>
      {icon}
      {value}
    </div>
  )
}

TicketField.displayName = "TicketField"