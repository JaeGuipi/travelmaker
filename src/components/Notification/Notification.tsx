"use client"

import { getDotColor, timeDiff } from "@/utils/timeDiff";
import s from "./Notification.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { MyNotification, MyNotifications } from "@/types/notifications/notificationsTypes";

const cx = classNames.bind(s);

// const notifications = [
//   {
//     id: 1,
//     userId: 1,
//     content: "함께하면 즐거운 스트릿 댄스(2023-01-14)",
//     createdAt: "2024-11-28T07:44:57.964Z",
//     updatedAt: "2024-11-28T07:44:57.964Z",
//     deletedAt: "2024-11-28T07:44:57.964Z",
//   },
//   {
//     id: 2,
//     userId: 2,
//     content: "함께하면 즐거운 스트릿 댄스(2023-01-14)",
//     createdAt: "2023-11-28T07:44:57.964Z",
//     updatedAt: "2024-11-28T07:44:57.964Z",
//     deletedAt: "2024-11-28T07:44:57.964Z",
//   },
// ];

const NotificationItem = ({
  notification,
  onDelete,
}: {
  notification: MyNotification;
  onDelete: (id: number) => void;
}) => {
  const timeText = timeDiff(notification.createdAt);
  const dotColor = getDotColor(timeText);

  //알림 삭제 함수
  const handleDelete = () => {
    onDelete(notification.id);
  };

  return (
    <li className={s["notificationItem-container"]}>
      <div className={s["status-container"]}>
        <span className={cx("status", `${dotColor}`)}></span>
        <button type="button" onClick={handleDelete}>
          <Image src="/icons/btn_cancel_gray.svg" width={24} height={24} alt="삭제" />
        </button>
      </div>
      <div className={s["content-container"]}>
        <span className={s.content}>{notification.content}</span>
        <span className={s["time-text"]}>{timeText}</span>
      </div>
    </li>
  );
};

const NotificationList = forwardRef<HTMLDivElement, { onClose: () => void; notifications: MyNotifications }>(
  ({ onClose, notifications }, ref) => {
    const [notificationList, setNotificationList] = useState(notifications.notifications);
    //알림 삭제
    const handleDelete = (id: number) => {
      console.log(id);
      setNotificationList((prev) => prev.filter((notification) => (notification.id !== id)))
    };

    return (
      <div ref={ref} className={cx("notificationList-container")}>
        <div className={cx("conunt-container")}>
          <span className={cx("count")}>{`알림 ${notifications.totalCount}개`}</span>
          <button type="button" onClick={() => onClose()}>
            <Image src="/icons/btn_cancel_black.svg" width={24} height={24} alt="닫기" />
          </button>
        </div>
        <ul className={cx("notificationList-wrap")}>
          {notificationList.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onDelete={handleDelete} />
          ))}
        </ul>
      </div>
    );
  },
);

NotificationList.displayName = "NotificationList"

export default NotificationList;
