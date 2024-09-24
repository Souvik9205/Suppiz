"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const PublicRoutes = [
    "/",
    "/public",
    "/dashboard",
    "/help",
    "/auth/sign-up",
    "/auth/forgot-password",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (pathname) {
      const isPublicRoute =
        PublicRoutes.includes(pathname) || pathname.startsWith("/public");

      if (!token && !isPublicRoute) {
        router.push("/auth/login");
      } else if (token && !user?.pDetails && !isPublicRoute) {
        router.push("/auth/data");
      } else if (token && user?.pDetails && pathname.startsWith("/auth")) {
        router.push("/home");
      }
    }

    setLoading(false);
  }, [pathname, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
