import { getDotColor, timeDiff } from "@/utils/timeDiff";
import s from "./Notification.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

const cx = classNames.bind(s);

const notifications = [
  {
    id: 1,
    userId: 1,
    content: "함께하면 즐거운 스트릿 댄스(2023-01-14)",
    createdAt: "2024-11-28T07:44:57.964Z",
    updatedAt: "2024-11-28T07:44:57.964Z",
    deletedAt: "2024-11-28T07:44:57.964Z",
  },
  {
    id: 2,
    userId: 2,
    content: "함께하면 즐거운 스트릿 댄스(2023-01-14)",
    createdAt: "2023-11-28T07:44:57.964Z",
    updatedAt: "2024-11-28T07:44:57.964Z",
    deletedAt: "2024-11-28T07:44:57.964Z",
  },
];

interface NotificationItemPrpos {
  id: number;
  content: string;
  createdAt: string;
  onDelete: (id:number) => void;
}

const NotificationItem = ({ id, content, createdAt, onDelete}: NotificationItemPrpos) => {
  const timeText = timeDiff(createdAt);
  const dotColor = getDotColor(timeText);

  //알림 삭제 함수
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className={cx("notification-container")}>
      <div className={cx("status-container")}>
        <span className={cx("status",`${dotColor}`)}></span>
        <button type="button" onClick={handleDelete}>
          <Image src="/icons/btn_cancel_gray.svg" width={24} height={24} alt="삭제" />
        </button>
      </div>
      <div className={cx("content-container")}>
        <span className={cx("content")}>{content}</span>
        <span className={cx("time-text")}>{timeText}</span>
      </div>
    </li>
  );
};

interface NotificationlistProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notificationlist = ({ isOpen, onClose }: NotificationlistProps) => {
  //알림 삭제
  const handleDelete = (id: number) => {
    console.log(id);
  };

  if(isOpen) {
    console.log("open")
  }
  return (
    <div className={cx("notifications-container")}>
      <div className={cx("conunt-container")}>
        <span className={cx("count")}>알림 6개</span>
        <button type="button" onClick={() => onClose()}>
          <Image src="/icons/btn_cancel_black.svg"  width={24} height={24} alt="닫기" />
        </button>
      </div>
      <ul className={cx("notification-wrap")}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            createdAt={notification.createdAt}
            content={notification.content}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default Notificationlist;
