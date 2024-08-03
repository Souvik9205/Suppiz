"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function page() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      <div>page: {number}</div>
      <Button onClick={() => setNumber(number + 1)}>Plus</Button>
    </div>
  );
}

export default page;
