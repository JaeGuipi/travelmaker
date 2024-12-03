import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import MyPageForm from "@/components/Auth/MyPageForm";

const getUsers = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    return null;
  }
};

const MyPage = async () => {
  const users = await getUsers();

  return <MyPageForm users={users} />;
};

export default MyPage;
