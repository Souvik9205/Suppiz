import React from "react";
import Link from "next/link";

function page() {
  return (
    <div>
      <p>Home page!</p>
      <div className="pt-5 p-2">
        <p>Todo</p>
        <div>
          <ul className="list-disc">
            <li>
              Test Login :{" "}
              <Link href="/login" className="underline font-mono">
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
