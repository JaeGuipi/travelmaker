import { customFetch } from "@/utils/customFetch";
import API_URL from "@/constants/config";
import Image from "next/image";
import Link from "next/link";
import s from "./Header.module.scss";
import classNames from "classnames/bind";
import User from "@/components/Layout/Header/User";
import SearchBar from "@/components/SearchBar";

export const cx = classNames.bind(s);

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

const Header = async () => {
  let users = null;

  try {
    users = await getUsers();
  } catch (error) {
    console.error("유저 정보 요청 실패", error);
  }
  
  const response = await customFetch(`${API_URL}/my-notifications?size=4`)
  if (!response.ok) {
    console.error("내 알림 리스트 조회 실패")
  }
  const myNotifications = await response.json();

  return (
    <header className={s.header}>
      <section className={cx("headerContainer", "container")}>
        <Link href={"/"} className={s.logo}>
          <Image src={"/images/logo.png"} fill alt="TRAVEL MAKER" />
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
          <User users={users} initialNotifications={myNotifications} />
        )}
      </section>
    </header>
  );
};

export default Header;
