"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import { FaSpinner } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";

const MultiStepForm = () => {
  const user = useRecoilValue(userState);
  const [loading, setLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [step, setStep] = useState(1);
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(null);

  const formikStep1 = useFormik({
    initialValues: {
      name: "",
      dob: "",
      country: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      dob: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        console.log("log1");
        console.log("Email:", user.email);
        console.dir("User:", user);
        const response = await axios.post(
          `http://localhost:8080/api/auth/personaldata/${user.email}`,
          {
            username: `${values.name}`,
            dob: `${values.dob}`,
            country: `${values.country}`,
            city: `${values.city}`,
          }
        );
        console.log("log2");
        console.log(response.message);
        console.log("log3");
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
          setStep(2);
        }
      } catch (error) {
        console.log("log4");
        console.log("Error:", error);
        console.log("Error Response:", error.response);

        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User with this email not found");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("Network error");
        }
      }
    },
  });
  const formikStep2 = useFormik({
    initialValues: {
      occupation: "",
      status: "developer",
      experience: "",
    },
    validationSchema: Yup.object({
      occupation: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      experience: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8080/api/auth/carrierdata/${user.email}`,
          {
            occupation: `${values.occupation}`,
            status: `${values.status}`,
            experience: `${values.experience}`,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            toast.error("User with this email not found");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("Network error");
        }
      } finally {
        router.push("/home");
      }
    },
  });

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    formikStep1.setFieldValue("dob", date);
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex overflow-hidden items-start">
      <ToastContainer />
      <div className="relative h-[100vh] w-7/12 bg-slate-200">{/*image*/}</div>

      <div className="h-[100vh] w-5/12 p-20 font-sans">
        <h1 className="text-7xl text-black/90 mb-5 font-playpan font-extrabold">
          Suppiz
        </h1>
        <div className="w-full h-3/4 flex flex-col justify-center">
          {step === 1 && (
            <form
              onSubmit={formikStep1.handleSubmit}
              className="w-full max-w-md space-y-4"
            >
              {/* Name */}
              <div>
                <label htmlFor="name" className="block mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formikStep1.handleChange}
                  value={formikStep1.values.name}
                  placeholder="Enter your name"
                  className={`w-full ${
                    formikStep1.touched.name && formikStep1.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formikStep1.touched.name && formikStep1.errors.name && (
                  <div className="text-red-500">{formikStep1.errors.name}</div>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dob" className="block mb-1">
                  Date of Birth
                </label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        `${
                          formikStep1.touched.dob && formikStep1.errors.dob
                            ? "border-red-500"
                            : ""
                        }`
                      )}
                    >
                      {selectedDate
                        ? format(selectedDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {formikStep1.touched.dob && formikStep1.errors.dob && (
                  <div className="text-red-500">{formikStep1.errors.dob}</div>
                )}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block mb-1">
                  Country
                </label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  onChange={formikStep1.handleChange}
                  value={formikStep1.values.country}
                  placeholder="Enter your country"
                  className={`w-full ${
                    formikStep1.touched.country && formikStep1.errors.country
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formikStep1.touched.country && formikStep1.errors.country && (
                  <div className="text-red-500">
                    {formikStep1.errors.country}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block mb-1">
                  City
                </label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  onChange={formikStep1.handleChange}
                  value={formikStep1.values.city}
                  placeholder="Enter your city"
                  className={`w-full ${
                    formikStep1.touched.city && formikStep1.errors.city
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formikStep1.touched.city && formikStep1.errors.city && (
                  <div className="text-red-500">{formikStep1.errors.city}</div>
                )}
              </div>

              <Button type="submit" className="w-full mt-4">
                {loading ? <FaSpinner className="animate-spin mr-2" /> : "Next"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={formikStep2.handleSubmit}
              className="w-full max-w-md space-y-4"
            >
              {/* Occupation */}
              <div>
                <label htmlFor="occupation" className="block mb-1">
                  Occupation
                </label>
                <Select
                  id="occupation"
                  name="occupation"
                  onValueChange={(value) =>
                    formikStep2.setFieldValue("occupation", value)
                  }
                  value={formikStep2.values.occupation}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select your profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Profession</SelectLabel>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="tester">Tester</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formikStep2.touched.occupation &&
                  formikStep2.errors.occupation && (
                    <div className="text-red-500">
                      {formikStep2.errors.occupation}
                    </div>
                  )}
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1">Status</label>
                <RadioGroup
                  defaultValue="developer"
                  id="status"
                  name="status"
                  value={formikStep2.values.status}
                  onValueChange={(value) =>
                    formikStep2.setFieldValue("status", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="developer" id="r1" />
                    <label htmlFor="r1">Developer</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="r2" />
                    <label htmlFor="r2">Client</label>
                  </div>
                </RadioGroup>
                {formikStep2.touched.status && formikStep2.errors.status && (
                  <div className="text-red-500">
                    {formikStep2.errors.status}
                  </div>
                )}
              </div>

              {/* Years of Experience */}
              <div>
                <label htmlFor="experience" className="block mb-1">
                  Years of Experience
                </label>
                <Select
                  id="experience"
                  name="experience"
                  onValueChange={(value) =>
                    formikStep2.setFieldValue("experience", value)
                  }
                  value={formikStep2.values.experience}
                >
                  {" "}
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select your experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Experience</SelectLabel>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-8">6-8 years</SelectItem>
                      <SelectItem value="9+">9+ years</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {formikStep2.touched.experience &&
                  formikStep2.errors.experience && (
                    <div className="text-red-500">
                      {formikStep2.errors.experience}
                    </div>
                  )}
              </div>

              <Button type="submit" className="w-full mt-4">
                {loading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
