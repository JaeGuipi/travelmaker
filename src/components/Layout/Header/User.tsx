"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GetMe } from "@/types/users/usersTypes";
import { logout } from "@/lib/api/auth";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/Layout/Header/Header.module.scss";
import { MyNotifications } from "@/types/notifications/notificationsTypes";

const User = ({ users }: { users: GetMe | null; initialNotifications?: MyNotifications }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={s.userWrap} ref={dropdownRef}>
      {users && (
        <div className={s.loginOn}>
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
