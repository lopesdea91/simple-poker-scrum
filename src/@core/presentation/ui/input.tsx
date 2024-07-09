import * as React from "react"
import { cn } from "@core/framework/utils"

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const InputContent = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-stone-200 bg-white px-3 py-1 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputContent.displayName = "Input"


interface InputRootProps
  extends React.HTMLAttributes<HTMLDivElement> { }

const InputRoot: React.FC<InputRootProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={cn('p-1 flex flex-col gap-1', className)}>{children}</div>
  )
}

interface InputErrorProps
  extends React.HTMLAttributes<HTMLSpanElement> { }

const InputError: React.FC<InputErrorProps> = ({ children, className, ...props }) => {
  return (
    <span {...props} className={cn('inline-block px-1 text-xs italic', className)}>{children}</span>
  )
}

const Input = {
  Content: InputContent,
  Root: InputRoot,
  Error: InputError,
}

export { Input }
