"use client";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return router.push("/login");
  }

  return <div>예약 내역 페이지 입니다....</div>;
};

export default Page;
