import { customFetch } from "@/utils/customFetch";
import API_URL from "@/constants/config";
import UserTabList from "@/components/UserTab/UserTabList";
import FileInput from "@/components/Input/FileInput";
import s from "./UserTab.module.scss";

const getUsers = async () => {
  try {
    const response = await customFetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["users"] },
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

const UserTab = async () => {
  const users = await getUsers();

  return (
    <section className={s.userTabContainer}>
      <FileInput users={users} readOnly />
      <UserTabList />
    </section>
  );
};

export default UserTab;
