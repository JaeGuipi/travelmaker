import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return <div>로그인이 필요한 페이지 입니다.</div>;
  }

  const response = await customFetch(`${API_URL}/my-activities`, {
    cache: "no-cache",
  });

  const data = await response.json();
  return <div></div>;
};

export default Page;
