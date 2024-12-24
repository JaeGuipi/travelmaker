import localFont from "next/font/local";
import "@/styles/globals.scss";
import { Toaster } from "react-hot-toast";
import ClientPathname from "@/app/ClientPathname";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import BottomBar from "@/components/BottomBar/BottomBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커",
  openGraph: {
    title: "travel maker",
    description: "트레블 메이커에서 즐기는 다양한 체험",
    images: [
      {
        url: "https://travelmaker-ten.vercel.app/opengraph-image.png",
        width: 800,
        height: 400,
        alt: "Travel Maker Open Graph Image",
      },
    ],
    url: "https://travelmaker-ten.vercel.app",
    siteName: "travel maker",
    locale: "ko_KR",
    type: "website",
  },
};

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
