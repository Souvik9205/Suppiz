"use client";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

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
        alert("Please tick the checkbox before logging in");
        // toast({
        //   title: "Suppiz Support",
        //   description: "Please tick the checkbox before logging in",
        // });
      }
    },
  });

  return (
    <div className="flex overflow-hidden items-start">
      <div className="relative h-[100vh] w-7/12">
        <Image
          src="/images/login.jpg"
          alt="Login"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>

      <div className="h-[100vh] w-5/12 flex flex-col p-20 justify-between font-sans">
        <h1 className="text-6xl text-[#060606]/80 font-bold mb-10">Suppiz</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="w-full flex flex-col max-w-[75vh]"
        >
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-4">Login</h3>
            <p className="text-base mb-2">
              Welcome Back! Please enter your details.
            </p>
          </div>

          <div className="w-full flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className={`w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
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
              className={`w-full text-black py-1 my-2 bg-transparent border-b border-black outline-none focus:outline-none ${
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

          <div className="w-full flex items-center justify-between pt-8">
            <div className="w-full flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <p className="text-sm ">
                <Link href="/about/terms">Check Terms and Conditions!</Link>
              </p>
            </div>
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-gray-700">
              Forgot Password?
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              type="submit"
              className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-[#333] transition-all duration-300"
            >
              Log In
            </button>
            <button
              type="button"
              className="w-full bg-white border-2 font-semibold border-black my-2 text-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
            >
              <Link href="/auth/sign-up">Register</Link>
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black"></div>
            <p className="text-lg absolute text-black/80 bg-white p-2">or</p>
          </div>

          <div className="w-full flex justify-center gap-5 items-center py-4">
            <div className="p-4 m-4 border-2 border-black/60 rounded-xl cursor-pointer shadow-md shadow-neutral-300 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <FcGoogle size={50} />
            </div>
            <div className="p-4 m-4 border-2 border-black/60 rounded-xl cursor-pointer shadow-md shadow-neutral-300 hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <FaGithub size={50} />
            </div>
          </div>
        </form>

        <div className="w-full flex justify-center items-center max-w-[75vh]">
          <p className="text-sm font-normal text-[#060606]">
            Don't have an account?{" "}
            <span className="font-semibold underline underline-offset-2 hover:text-gray-700">
              <Link href="/auth/sign-up">Sign up here!</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
