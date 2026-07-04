import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "indigo" | "emerald" | "violet"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground shadow": variant === "default",
          "border-transparent bg-white/10 text-white hover:bg-white/15": variant === "secondary",
          "border-transparent bg-[#ef4444] text-white": variant === "destructive",
          "border-white/10 text-gray-300 bg-transparent": variant === "outline",
          "border-transparent bg-indigo-500/15 text-indigo-400 border border-indigo-500/30": variant === "indigo",
          "border-transparent bg-emerald-500/15 text-emerald-400 border border-emerald-500/30": variant === "emerald",
          "border-transparent bg-violet-500/15 text-violet-400 border border-violet-500/30": variant === "violet",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
