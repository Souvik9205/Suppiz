"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState("");
  const router = useRouter();

  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(8, "OTP must be exactly 8 digits")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (values.otp === "12345678") {
        toast.success("OTP verified successfully!");
        setStep(2);
      } else {
        toast.error("Invalid OTP. Please try again.");
        setValue("");
      }
    },
  });

  const passwordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be 6 characters or more")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      toast.success("Password changed successfully!");
      router.push("/auth/login");
    },
  });

  return (
    <div className="flex items-start overflow-hidden h-[100vh]">
      <div className="relative h-[100vh] w-7/12 bg-slate-200">
        {/* image */}
      </div>

      <div className="h-[100vh] w-5/12 flex flex-col p-20 gap-20 font-sans">
        <div className="flex flex-col gap-5">
          <h1 className="text-7xl text-black/90 mb-5 font-extrabold font-playpan">
            Suppiz
          </h1>
          <p className="text-3xl font-semibold mb-3 font-poppins">
            Forgot Password
          </p>
        </div>

        <form
          onSubmit={
            step === 1 ? otpForm.handleSubmit : passwordForm.handleSubmit
          }
          className="w-full flex flex-col max-w-[75vh]"
        >
          {step === 1 && (
            <>
              <h3 className="text-2xl font-semibold mb-3 font-poppins">
                Enter OTP
              </h3>
              <p className="text-base mb-2 text-neutral-600 font-inter">
                We've sent an 8-digit OTP to your email.
              </p>

              <div className="pt-10 pb-8">
                <InputOTP
                  maxLength={8}
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    otpForm.setFieldValue("otp", value);
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={5} />
                    <InputOTPSlot index={6} />
                    <InputOTPSlot index={7} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {otpForm.touched.otp && otpForm.errors.otp && (
                <div className="text-red-500 text-sm">{otpForm.errors.otp}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#060606] text-white rounded-md p-4 my-4 hover:bg-gray-900"
              >
                Verify OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-2xl font-semibold mb-3">Reset Password</h3>
              <input
                type="password"
                name="password"
                placeholder="New Password..."
                className={`w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                  passwordForm.touched.password && passwordForm.errors.password
                    ? "border-red-500"
                    : ""
                }`}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                value={passwordForm.values.password}
              />
              {passwordForm.touched.password &&
                passwordForm.errors.password && (
                  <div className="text-red-500 text-sm">
                    {passwordForm.errors.password}
                  </div>
                )}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password..."
                className={`w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
                  passwordForm.touched.confirmPassword &&
                  passwordForm.errors.confirmPassword
                    ? "border-red-500"
                    : ""
                }`}
                onChange={passwordForm.handleChange}
                onBlur={passwordForm.handleBlur}
                value={passwordForm.values.confirmPassword}
              />
              {passwordForm.touched.confirmPassword &&
                passwordForm.errors.confirmPassword && (
                  <div className="text-red-500 text-sm">
                    {passwordForm.errors.confirmPassword}
                  </div>
                )}

              <Button
                type="submit"
                className="w-full bg-[#060606] text-white rounded-md p-4 my-4 hover:bg-gray-900"
              >
                Reset Password
              </Button>
            </>
          )}
        </form>

        <div className="w-full flex justify-center items-center max-w-[75vh]">
          <p className="text-sm text-[#060606]">
            Remember your password?{" "}
            <span className="font-semibold underline">
              <Link href="/auth/login">Login here</Link>
            </span>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
