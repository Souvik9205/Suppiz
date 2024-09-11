"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Home() {
  const [value, setValue] = React.useState("");
  const notify = () => toast("Wow so easy!");
  const OTP = () => toast(value);
  return (
    <div>
      <h1 className="text-blue-600">Hello world!</h1>

      <p>Let's Login-</p>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/login">LogIn</Link>
      </button>

      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
        <Button variant="outline">Outline</Button>
      </div>

      <div className="p-4">
        <InputOTP
          maxLength={8}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
        <button onClick={OTP} className="bg-red-400 p-2 rounded-lg m-2">
          Get OTP
        </button>
      </div>
    </div>
  );
}
