import { ComponentProps, ReactNode, forwardRef } from "react"

export type ButtonProps = {
  className?: string
  children: ReactNode
  variant?: 'positive' | 'danger'
  link?: boolean
  textSize?: string
} & ComponentProps<'button'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className='',
  children,
  variant='positive',
  type='button',
  link,
  textSize,
  ...otherProps
}, ref) => {
  const buttonClassName = classNames[`${link ? "link" : ""}-${variant}`]
  return (
    <button
      ref={ref}
      {...otherProps}
      className={`flex items-center gap-2 rounded px-2 py-1 font-semibold
        ${buttonClassName}
        ${className}
      `}
      type={type}>
      {children}
    </button>
  )
})

const classNames: {[key: string]: string} = {
  'link-danger': 'text-red-800',
  'link-positive': 'text-white',
  '-danger': 'bg-red-800 text-white',
  '-positive': 'bg-sky-800 text-white',
}

Button.displayName = "Button"