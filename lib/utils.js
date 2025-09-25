// Import 'clsx' for conditional class names
import { clsx } from "clsx";        

// Import 'twMerge' to intelligently merge Tailwind CSS classes
import { twMerge } from "tailwind-merge"

// ---------------------
// Utility function to combine class names
// ---------------------
export function cn(...inputs) {
  // clsx(...inputs) combines multiple class names and ignores falsy values (like undefined/null)
  // twMerge(...) merges Tailwind classes, handling conflicts intelligently
  // Example: cn("px-2", "px-4") => "px-4"
  return twMerge(clsx(inputs));
}