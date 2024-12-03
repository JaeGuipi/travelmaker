import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import UserTabList from "@/components/UserTab/UserTabList";
import FileInput from "@/components/Input/FileInput";
import s from "./UserTab.module.scss";

const getUsers = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    next: { tags: ["users"] },
    cache: "no-store",
  });

  return response.json();
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
