"use client";

import s from "./UserTabList.module.scss";
import Link from "next/link";

import { RiUserSettingsLine } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { AiOutlineSetting } from "react-icons/ai";
import { TbCalendarCheck } from "react-icons/tb";
import { usePathname } from "next/navigation";

const UserTabList = () => {
  const pathname = usePathname();

  return (
    <div className={s.userTabList}>
      <Link href="/my-info" className={pathname.startsWith("/my-info") ? s.active : ""}>
        <RiUserSettingsLine />내 프로필
      </Link>

      <Link href="/my-reservation" className={pathname.startsWith("/my-reservation") ? s.active : ""}>
        <GoChecklist />
        예약 내역
      </Link>

      <Link href="/my-activities" className={pathname.startsWith("/my-activities") ? s.active : ""}>
        <AiOutlineSetting />내 체험 관리
      </Link>

      <Link href="/reservation-status" className={pathname.startsWith("/reservation-status") ? s.active : ""}>
        <TbCalendarCheck />
        예약 현황
      </Link>
    </div>
  );
};

export default UserTabList;
