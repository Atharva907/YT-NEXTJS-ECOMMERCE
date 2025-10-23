// 'use client';

// import { Card, CardContent } from '@/components/ui/card';
// import React, { useState, useEffect, use } from 'react';
// import axios from 'axios';
// import VerifiedImg from '@/public/assets/images/verified.gif';
// import VerificationFailedImg from '@/public/assets/images/verification-failed.gif';
// import Logo from '@/public/assets/images/GameArenaLogo.png';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { WEBSITE_HOME } from '@/routes/WebsiteRoute';

// const EmailVerification = ({ params: paramsPromise }) => {
//   const params = use(paramsPromise);
//   const { token } = params;

//   const [isVerified, setIsVerified] = useState(null); 
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const verify = async () => {
//       try {
//         const { data: verificationResponse } = await axios.post('/api/auth/verify-email', { token });
//         setIsVerified(verificationResponse.success);
//       } catch (error) {
//         setIsVerified(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verify();
//   }, [token]);

//   return (
//     <div className="relative min-h-screen w-full flex items-center justify-center">
//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/assets/images/bg-image.png" // same background as other pages
//           alt="Background"
//           fill
//           priority
//           className="object-cover"
//         />
//       </div>

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-black/40 -z-10"></div>

//       {/* Foreground content */}
//       <div className="relative z-10 flex items-center justify-center w-full">
//         <Card className="w-[400px] bg-white/90 backdrop-blur-md shadow-xl">
//           <CardContent>
//             {/* Optional Logo */}
//             <div className="flex justify-center mb-5">
//               <Image
//                 src={Logo.src}
//                 width={Logo.width}
//                 height={Logo.height}
//                 alt="Logo"
//                 className="max-w-[150px]"
//               />
//             </div>

//             {loading ? (
//               <p className="text-center text-lg">Verifying your email...</p>
//             ) : isVerified ? (
//               <div className="text-center">
//                 <div className="flex justify-center items-center">
//                   <Image
//                     src={VerifiedImg.src}
//                     height={VerifiedImg.height}
//                     width={VerifiedImg.width}
//                     alt="Verified Img"
//                     className="h-[100px] w-auto"
//                   />
//                 </div>
//                 <h1 className="text-2xl font-bold my-5 text-green-500">
//                   Email verification success!
//                 </h1>
//                 <Button asChild>
//                   <Link href={WEBSITE_HOME}>Continue Shopping</Link>
//                 </Button>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <div className="flex justify-center items-center">
//                   <Image
//                     src={VerificationFailedImg.src}
//                     height={VerificationFailedImg.height}
//                     width={VerificationFailedImg.width}
//                     alt="Verification Failed Img"
//                     className="h-[100px] w-auto"
//                   />
//                 </div>
//                 <h1 className="text-2xl font-bold my-5 text-red-500">
//                   Email verification Failed!
//                 </h1>
//                 <Button asChild>
//                   <Link href={WEBSITE_HOME}>Continue Shopping</Link>
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default EmailVerification;


"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import Image from "next/image";
import VerifiedImg from "@/public/assets/images/verified.gif";
import VerificationFailedImg from "@/public/assets/images/verification-failed.gif";
import { WEBSITE_HOME } from "@/routes/WebsiteRoute";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage({ params }) {
  const resolvedParams = use(params);
  const { token } = resolvedParams;
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Use decodeURIComponent in case token has special characters
        const decodedToken = decodeURIComponent(token);

        const { data } = await axios.post("/api/auth/verify-email", { token: decodedToken });

        setIsVerified(data.success);
        setMessage(data.message || "");
      } catch (error) {
        setIsVerified(false);

        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Something went wrong while verifying your email.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyEmail();
  }, [token]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-center text-lg">Verifying your email...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isVerified ? (
        <>
          <Image src={VerifiedImg} alt="Verified" className="h-[120px] w-auto" />
          <h1 className="text-2xl font-bold text-green-600 my-4">
            Email verification successful!
          </h1>
          {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
          <Button asChild>
            <Link href={WEBSITE_HOME}>Go to Home</Link>
          </Button>
        </>
      ) : (
        <>
          <Image src={VerificationFailedImg} alt="Failed" className="h-[120px] w-auto" />
          <h1 className="text-2xl font-bold text-red-600 my-4">
            Email verification failed!
          </h1>
          {message && <p className="text-center text-gray-700 mb-4">{message}</p>}
          <Button asChild>
            <Link href={WEBSITE_HOME}>Go to Home</Link>
          </Button>
        </>
      )}
    </div>
  );
}
