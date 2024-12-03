"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface ClientPathnameProps {
  children: React.ReactNode;
  hideRoutes: string[];
}

const ClientPathname = ({ children, hideRoutes }: ClientPathnameProps) => {
  const pathname = usePathname();
  if (hideRoutes.includes(pathname)) return null;

  if (hideRoutes) return <>{children}</>;
};

export default ClientPathname;
