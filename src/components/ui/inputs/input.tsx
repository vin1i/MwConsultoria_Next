import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, size = "md", label, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 text-sm px-2",
      md: "h-10 text-base px-3",
      lg: "h-12 text-lg px-4"
    }

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}
        <input
          className={cn(
            "flex w-full rounded-md border border-input bg-background text-foreground shadow-sm transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus-visible:ring-destructive",
            sizeClasses[size],
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }