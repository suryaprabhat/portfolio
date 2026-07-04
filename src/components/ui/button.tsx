import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            "bg-primary text-primary-foreground shadow hover:bg-opacity-90": variant === "default",
            "bg-[#7c3aed] text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/35 hover:bg-[#8b5cf6]": variant === "glow",
            "bg-[#ef4444] text-white shadow-sm hover:bg-[#dc2626]": variant === "destructive",
            "border border-white/10 bg-transparent shadow-sm hover:bg-white/5 hover:text-white": variant === "outline",
            "bg-white/5 text-white shadow-sm hover:bg-white/10": variant === "secondary",
            "hover:bg-white/5 hover:text-white": variant === "ghost",
            "text-primary underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-9 px-4 py-2": size === "default",
            "h-8 rounded-md px-3 text-xs": size === "sm",
            "h-10 rounded-md px-8": size === "lg",
            "h-9 w-9 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
