import ActivityForm from "@/components/Activity/ActivityForm";
import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";

const getUsers = async () => {
  try {
    const response = await customFetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["users"] },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("유저 정보 가져오기 실패:", error);
    return null;
  }
};

const RegisterActivity = async () => {
  const users = await getUsers();

  return <ActivityForm users={users} />;
};

export default RegisterActivity;
