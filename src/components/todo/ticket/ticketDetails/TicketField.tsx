import { ReactNode, forwardRef } from "react"

type TicketFieldProps = {
  value: ReactNode
  icon: ReactNode
}

export const TicketField = forwardRef<HTMLDivElement, TicketFieldProps>(({
  value,
  icon
}, ref) => {
  return (
    <div ref={ref} className="flex items-center gap-2">
      {icon}
      {value}
    </div>
  )
})

TicketField.displayName = "TicketField"