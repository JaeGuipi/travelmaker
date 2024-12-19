// BottomBar.jsx
import React from "react";
import s from "./BottomBar.module.scss";
import Link from "next/link";
import { IoSearch, IoPersonOutline } from "react-icons/io5";
import { TbReservedLine } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import API_URL from "@/constants/config";
import Alarm from "../Alarm/Alarm";
import { cookies } from "next/headers";

const BottomBar = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return;

  const response = await fetch(`${API_URL}/my-notifications?size=4`,{
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    console.error("하단바 내 알림 리스트 조회 실패");
  }

  const myNotifications = await response.json();

  return (
    <div className={s["bottom-bar"]}>
      <Link href="/search-page" className={s["bottom-bar-item"]}>
        <IoSearch size={20} />
        <span>검색</span>
      </Link>

      <Link href="/my-reservation" className={s["bottom-bar-item"]}>
        <TbReservedLine size={20} />
        예약내역
      </Link>

      <Link href="/" className={s["bottom-bar-item"]}>
        <AiOutlineHome size={20} />홈
      </Link>

      <Link href="/my-info" className={s["bottom-bar-item"]}>
        <IoPersonOutline size={20} />
        마이페이지
      </Link>
      <Alarm initialNotifications={myNotifications} type="bottom" />
    </div>
  );
};

export default BottomBar;
