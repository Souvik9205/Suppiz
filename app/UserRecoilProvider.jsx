"use client";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { userState } from "@/atoms/user";
import { useEffect } from "react";

export const UserProviders = ({ children }) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userToken = token;

      axios
        .get(`http://localhost:8080/api/usertoken/${userToken}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.Data);
        })
        .catch((error) => {
          console.error(
            "Error fetching user:",
            error.response?.data?.message || error.message
          );
        });
    }
  }, []);

  return <>{children}</>;
};
