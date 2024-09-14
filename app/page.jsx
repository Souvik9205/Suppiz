import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-blue-600">Hello world!</h1>

      <p>Let's Login-</p>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/login">LogIn</Link>
      </button>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/data">Add data</Link>
      </button>
    </div>
  );
}
