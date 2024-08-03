import React from "react";
import Link from "next/link";

function notFound() {
  return (
    <div>
      Page not exists !!{" "}
      <Link href="/" className="underline font-mono">
        Here
      </Link>
    </div>
  );
}

export default notFound;
