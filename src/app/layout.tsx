import localFont from "next/font/local";
import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";
import ClientPathname from "@/app/ClientPathname";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import BottomBar from "@/components/BottomBar/BottomBar";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const ToastProvider = () => {
  return <Toaster />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <div id="modal-root"></div>
        <ToastProvider />
        <ClientPathname hideRoutes={["/login", "/signup"]}>
          <Header />
        </ClientPathname>
        {children}
        <ClientPathname hideRoutes={["/login", "/signup"]}>
          <Footer />
          <BottomBar />
        </ClientPathname>
      </body>
    </html>
  );
}
