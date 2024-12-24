import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import MyPageForm from "@/components/Auth/MyPageForm/MyPageForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 내 정보",
};

const getUsers = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
    return null;
  }
};

const MyPage = async () => {
  const users = await getUsers();

  return <MyPageForm users={users} />;
};

export default MyPage;
