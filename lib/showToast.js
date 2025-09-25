// Import Bounce transition and toast function from react-toastify
import { Bounce, toast } from 'react-toastify'

// ---------------------
// Function to display toast notifications
// ---------------------
export const showToast = (type, message) => {
    // Default options for all toasts
    const options = {
        position: "top-right",      // Position of the toast on screen
        autoClose: 5000,            // Automatically close after 5 seconds
        hideProgressBar: false,     // Show progress bar
        closeOnClick: false,        // Disable close on click
        pauseOnHover: true,         // Pause auto-close on hover
        draggable: true,            // Allow dragging the toast
        progress: undefined,        // Custom progress bar (undefined uses default)
        theme: "light",             // Light theme for toast
        transition: Bounce,         // Bounce animation
    }

    // Show toast based on type
    switch(type){
        case 'info':
            toast.info(message, options)
            break
        case 'success':
            toast.success(message, options)
            break
        case 'warning':
            toast.warning(message, options)
            break
        case 'error':
            toast.error(message, options)
            break
        default:
            toast(message, options) // Fallback for unknown types
            break
    }
}