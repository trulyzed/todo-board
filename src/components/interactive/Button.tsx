import { appendClass } from "@/lib/utils/classNameUtils"
import { ComponentProps, ReactNode, forwardRef } from "react"

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
      className={appendClass(`flex items-center gap-2 rounded px-2 py-1 font-semibold`, [
        variant === 'danger' ? 'text-red-800' : "text-white",
        !link && (variant === 'positive' ? "bg-sky-800" : variant === 'danger' ? "bg-red-800" : '') || '',
        className,
      ])}
      type={type}>
      {children}
    </button>
  )
})

Button.displayName = "Button"