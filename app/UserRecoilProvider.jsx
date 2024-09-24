"use client";
import { useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { userState } from "@/atoms/user";
import { useEffect } from "react";

export const UserProviders = ({ children }) => {
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (!user) {
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
    }
  }, [user, setUser]);

  return <>{children}</>;
};
