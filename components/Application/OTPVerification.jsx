'use client'

import { zSchema } from '@/lib/zodSchema'                        // Zod schema for validation
import { zodResolver } from '@hookform/resolvers/zod'           // Zod resolver for react-hook-form
import React, { useState, useEffect } from 'react'
import { ButtonLoading } from './ButtonLoading'                 // Custom button with loading spinner
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"                                  // Custom UI form components
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"                             // OTP input components
import { showToast } from '@/lib/showToast'                     // Toast notifications
import axios from 'axios'                                       // HTTP requests

// ---------------------
// OTP Verification Component
// ---------------------
const OTPVerification = ({ email, onSubmit, loading }) => {
  const [isResendingOtp, setIsResendingOtp] = useState(false)  // Track resend OTP loading

  // Pick only OTP and email validation from Zod schema
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  })

  // Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),  // Validate form using Zod
    defaultValues: {
      otp: '',
      email: '',                        // Will set dynamically via useEffect
    },
  })

  // Set email dynamically when prop is available
  useEffect(() => {
    if (email) {
      form.setValue('email', email)
    }
  }, [email, form])

  // Regex for 6-digit numeric OTP
  const REGEXP_ONLY_DIGITS_AND_CHARS = /^[0-9]{6}$/

  // ---------------------
  // Handle OTP Verification
  // ---------------------
  const handleOtpVerification = async (values) => {
    // Call parent onSubmit function with form values
    onSubmit(values)
  }

  // ---------------------
  // Handle Resend OTP
  // ---------------------
  const resendOTP = async () => {
    if (!email) {
      showToast("error", "Email not available, cannot resend OTP")
      return
    }

    try {
      setIsResendingOtp(true)

      // Call API to resend OTP
      const { data: resendOtpResponse } = await axios.post('/api/auth/resend-otp', {
        email,  // ✅ safe prop
      })

      if (!resendOtpResponse.success) {
        throw new Error(resendOtpResponse.message)
      }

      showToast('success', resendOtpResponse.message)
    } catch (error) {
      showToast('error', error.message)
    } finally {
      setIsResendingOtp(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOtpVerification)}>
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 mt-3">
              Please complete verification
            </h1>
            <p className="text-md">
              We have sent a One-time Password (OTP) to your registered email
              address. The OTP is valid for 10 minutes only.
            </p>
          </div>

          {/* OTP Input */}
          <div className="mb-5 mt-5 flex justify-center">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold block text-center">
                    One-time Password (OTP)
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}         // Bind value to form
                      onChange={field.onChange}   // Bind onChange to form
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot
                            key={i}
                            className="text-xl size-10"
                            index={i}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />                 {/* Shows validation errors */}
                </FormItem>
              )}
            />
          </div>

          {/* Submit + Resend */}
          <div className="mb-2">
            <ButtonLoading
              loading={loading}
              type="submit"
              text="Verify"
              className="w-full cursor-pointer"
            />

            <div className="text-center mt-5">
              {isResendingOtp ? (
                <span className="text-md">Resending...</span>
              ) : (
                <button
                  onClick={resendOTP}
                  type="button"
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default OTPVerification
