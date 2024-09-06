"use client";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  return (
    <div>
      <h1 className="text-blue-600">Hello world!</h1>

      <p>Let's Login-</p>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/login">LogIn</Link>
      </button>

      <div>
        <button
          onClick={() => {
            toast({
              description: "toast",
            });
          }}
        >
          show toast
        </button>
      </div>
    </div>
  );
}
