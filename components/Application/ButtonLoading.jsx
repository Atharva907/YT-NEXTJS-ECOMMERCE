import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
export function ButtonLoading({ type, text, loading, className, onClick, ...props }) {
  return (
    <Button 
        type={type}                     
        disabled={loading}              
        onClick={onClick}               
        className={cn("", className)}   
        {...props}                      
    >
        {loading && <Loader2 className="animate-spin mr-2" />}  

        {text}
    </Button>
  )
}
