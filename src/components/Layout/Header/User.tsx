"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GetMe } from "@/types/users/usersTypes";
import { MyNotifications } from "@/types/notifications/notificationsTypes";
import { logout } from "@/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/Layout/Header/Header.module.scss";
import {
  HiOutlineUser,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog6Tooth,
  HiOutlineCalendarDays,
  HiOutlineUserMinus,
} from "react-icons/hi2";

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
                <Link href={"/my-info"}>
                  <HiOutlineUser />내 프로필
                </Link>
                <Link href={"/my-reservation"}>
                  <HiOutlineClipboardDocumentCheck />
                  예약 내역
                </Link>
                <Link href={"/my-activities"}>
                  <HiOutlineCog6Tooth />내 체험 관리
                </Link>
                <Link href={"/reservation-status"}>
                  <HiOutlineCalendarDays />
                  예약 현황
                </Link>
                <div className={s.logout}>
                  <button onClick={handleLogout}>
                    <HiOutlineUserMinus />
                    로그아웃
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
