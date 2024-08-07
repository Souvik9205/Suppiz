"use client";
import React from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

function page() {
  const { toast } = useToast();

  function handleToast() {
    console.log("log1");
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    });
    console.log("log2");
  }
  return (
    <div>
      <p>Home page!</p>
      <div className="pt-5 p-2">
        <p className="font-semibold text-2xl pb-2 underline font-mono">Todo</p>
        <div>
          <ul className="list-disc">
            <li>
              Test Login :(done){" "}
              <Link href="/login" className="underline font-mono">
                Here!
              </Link>
            </li>

            <li>
              Email Login :{" "}
              <Link href="/register" className="underline font-mono">
                Here!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default page;
