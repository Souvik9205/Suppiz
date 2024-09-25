"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react";

function Auth() {
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, [setUser]);
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
    onSubmit: async (values) => {
      try {
        const res = await axios.post("http://localhost:8080/api/auth/login", {
          email: values.email,
          password: values.password,
        });
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          localStorage.setItem("token", res.data.token);

          const userResponse = await axios.get(
            `http://localhost:8080/api/user/${values.email}`,
            {
              headers: { Authorization: `Bearer ${res.data.token}` },
            }
          );
          const userData = userResponse.data.Data;
          setUser(userData);
          // localStorage.setItem("user", JSON.stringify(userData));
          router.push("/home");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 404) {
            toast.error("User with this email not found");
          } else if (err.response.status === 401) {
            toast.error("Invalid email or password");
          } else {
            toast.error("An unexpected error occurred");
          }
        } else {
          toast.error("Network error");
        }
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
            <h3 className="text-3xl font-semibold mb-3 font-poppins">Login</h3>
            <p className="text-base mb-2 font-inter text-neutral-600">
              Welcome Back! Please enter your details.
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

          <div className="w-full flex items-center justify-end pt-5">
            <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-neutral-500 text-neutral-800 font-inter">
              <Link href="/auth/forgot-password">Forgot Password?</Link>
            </p>
          </div>

          <div className="w-full flex flex-col my-4">
            <button
              type="submit"
              className="w-full text-white my-2 font-inter font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-[#333] transition-all duration-300"
            >
              Log In
            </button>
            <Link href="/auth/sign-up">
              <button
                type="button"
                className="w-full bg-white border-2 font-inter font-semibold border-black my-2 text-[#060606] rounded-md p-4 text-center flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
              >
                Register
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
            Do not have an account?{" "}
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
