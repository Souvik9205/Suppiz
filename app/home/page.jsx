"use client";
import React from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";

function page() {
  const user = useRecoilValue(userState);
  return (
    <div>
      {user ? <p>Welcome, {user.email}!</p> : <p>Loading user data...</p>}
      <Link href="/">Home</Link>
    </div>
  );
}

export default page;
