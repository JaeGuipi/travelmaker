// BottomBar.jsx
import React from "react";
import styles from "./BottomBar.module.scss";
import Link from "next/link";
import classNames from "classnames/bind";
import { IoSearch, IoPersonSharp } from "react-icons/io5";
import { TbReservedLine } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { HiOutlineBellAlert } from "react-icons/hi2";

const cx = classNames.bind(styles);

const BottomBar = () => {
  return (
    <div className={cx("bottom-bar")}>
      <div>
        <Link href="/" className={cx("bottom-bar-item")}>
          <IoSearch size={100} />
          <span>검색</span>
        </Link>
      </div>
      <div>
        <Link href="/" className={cx("bottom-bar-item")}>
          <TbReservedLine size={100} />
          예약내역
        </Link>
      </div>
      <div>
        <Link href="/" className={cx("bottom-bar-item")}>
          <FaHome size={100} />홈
        </Link>
      </div>
      <div>
        <Link href="/" className={cx("bottom-bar-item")}>
          <IoPersonSharp size={100} />
          마이페이지
        </Link>
      </div>
      <div>
        <Link href="/" className={cx("bottom-bar-item")}>
          <HiOutlineBellAlert size={100} />
          알림
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
