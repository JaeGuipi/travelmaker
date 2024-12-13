import { ReactNode } from "react";
import ClientPathname from "@/app/ClientPathname";
import UserTab from "@/components/UserTab/UserTab";
import classNames from "classnames";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section className={classNames("layoutContainer", "container")}>
      <ClientPathname hideRoutes={["/my-info"]}>
        <UserTab />
      </ClientPathname>
      {children}
    </section>
  );
}
