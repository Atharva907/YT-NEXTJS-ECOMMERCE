'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import VerifiedImg from '@/public/assets/images/verified.gif';
import VerificationFailedImg from '@/public/assets/images/verification-failed.gif';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';

const EmailVerification = ({ params: paramsPromise }) => {
  // Unwrap the promise with `use()`
  const params = use(paramsPromise);
  const { token } = params;

  const [isVerified, setIsVerified] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post('/api/auth/verify-email', { token });
        setIsVerified(verificationResponse.success);
      } catch (error) {
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  if (loading) {
    return (
      <Card className="w-[400px] mx-auto mt-5">
        <CardContent>
          <p className="text-center text-lg">Verifying your email...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px] mx-auto mt-5">
      <CardContent>
        {isVerified ? (
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
              Email verification Failed!
            </h1>
            <Button asChild>
              <Link href={WEBSITE_HOME}>Continue Shopping</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailVerification;
