// BottomBar.jsx
import React from "react";
import styles from "./BottomBar.module.scss";
import Link from "next/link";
import classNames from "classnames/bind";
import { IoSearch, IoPersonSharp } from "react-icons/io5";
import { TbReservedLine } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { customFetch } from "@/utils/customFetch";
import API_URL from "@/constants/config";
import Alarm from "../Alarm/Alarm";

const cx = classNames.bind(styles);

const BottomBar = async () => {
  const response = await customFetch(`${API_URL}/my-notifications?size=4`);
  if (!response.ok) {
    console.error("내 알림 리스트 조회 실패");
  }

  const myNotifications = await response.json();

  return (
    <div className={cx("bottom-bar")}>
      <Link href="/search-page" className={cx("bottom-bar-item")}>
        <IoSearch size={20} />
        <span>검색</span>
      </Link>

      <Link href="/" className={cx("bottom-bar-item")}>
        <TbReservedLine size={20} />
        예약내역
      </Link>

      <Link href="/" className={cx("bottom-bar-item")}>
        <FaHome size={20} />홈
      </Link>

      <Link href="/" className={cx("bottom-bar-item")}>
        <IoPersonSharp size={20} />
        마이페이지
      </Link>

      <Alarm initialNotifications={myNotifications} type="bottom" />
    </div>
  );
};

export default BottomBar;
