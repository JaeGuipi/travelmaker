"use client";

import { useState } from "react";
import { Schedule } from "@/types/types";
import { postReservation } from "@/actions/activites.action";
import Calendar from "./components/Calendar";
import FormButton from "@/components/Button/FormButton";
import s from "./ScheduleDetail.module.scss";
import HeadCountSelector from "./components/HeadCountSelector";
import TotalPrice from "./components/TotalPrice";

type ScheduleDetailProps = {
  schedules: Schedule[];
  price: number;
};

const ScheduleDetail = ({ schedules, price }: ScheduleDetailProps) => {
  const [count, setCount] = useState<number>(0);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleScheduleSelect = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
    console.log("선택된 scheduleId:", scheduleId);
  };

  const MIN_COUNT = 0; // 최소값
  const MAX_COUNT = 100; // 예시 최대값 (필요에 따라 변경 가능)

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
    if (!selectedScheduleId || count <= 0) {
      alert("날짜와 참여 인원수를 확인해주세요.");
      return;
    }

    setIsSubmitting(true); // 중복 클릭 방지
    try {
      const reservationData = {
        scheduleId: selectedScheduleId,
        headCount: count,
      };
      await postReservation(selectedScheduleId, reservationData);
      alert("예약이 성공적으로 완료되었습니다!");
    } catch (error) {
      console.error("예약 중 오류 발생:", error);
      alert("예약 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false); // 중복 클릭 방지 해제
    }
  };

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        <h4 className={s["title"]}>날짜</h4>
        <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
        <HeadCountSelector
          count={count}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onChange={handleChange}
          minCount={MIN_COUNT}
          maxCount={MAX_COUNT}
        />
        <FormButton type="submit" size="large" onClick={handleReservation}>
          예약하기
        </FormButton>
        <TotalPrice price={price} count={count} />
      </div>
    </div>
  );
};

export default ScheduleDetail;
