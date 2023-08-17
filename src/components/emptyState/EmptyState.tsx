import { FC, ReactNode } from "react"

type EmptyStateProps = {
  message: ReactNode
  className?: string
}

export const EmptyState:FC<EmptyStateProps> = ({
  message,
  className
}) => {
  return (
    typeof message === "string" ? <p className={`${className}`}>{message}</p> : message
  )
}