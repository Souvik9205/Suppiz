"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Auth() {
  const [isChecked, setIsChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (isChecked) {
        console.log(values);
      } else {
        toast.error("Please tick the checkbox before logging in.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
  });

  return (
    <div className="flex overflow-hidden items-start">
      <ToastContainer />
      <div className="relative h-[100vh] w-7/12 bg-slate-200">
        {/* <Image
          src="/images/login.jpg"
          alt="Login"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        /> */}
      </div>

      <div className="h-[100vh] w-5/12 flex flex-col p-20 justify-between font-sans">
        <h1 className="text-7xl text-black/90 mb-5 font-playpan font-extrabold">
          Suppiz
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col max-w-[75vh]"
        >
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-3 font-poppins">
              Sign Up
            </h3>
            <p className="text-base mb-2 font-inter text-neutral-600">
              Hi, let's get into the world of suppiz!
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-inter ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
            <input
              type="password"
              name="password"
              placeholder="Password..."
              className={`w-full text-black py-1 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-inter ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="w-full flex items-center justify-start pt-5">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="text-sm px-2 font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-neutral-500 text-neutral-800 font-inter">
              <Link href="/about/terms">Read Terms & Conditions!</Link>
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              type="submit"
              className="w-full text-white my-2 font-inter font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-[#333] transition-all duration-300"
            >
              Register
            </button>
            <Link href="/auth/login">
              <button
                type="button"
                className="w-full bg-white border-2 font-inter font-semibold border-black my-2 text-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
              >
                Login
              </button>
            </Link>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-white p-2">or</p>
          </div>

          <div className="w-full flex justify-center gap-5 items-center py-4">
            <Button variant="outline" size="licon">
              <FcGoogle size={50} />
            </Button>
            <Button variant="outline" size="licon">
              <FaGithub size={50} />
            </Button>
          </div>
        </form>

        <div className="w-full flex justify-center items-center max-w-[75vh]">
          <p className="text-sm font-normal text-[#060606] font-inter">
            Already have an account?{" "}
            <span className="font-semibold underline underline-offset-2 hover:text-gray-700">
              <Link href="/auth/login">Log In here!</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
