"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import NotificationList from "../Layout/Header/Notification/Notification";
import s from "./Alarm.module.scss";
import { MyNotifications } from "@/types/notifications/notificationsTypes";
import { HiOutlineBellAlert } from "react-icons/hi2";
import classNames from "classnames";

const cx = classNames.bind(s);

interface AlarmProps {
  initialNotifications: MyNotifications;
  type: "header" | "bottom";
}

const Alarm: React.FC<AlarmProps> = ({ initialNotifications, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleNotification = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) setIsModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[]);
  const buttonClassName = type === "header" ? s.hdAlarm : s.btmAlarm;

  if (type === "bottom") {
    return (
      <>
        <button className={cx("btmAlarm", "bottom-bar-item")} onClick={toggleNotification}>
          <HiOutlineBellAlert size={20} />
          알림
        </button>
        {isModalOpen && (
          <NotificationList
            ref={notificationRef}
            onClose={() => setIsModalOpen(false)}
            notifications={initialNotifications}
          />
        )}
      </>
    );
  }

  return (
    <>
      <button className={buttonClassName} onClick={toggleNotification}>
        <Image src={"/icons/btn_alarm.svg"} width={15} height={17} alt="알림" />
      </button>
      {isModalOpen && (
        <NotificationList
          ref={notificationRef}
          onClose={() => setIsModalOpen(false)}
          notifications={initialNotifications}
        />
      )}
    </>
  );
};

export default Alarm;
