import { ReactNode } from "react";
import ClientPathname from "@/app/ClientPathname";
import UserTab from "@/components/UserTab/UserTab";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <ClientPathname hideRoutes={["/my-info"]}>
        <UserTab />
      </ClientPathname>
      {children}
    </>
  );
}
