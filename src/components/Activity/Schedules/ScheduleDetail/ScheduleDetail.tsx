"use client";

import React, { useState } from "react";
import Calendar from "./Calendar";
import { Schedule } from "@/types/types";
import FormButton from "@/components/Button/FormButton";
import s from "./ScheduleDetail.module.scss";

type ScheduleDetailProps = {
  schedules: Schedule[];
  price: number;
};

const ScheduleDetail = ({ schedules, price }: ScheduleDetailProps) => {
  const [count, setCount] = useState<number>(0);

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

  // 총합 계산
  const totalPrice = price * count;

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        <h4 className={s["title"]}>날짜</h4>
        <Calendar schedules={schedules} />
        <div className={s.headCount}>
          <h4 className={s["sub-title"]}>참여 인원수</h4>
          <div className={s["headCount-input"]}>
            <button className={s.miuns} onClick={handleDecrease} disabled={count === MIN_COUNT}>
              -
            </button>
            <input
              type="number"
              value={count}
              onChange={handleChange}
              aria-label="Counter Input"
              min={MIN_COUNT}
              max={MAX_COUNT}
            />
            <button className={s.plus} onClick={handleIncrease} disabled={count === MAX_COUNT}>
              +
            </button>
          </div>
          <FormButton type="submit" size="large">
            예약하기
          </FormButton>
        </div>
        <div className={s.total}>
          <h4 className={s.title}>총 합계</h4>
          <p className={s["total-price"]}>₩ {totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
