import * as React from "react"
import { cn } from "@/lib/utils"
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg"
  weight?: "normal" | "medium" | "semibold" | "bold"
}
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "md", weight = "medium", ...props }, ref) => {
    const sizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
    return (
      <label
        ref={ref}
        className={cn(
          "text-foreground",
          sizeClasses[size],
          weightClasses[weight],
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"
export { Label }