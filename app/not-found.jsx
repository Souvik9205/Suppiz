import React from "react";
import Link from "next/link";

function notExists() {
  return (
    <div>
      404
      <p>
        Back to{" "}
        <span className="font-semibold underline underline-offset-2">
          <Link href="/">Home</Link>
        </span>
      </p>
    </div>
  );
}

export default notExists;
