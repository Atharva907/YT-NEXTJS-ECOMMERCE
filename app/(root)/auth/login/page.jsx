"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import Logo from "@/public/assets/images/GameArenaLogo.png";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import { z } from "zod";
// Eye icons
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OTPVerification from "@/components/Application/OTPVerification";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const LoginPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams()
  const router = useRouter()

  // ---------------------
  // Component state
  // ---------------------
  const [loading, setLoading] = useState(false); // login button
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false); // OTP button
  const [showPassword, setShowPassword] = useState(false); // toggle password visibility
  const [otpEmail, setOtpEmail] = useState(); // email for OTP verification

  // ---------------------
  // Validation schema using Zod
  // ---------------------
  const formSchema = zSchema
    .pick({ email: true }) // validate email
    .extend({
      password: z.string().min(3, "Password field is required."),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ---------------------
  // Handle login form submission
  // ---------------------
  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post("/api/auth/login", values);

      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }

      // If OTP is required, show OTP verification component
      setOtpEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------
  // Handle OTP verification
  // ---------------------
  const handleOtpVerification = async (values) => {
    try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post("/api/auth/verify-otp", values);

      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }

      // OTP successful, clear state and dispatch login
      setOtpEmail("");
      showToast("success", otpResponse.message);
      dispatch(login(otpResponse.data));

      if (searchParams.has('callback')) {
        router.push(searchParams.get('callback'))
      } else {
        otpResponse.data.role === 'admin' ? router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD)
      }

    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-[400px]">
        <CardContent>
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={Logo.src}
              width={Logo.width}
              height={Logo.height}
              alt="logo"
              className="max-w-[150px]"
            />
          </div>

          {/* Login Form or OTP Verification */}
          {!otpEmail ? (
            <>
              {/* Login Form */}
              <div className="text-center">
                <h1 className="text-3xl font-bold">Login Into Account</h1>
                <p>Login into your account by filling out the form below.</p>
              </div>

              <div className="mt-5">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleLoginSubmit)}>
                    {/* Email */}
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="********"
                                  {...field}
                                />
                              </FormControl>
                              <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                              </button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="mb-3">
                      <ButtonLoading
                        loading={loading}
                        type="submit"
                        text="Login"
                        className="w-full cursor-pointer"
                      />
                    </div>

                    {/* Links */}
                    <div className="text-center">
                      <div className="flex justify-center gap-1 items-center">
                        <p>Don't have account?</p>
                        <Link href={WEBSITE_REGISTER} className="text-primary underline">
                          Create account!
                        </Link>
                      </div>
                      <div>
                        <Link href={WEBSITE_RESETPASSWORD} className="text-primary underline">
                          Forget password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            // OTP Verification Component
            <OTPVerification
              email={otpEmail}
              onSubmit={handleOtpVerification}
              loading={otpVerificationLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
