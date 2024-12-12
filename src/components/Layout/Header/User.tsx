"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GetMe } from "@/types/users/usersTypes";
import { logout } from "@/lib/api/auth";
import Image from "next/image";
import Link from "next/link";
import s from "@/components/Layout/Header/Header.module.scss";
import Notificationlist from "@/components/Layout/Header/Notification/Notification";
import { MyNotifications } from "@/types/notifications/notificationsTypes";

const User = ({ users, initialNotifications }: { users: GetMe | null; initialNotifications: MyNotifications }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsModalOpen(false);
  };

  const toggleNotification = () => {
    setIsDropdownOpen(false);
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsDropdownOpen(false);
    }

    if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) setIsModalOpen(false);
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
          <button className={s.alarm} onClick={toggleNotification}>
            <Image src={"/icons/btn_alarm.svg"} width={15} height={17} alt="알림" />
          </button>
          {isModalOpen && (
            <Notificationlist
              ref={notificationRef}
              onClose={() => setIsModalOpen(false)}
              notifications={initialNotifications}
            />
          )}
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
