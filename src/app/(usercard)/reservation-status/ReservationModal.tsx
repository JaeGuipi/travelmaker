"use client";

import { useEffect, useRef, useState } from "react";
import ModalTabs from "../../../components/Modal/ModalTabs";
import s from "./ReservationModal.module.scss";
import classNames from "classnames/bind";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ReservationStatusDetail from "@/app/(usercard)/reservation-status/ReservationStatusDetail";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Image from "next/image";
import canclebutton from "@/../public/icons/btn_cancel_black.svg";
import useModalStore from "@/store/useModalStore";

type Props = {
  activityId: string;
  date: string;
};

type TabType = "pending" | "confirmed" | "declined";

interface ReservationDetail {
  scheduleId: string;
  startTime: string;
  endTime: string;
}

const cx = classNames.bind(s);

const ReservationModal = ({ activityId, date }: Props) => {
  const { toggleModal } = useModalStore();
  const [reservationDetails, setReservationDetails] = useState<ReservationDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDropdownFocused, setIsDropdownFocused] = useState<boolean>(false);
  const [selectedReservationTime, setSelectedReservationTime] = useState<{ id: string; title: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 데이터 가져오기
  useEffect(() => {
    fetchReservationDetails();
  }, [activityId, date]);

  const fetchReservationDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/my-activities/reserved-schedule?activityId=${activityId}&date=${date}`);
      if (!response.ok) throw new Error(`Failed to fetch reservation detail: ${response.statusText}`);
      const result = await response.json();
      setReservationDetails(result);

      // 🔥 기본값 설정 - 0번 인덱스의 예약 시간을 기본값으로 설정
      if (result?.length > 0) {
        setSelectedReservationTime({
          id: result[0].scheduleId,
          title: `${result[0].startTime} ~ ${result[0].endTime}`,
        });
      }
    } catch (error) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      throw new Error(`Failed to fetch reservation detail: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  // 🔥 카테고리 드롭다운 UI
  const renderDropdown = () => (
    <div className={s.categoryDropdown} ref={dropdownRef}>
      <div
        className={cx("selectBox", isDropdownFocused ? "focused" : "")}
        tabIndex={0}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        onFocus={() => setIsDropdownFocused(true)}
        onBlur={() => setIsDropdownFocused(false)}
      >
        <span className={cx("placeholder", !selectedReservationTime ? "gray" : "")}>
          {selectedReservationTime?.title || "시간 선택"}
        </span>
        {isDropdownOpen ? <IoIosArrowUp size={15} /> : <IoIosArrowDown size={15} />}
      </div>
      {isDropdownOpen && (
        <ul className={s.dropdownList}>
          {reservationDetails.map((item) => (
            <li key={item.scheduleId} onClick={() => handleSelectReservationTime(item)}>
              {item.startTime} ~ {item.endTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // 🔥 탭 콘텐츠 UI
  const tabContent = {
    pending: (
      <ReservationStatusDetail scheduleId={selectedReservationTime?.id} tapSatus={activeTab} activityId={activityId} />
    ),
    declined: (
      <ReservationStatusDetail scheduleId={selectedReservationTime?.id} tapSatus={activeTab} activityId={activityId} />
    ),
    confirmed: (
      <ReservationStatusDetail scheduleId={selectedReservationTime?.id} tapSatus={activeTab} activityId={activityId} />
    ),
  };

  // 🔥 활동 선택 핸들러
  const handleSelectReservationTime = (activity: { scheduleId: string; startTime: string; endTime: string }) => {
    setSelectedReservationTime({ id: activity.scheduleId, title: `${activity.startTime} ~ ${activity.endTime}` });
    setIsDropdownOpen(false);
  };
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  return (
    <div className={s.container}>
      <div className={s.headwrap}>
        <h2 className={s.modalhead}>예약 정보</h2>
        <button onClick={() => toggleModal("reservationDetail")}>
          <Image src={canclebutton} alt="취소버튼" />
        </button>
      </div>

      {/* 🔥 탭 메뉴 */}
      <ModalTabs
        tabs={[
          { key: "pending", label: "신청" },
          { key: "confirmed", label: "승인" },
          { key: "declined", label: "거절" },
        ]}
        onChange={(key) => setActiveTab(key as TabType)}
      />
      <div className={s.datewrap}>
        <p className={s.modaltitle}>예약 날짜</p>
        <p className={s.date}>{formatDate(date)}</p>
        {renderDropdown()}
      </div>

      {/* 🔥 탭 콘텐츠 */}
      <div className={s.tabContentContainer}>
        <p className={s.modaltitle}>예약 내역</p>
        {tabContent[activeTab]}
      </div>
    </div>
  );
};

export default ReservationModal;
