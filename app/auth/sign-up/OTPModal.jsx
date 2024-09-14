import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/router";

const OTPModal = ({ isOpen, onClose, onSuccess, onError }) => {
  const [value, setValue] = useState("");

  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(8, "OTP must be exactly 8 digits")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.otp === "12345678") {
        onSuccess("OTP verified successfully!");
        resetForm();
        onClose();
        const router = useRouter();
        router.push("/home");
      } else {
        onError("Invalid OTP. Please try again.");
        setValue("");
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <form onSubmit={otpForm.handleSubmit}>
          <div className="pt-10 pb-8">
            <InputOTP
              maxLength={8}
              value={value}
              onChange={(value) => {
                setValue(value);
                otpForm.setFieldValue("otp", value);
              }}
            >
              {/* OTP Slots */}
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

          {otpForm.touched.otp && otpForm.errors.otp ? (
            <div className="text-red-500 text-sm">{otpForm.errors.otp}</div>
          ) : null}

          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;
