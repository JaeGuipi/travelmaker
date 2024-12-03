"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GetMe } from "@/types/users/usersTypes";
import { logout } from "@/lib/api/auth";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/Layout/Header/Header.module.scss";

const User = ({ users }: { users: GetMe | null }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={s.userWrap}>
      {users && (
        <div className={s.loginOn}>
          <button className={s.alarm}>
            <Image src={"/icons/btn_alarm.svg"} width={15} height={17} alt="알림" />
          </button>

          <div className={s.userInfo} onClick={toggleDropdown}>
            <div className={s.profileImgWrap}>
              <Image
                className={s.profile}
                src={users.profileImageUrl ? `${users.profileImageUrl}` : "/images/profile.png"}
                fill
                alt={users.nickname}
              />
            </div>
            <p className={s.name}>{users.nickname}</p>

            {isDropdownOpen && (
              <div className={s.toggleDropdown}>
                <button onClick={handleLogout}>로그아웃</button>
                <Link href={"/my-info"}>마이페이지</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
