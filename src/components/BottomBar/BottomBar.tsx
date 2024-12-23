import React from "react";
import s from "./BottomBar.module.scss";
import Link from "next/link";
import API_URL from "@/constants/config";
import { customFetch } from "@/utils/customFetch";
import { HiMagnifyingGlass, HiOutlineClipboardDocumentCheck, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineHome } from "react-icons/hi2";
import Alarm from "@/components/Alarm/Alarm";

const BottomBar = async () => {
  const response = await customFetch(`${API_URL}/my-notifications?size=4`);

  if (!response.ok) {
    console.error("하단바 내 알림 리스트 조회 실패");
  }

  const myNotifications = await response.json();

  return (
    <div className={s["bottom-bar"]}>
      <Link href="/search-page" className={s["bottom-bar-item"]}>
        <HiMagnifyingGlass size={20} />
        <span>검색</span>
      </Link>

      <Link href="/my-reservation" className={s["bottom-bar-item"]}>
        <HiOutlineClipboardDocumentCheck size={20} />
        예약 내역
      </Link>

      <Link href="/" className={s["bottom-bar-item"]}>
        <HiOutlineHome size={20} />홈
      </Link>

      <Link href="/my-info" className={s["bottom-bar-item"]}>
        <HiOutlineUser size={20} />내 프로필
      </Link>
      {response.ok && <Alarm initialNotifications={myNotifications} type="bottom" />}
    </div>
  );
};

export default BottomBar;
