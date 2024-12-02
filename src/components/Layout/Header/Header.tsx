import { cookies } from "next/headers";
import API_URL from "@/constants/config";
import Image from "next/image";
import Link from "next/link";
import s from "./Header.module.scss";
import classNames from "classnames/bind";
import CustomInput from "@/components/Input/CustomInput";
import User from "@/components/Layout/Header/User";

export const cx = classNames.bind(s);

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

const Header = async () => {
  let users = null;

  try {
    users = await getUsers();
  } catch (error) {
    console.error("유저 정보 요청 실패", error);
  }

  return (
    <header className={cx("headerContainer", "container")}>
      <Link href={"/"} className={s.logo}>
        <Image src={"/images/logo.png"} fill alt="TRAVEL MAKER" />
      </Link>

      <Link href={"/search-page"} className={s.search}>
        <CustomInput
          id="search"
          type="text"
          iconType="search"
          borderColor="yellow"
          placeholder="무엇을 체험하고 싶으신가요?"
        />
      </Link>

      {!users ? (
        <div className={s.loginOff}>
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </div>
      ) : (
        <User users={users} />
      )}
    </header>
  );
};

export default Header;
