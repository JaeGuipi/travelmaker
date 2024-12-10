"use client";

import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import s from "./ReservationTitle.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useRouter } from "next/navigation";

const cx = classNames.bind(s);

const ReservationTitle = ({ data }: { data: { activities: Array<{ id: string; title: string }> } }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<{ id: string; title: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: { id: string; title: string }) => {
    setSelectedActivity(item);
    setIsOpen(false);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // 새로운 activity 선택 시 현재 날짜 기준으로 쿼리 설정
    const query = new URLSearchParams();
    query.set("activity", item.id);
    query.set("year", year.toString());
    query.set("month", month.toString());

    router.replace(`/reservation-status?${query.toString()}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // dropdown 영역 밖을 클릭한 경우 닫기
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // 마운트 시 외부 클릭 감지 이벤트 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 언마운트 시 이벤트 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={s.categoryDropdown} ref={dropdownRef}>
      <div
        className={cx("selectBox", isFocused ? "focused" : "")}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span className={cx("placeholder", !selectedActivity ? "gray" : "")}>
          {selectedActivity ? selectedActivity.title : "카테고리"}
        </span>
        {isOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
      </div>
      {isOpen && (
        <ul className={s.dropdownList}>
          {data.activities.map((item) => (
            <li key={item.id} onClick={() => handleSelect(item)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationTitle;
