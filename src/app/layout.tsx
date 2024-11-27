import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/components/Layout/Header";
import { Providers as QueryClientProvider } from "./providers";
import { Toaster } from "react-hot-toast";

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
        <QueryClientProvider>
          <div id="modal-root"></div>
          <ToastProvider />
          <Header />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
