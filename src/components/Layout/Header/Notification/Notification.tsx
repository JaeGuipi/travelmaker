"use client";
import { timeDiff } from "@/utils/timeDiff";
import s from "./Notification.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import { forwardRef, useEffect, useState, useRef } from "react";
import { MyNotification, MyNotifications } from "@/types/notifications/notificationsTypes";
import { PathString } from "react-hook-form";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import { deleteNotification } from "@/actions/myNotification";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import { IoMailOpenOutline } from "react-icons/io5";

const cx = classNames.bind(s);

const HighlightContent = ({ content }: { content: string }) => {
  const highlights: Record<string, PathString> = {
    승인: "confirmed",
    거절: "declined",
  };

  const parts = content.split(/(승인|거절)/);
  return (
    <span>
      {parts.map((part, index) =>
        highlights[part] ? (
          <span key={index} className={cx(highlights[part])}>
            {part}
          </span>
        ) : (
          <span key={index} className={s.content}>
            {part}
          </span>
        ),
      )}
    </span>
  );
};

const NotificationItem = ({
  notification,
  onDelete,
}: {
  notification: MyNotification;
  onDelete: (id: number) => void;
}) => {
  const timeText = timeDiff(notification.createdAt);
  const dotColor = notification.content.includes("승인") ? "text-notice-blue" : "text-notice-red";

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
        <HighlightContent content={notification.content} />
        <span className={s["time-text"]}>{timeText}</span>
      </div>
    </li>
  );
};

const NotificationList = forwardRef<HTMLDivElement, { onClose: () => void; notifications: MyNotifications }>(
  ({ onClose, notifications }, ref) => {
    const [notificationList, setNotificationList] = useState(notifications.notifications || []);
    const [currentCursorId, setCurrentCursorId] = useState(notifications.cursorId);
    const [isLoading, setIsLoading] = useState(false);
    const observerRef = useRef<HTMLDivElement>(null);

    const { notify, showError } = useToast();

    const handleDelete = async (id: number) => {
      const response = await deleteNotification(id);
      if (response?.status === 204) {
        setNotificationList((prev) => prev.filter((notification) => notification.id !== id));
        notify(toastMessages.success.deleteNotification);
      } else showError(response?.message);
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/my-notifications?size=4");
        const { notifications: newNotifications, cursorId: newCursorId } = await response.json();
        setNotificationList(newNotifications);
        setCurrentCursorId(newCursorId || null);
      } catch (error) {
        console.error("알림 데이터를 가져오는데 실패했습니다.", error);
      }
    };

    useEffect(() => {
      fetchNotifications();
    }, [onClose]);

    useEffect(() => {
      if (notificationList.length === 0) return;

      const loadMoreList = async () => {
        if (isLoading || currentCursorId === null) return;
        setIsLoading(true);

        try {
          const response = await fetch(`/api/my-notifications?size=4&cursorId=${currentCursorId}`);
          const { notifications: newNotifications, cursorId: nextCursorId } = await response.json();
          setNotificationList((prev) => [...prev, ...newNotifications]);
          setCurrentCursorId(nextCursorId || null);
        } catch (error) {
          console.error("알림 리스트 불러오기 실패", error);
        } finally {
          setIsLoading(false);
        }
      };

      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting && !isLoading) loadMoreList();
        },
        {
          root: (ref && "current" in ref ? ref.current : null) || null,
          rootMargin: "0px",
          threshold: 0.1,
        },
      );

      const refValue = observerRef.current;

      if (refValue) observer.observe(refValue);

      return () => {
        if (refValue) observer.unobserve(refValue);
      };
    }, [isLoading, currentCursorId, notificationList, ref]);

    return (
      <div ref={ref} className={s["notificationList-container"]}>
        <div className={s["conunt-container"]}>
          <span className={cx("count")}>
            {notificationList?.length !== 0 ? `알림 ${notifications.totalCount}개` : ""}
          </span>
          <button type="button" onClick={() => onClose()}>
            <Image src="/icons/btn_cancel_black.svg" width={24} height={24} alt="닫기" />
          </button>
        </div>
        {notificationList.length === 0 ? (
          <div className={s["no-list-container"]}>
            <IoMailOpenOutline className={s["no-list"]} />
            <span className={s["no-text"]}>새로운 알림이 없습니다.</span>
          </div>
        ) : (
          <ul className={s["notificationList-wrap"]}>
            {notificationList.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onDelete={handleDelete} />
            ))}
          </ul>
        )}

        {currentCursorId !== null && <div ref={observerRef}>{isLoading && <LoadingSpinner />}</div>}
      </div>
    );
  },
);

NotificationList.displayName = "NotificationList";

export default NotificationList;
