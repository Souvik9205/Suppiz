import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProjectButton = ({ setNewProjectAdded }) => {
  const backUrl = process.env.BACKEND_URL;
  const user = useRecoilValue(userState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOTPForm, setIsOTPForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const addProject = async () => {
    if (!isFormOpen) {
      setIsFormOpen(true);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.post(
        `${backUrl}/api/project/request/${user.email}`,
        { projectName, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setIsFormOpen(false);
        setLoading(false);
        setIsOTPForm(true);
        toast.success(
          "Project request submitted successfully! Please verify OTP."
        );
      }
    } catch (error) {
      console.error("Error adding project:", error);
      setLoading(false);
      toast.error("Failed to submit project request. Please try again.");
    }
  };

  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await axios.post(
          `${backUrl}/api/project/verify/${user.email}`,
          {
            projectName,
            description,
            tier: "free",
            status: "working",
            otp: values.otp,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 201) {
          setIsOTPForm(false);
          setNewProjectAdded(true);
          toast.success("OTP verified successfully! Project added.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        toast.error("Invalid OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center flex-col">
      <ToastContainer />
      {!isFormOpen && !isOTPForm && (
        <>
          <FiPlus
            onClick={addProject}
            className="cursor-pointer m-5 h-[45px] w-[45px] shadow-md shadow-black hover:shadow-sm bg-neutral-200 hover:bg-neutral-400 rounded-md"
          />
          <p className="text-gray-800 font-poppins text-lg font-semibold">
            Add Project
          </p>
        </>
      )}

      {isFormOpen && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="m-2 p-2 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="m-2 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={addProject}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {loading ? <FaSpinner className="animate-spin mr-2" /> : "Submit"}
          </button>
        </div>
      )}

      {isOTPForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <form onSubmit={otpForm.handleSubmit}>
              <div className="pt-10 pb-8">
                <InputOTP
                  maxLength={6}
                  value={otpForm.values.otp}
                  onChange={(value) => otpForm.setFieldValue("otp", value)}
                >
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
                  onClick={() => setIsOTPForm(false)}
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
      )}
    </div>
  );
};

export default AddProjectButton;
