"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface LineSpacerProps {
    className?: any | null;
    text?: any | null;
    props?: any | null;
}

const LineSpacer = React.forwardRef<HTMLInputElement, LineSpacerProps>(
  ({ className, text, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
            {text}
        </span>
        </div>
        </div>

    )
  }
)

export { LineSpacer }
