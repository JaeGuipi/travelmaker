"use client";

import { useState } from "react";
import { Schedule } from "@/types/types";
import Calendar from "./components/Calendar";
import FormButton from "@/components/Button/FormButton";
import s from "./ScheduleDetail.module.scss";
import HeadCountSelector from "./components/HeadCountSelector";
import TotalPrice from "./components/TotalPrice";
import FormInfoModal from "@/components/Modal/ModalComponents/FormInfoModal";
import useModalStore from "@/store/useModalStore";
import { useMediaQuery } from "react-responsive";

type ScheduleDetailProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

const ScheduleDetail = ({ activityId, schedules, price }: ScheduleDetailProps) => {
  const [count, setCount] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { modals, toggleModal } = useModalStore();
  const calendarModal = "날짜";
  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1200px)" });

  const handleScheduleSelect = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  const MIN_COUNT = 1; // 최소값
  const MAX_COUNT = 100; // 예시 최대값

  // 증가 핸들러
  const handleIncrease = () => setCount((prev) => Math.min(prev + 1, MAX_COUNT)); // 최대값을 초과하지 않도록 제한

  // 감소 핸들러
  const handleDecrease = () => setCount((prev) => Math.max(prev - 1, MIN_COUNT)); // 최소값을 초과하지 않도록 제한

  // 직접 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    // 입력값이 숫자가 아니거나 범위를 초과하면 무시
    if (isNaN(value)) {
      setCount(MIN_COUNT);
    } else {
      setCount(Math.max(MIN_COUNT, Math.min(value, MAX_COUNT)));
    }
  };

  // 예약하기 버튼 핸들러
  const handleReservation = async () => {
    if (!selectedScheduleId || count < 1) {
      alert("날짜와 참여 인원수를 확인해주세요.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/activities/${activityId}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId: selectedScheduleId,
          headCount: count,
        }),
      });

      const contentType = response.headers.get("Content-Type");
      let data = {};

      if (!response.ok) {
        data = await response.json();
        console.error("에러데이터", data);
      } else {
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        }
      }
    } catch (error) {
      console.error("예약 오류:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        <h4 className={s["title"]}>날짜</h4>
        {isTabletOrBelow ? (
          <>
            <button className={s.openButton} onClick={() => toggleModal(calendarModal)}>
              날짜 선택하기
            </button>
            {modals[calendarModal] && (
              <FormInfoModal title={calendarModal} showSubmit={true} buttonTxt={"확인"}>
                <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
              </FormInfoModal>
            )}
          </>
        ) : (
          <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
        )}

        <HeadCountSelector
          count={count}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onChange={handleChange}
          minCount={MIN_COUNT}
          maxCount={MAX_COUNT}
        />
        <FormButton
          type="submit"
          size="large"
          onClick={handleReservation}
          disabled={!selectedScheduleId || isSubmitting}
        >
          예약하기
        </FormButton>
        <TotalPrice price={price} count={count} />
      </div>
    </div>
  );
};

export default ScheduleDetail;
