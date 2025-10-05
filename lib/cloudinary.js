// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//     cloud_name:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY_NAME,
//     api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret:process.env.CLOUDINARY_SECRET_KEY,
// })

// export default cloudinary



import { v2 as cloudinary } from "cloudinary";

// Debug logs to verify environment variables
console.log("Cloudinary config - cloud_name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log("Cloudinary config - api_key:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
console.log("Cloudinary config - api_secret:", process.env.CLOUDINARY_SECRET_KEY);

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
