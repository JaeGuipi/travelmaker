"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import s from "./Header.module.scss";
import { useAuth } from "@/hooks/useAuth";
import CustomInput from "@/components/input/CustomInput";

export const cx = classNames.bind(s);

const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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

      <div className={s.userWrap}>
        {user ? (
          <div className={s.loginOn}>
            <button>
              <Image src={"/icons/btn_alarm.svg"} width={15} height={17} alt="알림" />
            </button>
            <div className={s.userInfo} onClick={toggleDropdown}>
              <Image className={s.profile} src={"/images/profile.png"} width={32} height={32} alt="프로필" />
              <p className={s.name}>정만철</p>

              {isDropdownOpen && (
                <div className={s.logout}>
                  <button onClick={() => logout()}>로그아웃</button>
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
    </header>
  );
};

export default Header;
