import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import Image from "next/image";
import Link from "next/link";
import s from "./Header.module.scss";
import classNames from "classnames/bind";
import User from "@/components/Layout/Header/User";
import SearchBar from "@/components/Layout/Header/SearchBar";
import Alarm from "@/components/Alarm/Alarm";
import { customFetch } from "@/utils/customFetch";

export const cx = classNames.bind(s);

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

const getNotifications = async () => {
  const response = await customFetch(`${API_URL}/my-notifications?size=4`);
  if (!response.ok) {
    console.error("내 알림 리스트 조회 실패");
  }
  return response.json();
};

const Header = async () => {
  const users = await getUsers();
  const myNotifications = users ? await getNotifications() : { notifications: [] };

  return (
    <header className={s.header}>
      <section className={cx("headerContainer", "container")}>
        <Link href={"/"} className={s.logo}>
          <Image src={"/images/logo.svg"} fill alt="TRAVEL MAKER" />
        </Link>
        <div className={s.search}>
          <SearchBar />
        </div>
        {!users ? (
          <div className={s.loginOff}>
            <Link href={"/login"}>로그인</Link>
            <Link href={"/signup"}>회원가입</Link>
          </div>
        ) : (
          <>
            <Alarm initialNotifications={myNotifications} type="header" />
            <User users={users} />
          </>
        )}
      </section>
    </header>
  );
};

export default Header;
