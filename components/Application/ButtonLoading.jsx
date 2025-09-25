// Import loader icon from lucide-react
import { Loader2 } from "lucide-react"

// Import your Button component
import { Button } from "@/components/ui/button"

// Import utility function for merging class names
import { cn } from "@/lib/utils"

// ---------------------
// Button with Loading Spinner
// ---------------------
export function ButtonLoading({ type, text, loading, className, onClick, ...props }) {
  return (
    <Button 
        type={type}                     // Button type (button, submit, etc.)
        disabled={loading}              // Disable button when loading
        onClick={onClick}               // onClick handler
        className={cn("", className)}   // Merge additional class names
        {...props}                      // Spread other props
    >
        {/* Show spinner when loading */}
        {loading && <Loader2 className="animate-spin mr-2" />}  

        {/* Button text */}
        {text}
    </Button>
  )
}
