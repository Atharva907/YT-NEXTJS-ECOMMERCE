// Import React
import React from 'react'

// Import loading SVG image
import loading from "@/public/assets/images/loading.svg"

// Import Next.js Image component
import Image from 'next/image'

// ---------------------
// Loading Component
// ---------------------
const Loading = () => {
  return (
    // Full-screen container with centered loading image
    <div className='h-screen w-screen flex justify-center items-start mt-12'>
      {/* Next.js optimized Image component */}
      <Image 
        src={loading.src}      // Source of the loading image
        height={80}            // Image height
        width={80}             // Image width
        alt='Loading'          // Accessibility alt text
      />
    </div>
  )
}

export default Loading
