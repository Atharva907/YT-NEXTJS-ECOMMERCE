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



'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerifiedImg from '@/public/assets/images/verified.gif';
import VerificationFailedImg from '@/public/assets/images/verification-failed.gif';
import Logo from '@/public/assets/images/GameArenaLogo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';
import { useParams, useRouter } from 'next/navigation';

const EmailVerification = () => {
  const params = useParams();
  const { token } = params; // get token from dynamic route
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        // Ensure token is URL-safe
        const { data: verificationResponse } = await axios.post(
          '/api/auth/verify-email',
          { token: decodeURIComponent(token) }
        );
        setIsVerified(verificationResponse.success);

        // Optional: auto-redirect to homepage after 3 seconds if verified
        if (verificationResponse.success) {
          setTimeout(() => {
            router.push(WEBSITE_HOME);
          }, 3000);
        }
      } catch (error) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/bg-image.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex items-center justify-center w-full">
        <Card className="w-[400px] bg-white/90 backdrop-blur-md shadow-xl">
          <CardContent>
            {/* Logo */}
            <div className="flex justify-center mb-5">
              <Image
                src={Logo.src}
                width={Logo.width}
                height={Logo.height}
                alt="Logo"
                className="max-w-[150px]"
              />
            </div>

            {loading ? (
              <p className="text-center text-lg">Verifying your email...</p>
            ) : isVerified ? (
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <Image
                    src={VerifiedImg.src}
                    height={VerifiedImg.height}
                    width={VerifiedImg.width}
                    alt="Verified Img"
                    className="h-[100px] w-auto"
                  />
                </div>
                <h1 className="text-2xl font-bold my-5 text-green-500">
                  Email verification success!
                </h1>
                <p className="text-gray-700 mb-3">
                  Redirecting to homepage in 3 seconds...
                </p>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex justify-center items-center">
                  <Image
                    src={VerificationFailedImg.src}
                    height={VerificationFailedImg.height}
                    width={VerificationFailedImg.width}
                    alt="Verification Failed Img"
                    className="h-[100px] w-auto"
                  />
                </div>
                <h1 className="text-2xl font-bold my-5 text-red-500">
                  Email verification failed!
                </h1>
                <p className="text-gray-700 mb-3">
                  The verification link may have expired or is invalid.
                </p>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
