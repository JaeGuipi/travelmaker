import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import UserTabList from "@/components/Layout/UserTab/UserTabList";
import FileInput from "@/components/Auth/MyPageForm/components/FileInput";
import s from "./UserTab.module.scss";

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
