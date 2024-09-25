"use client";
import Link from "next/link";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import KLogoutButton from "../(component)/LogOutButton";
import AddProjectButton from "./(components)/AddProject";
import UserProject from "./(components)/UserProject";
import AllProject from "./(components)/AllProject";
import { useEffect, useState } from "react";

function Page() {
  const user = useRecoilValue(userState);
  const [projects, setProjects] = useState([]);
  const [newProjectAdded, setNewProjectAdded] = useState(false);

  const fetchProjects = async () => {
    if (!user) return;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8080/api/project/all/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [user]);

  useEffect(() => {
    if (newProjectAdded) {
      fetchProjects();
      setNewProjectAdded(false);
    }
  }, [newProjectAdded]);

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
          <AddProjectButton setNewProjectAdded={setNewProjectAdded} />
        </div>
        <div className="bg-slate-200 w-full h-1/3 m-2 p-5">
          <UserProject projects={projects} />
        </div>
      </div>
      <div className="w-full h-auto m-2 p-5">
        <AllProject />
      </div>
    </div>
  );
}

export default Page;
