"use client";
import React from "react";
import Link from "next/link";
import KLogoutButton from "./(component)/LogOutButton";

const Home = () => {
  return (
    <div>
      <h1 className="text-blue-600">Hello world!</h1>

      <p> Login-</p>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/login">LogIn</Link>
      </button>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/auth/data">Add data</Link>
      </button>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/home">Home</Link>
      </button>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/dashboard">dashboard</Link>
      </button>
      <button className="p-2 m-5 bg-blue-300 text-lg rounded-md">
        <Link href="/test">test</Link>
      </button>

      <KLogoutButton />
    </div>
  );
};

// Set the public flag to true so AuthProvider can skip auth checks
Home.getInitialProps = () => ({
  isPublic: true,
});

export default Home;
