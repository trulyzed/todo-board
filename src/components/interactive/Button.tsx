import { appendClass } from "@/lib/utils/classNameUtils"
import { ComponentProps, HTMLProps, ReactNode, forwardRef } from "react"

export type ButtonProps = {
  className?: string
  children: ReactNode
  variant?: 'positive' | 'danger'
  link?: boolean
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className='',
  children,
  variant='positive',
  type='button',
  link,
  ...otherProps
}, ref) => {
  return (
    <button
      ref={ref}
      {...otherProps}
      className={appendClass(`flex items-center gap-2 rounded px-2 py-1 text-white font-semibold`, [
        className,
        !link && (variant === 'positive' ? "bg-blue-800" : variant === 'danger' ? "bg-red-700" : '') || '',
        link && (variant === 'positive' ? "text-blue-800" : variant === 'danger' ? "text-red-700" : '') || '',
      ])}
      type={type}>
      {children}
    </button>
  )
})

Button.displayName = "Button"