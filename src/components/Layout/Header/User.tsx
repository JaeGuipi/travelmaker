"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import s from "@/components/Layout/Header/Header.module.scss";
import { GetMe } from "@/types/users/usersTypes";
import { logout } from "@/lib/api/auth";

const User = ({ user }: { user: GetMe | null }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={s.userWrap}>
      {user ? (
        <div className={s.loginOn}>
          <button className={s.alarm}>
            <Image src={"/icons/btn_alarm.svg"} width={15} height={17} alt="알림" />
          </button>

          <div className={s.userInfo} onClick={toggleDropdown}>
            <Image
              className={s.profile}
              src={user.profileImageUrl ? `/${user.profileImageUrl}` : "/images/profile.png"}
              width={32}
              height={32}
              alt={user.nickname}
            />
            <p className={s.name}>{user.nickname}</p>

            {isDropdownOpen && (
              <div className={s.toggleDropdown}>
                <button onClick={() => logout()}>로그아웃</button>
                <Link href={"/mypage"}>마이페이지</Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={s.loginOff}>
          <Link href={"/login"}>로그인</Link>
          <Link href={"/signup"}>회원가입</Link>
        </div>
      )}
    </div>
  );
};

export default User;
