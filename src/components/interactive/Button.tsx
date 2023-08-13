import { appendNewClasses } from "@/lib/utils/classNameUtils"
import { ComponentProps, HTMLProps, ReactNode, forwardRef } from "react"

export type ButtonProps = {
  className?: string
  children: ReactNode
  variant?: 'positive' | 'danger' | 'ghost'
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className='',
  children,
  variant='positive',
  type='button',
  ...otherProps
}, ref) => {
  return (
    <button
      ref={ref}
      {...otherProps}
      className={appendNewClasses(`flex items-center gap-2 rounded px-2 py-1 text-white font-semibold`, [
        className,
        variant === 'ghost' ? '' : variant === 'positive' ? "bg-blue-800" : "bg-red-800"
      ])}
      type={type}>
      {children}
    </button>
  )
})

Button.displayName = "Button"