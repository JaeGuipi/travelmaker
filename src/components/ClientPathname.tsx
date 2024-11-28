"use client";

import { usePathname } from "next/navigation";

const ClientOnlyPathname = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/login", "/signup"];
  if (hideHeaderRoutes.includes(pathname)) return null;

  if (hideHeaderRoutes) return <>{children}</>;
};

export default ClientOnlyPathname;
