"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function MainWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <main className={isAdmin ? "w-full min-h-screen" : "mt-[90px] w-full overflow-x-hidden"}>
      {children}
    </main>
  );
}
