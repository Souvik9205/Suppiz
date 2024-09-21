"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import KLogoutButton from "../(component)/LogOutButton";

function Page() {
  const user = useRecoilValue(userState);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div>
      {user ? <p>Welcome, {user.username}!</p> : <p>Loading user data...</p>}
      <Link href="/">Home</Link>

      <div className="m-5 bg-slate-200 p-2">
        <KLogoutButton />
      </div>
    </div>
  );
}

export default Page;
