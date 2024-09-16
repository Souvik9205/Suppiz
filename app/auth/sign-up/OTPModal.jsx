import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const OTPModal = ({ isOpen, onClose, onSuccess, onError, email, pass }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const payload = {
          email: email,
          otp: values.otp,
          password: pass,
        };
        console.log("Payload being sent to backend:", payload);
        const response = await axios.post(
          "http://localhost:8080/api/auth/verify-otp",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          onSuccess("OTP verified successfully!");
          resetForm();
          onClose();

          router.push("/auth/data");
        }
      } catch (error) {
        console.error("Error message:", error.message); // Log the error message
        console.error("Error request:", error.request); // Log the error request (for netwo
        if (error.response) {
          onError(
            error.response?.data?.message || "Invalid OTP. Please try again."
          );
        } else if (error.request) {
          onError("No response from server. Please check your network.");
        } else {
          onError("An unknown error occurred.");
        }
        setValue("");
      } finally {
        setLoading(false);
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
              maxLength={6}
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
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
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
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                "Submit OTP"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPModal;
