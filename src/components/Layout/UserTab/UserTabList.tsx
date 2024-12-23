"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import s from "./UserTabList.module.scss";
import {
  HiOutlineUser,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCog6Tooth,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

const UserTabList = () => {
  const pathname = usePathname();

  return (
    <div className={s.userTabList}>
      <Link href="/my-info" className={pathname.startsWith("/my-info") ? s.active : ""}>
        <HiOutlineUser />내 프로필
      </Link>

      <Link href="/my-reservation" className={pathname.startsWith("/my-reservation") ? s.active : ""}>
        <HiOutlineClipboardDocumentCheck />
        예약 내역
      </Link>

      <Link href="/my-activities" className={pathname.startsWith("/my-activities") ? s.active : ""}>
        <HiOutlineCog6Tooth />내 체험 관리
      </Link>

      <Link href="/reservation-status" className={pathname.startsWith("/reservation-status") ? s.active : ""}>
        <HiOutlineCalendarDays />
        예약 현황
      </Link>
    </div>
  );
};

export default UserTabList;
