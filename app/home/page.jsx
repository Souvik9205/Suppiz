"use client";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import KLogoutButton from "../(component)/LogOutButton";
import AddProjectButton from "./(components)/AddProject";
import UserProject from "./(components)/UserProject";
import AllProject from "./(components)/AllProject";

function Page() {
  const user = useRecoilValue(userState);

  return (
    <div className="w-full ">
      <div className="flex gap-5 p-2 justify-around w-full items-center">
        <div>
          {user ? (
            <p>Welcome, {user.username}!</p>
          ) : (
            <p>Loading user data...</p>
          )}
          <Link href="/" className="p-2 text-blue-400 font-semibold underline">
            Home
          </Link>
        </div>
        <div className="m-5 p-2">
          <KLogoutButton />
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-center items-center">
          <AddProjectButton />
        </div>
        <div className="bg-slate-200 w-full min-h-[30vh] m-2 p-5">
          <UserProject />
        </div>
      </div>
      <div className="w-full min-h-[30vh] m-2 p-5">
        <AllProject />
      </div>
    </div>
  );
}

export default Page;
