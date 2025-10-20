"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  const [isOn, setIsOn] = React.useState(checked || false)

  React.useEffect(() => {
    if (checked !== undefined) {
      setIsOn(checked)
    }
  }, [checked])

  const handleClick = () => {
    const newState = !isOn
    setIsOn(newState)
    if (onCheckedChange) {
      onCheckedChange(newState)
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isOn ? "bg-primary" : "bg-input",
        className
      )}
      onClick={handleClick}
      ref={ref}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform",
          isOn ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  )
})

Switch.displayName = "Switch"

export { Switch }
