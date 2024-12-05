"use client";

import { useEffect, useState } from "react";
import { Schedule } from "@/types/types";
import { useMediaQuery } from "react-responsive";
import { useToast } from "@/hooks/useToast";
import Calendar from "./components/Calendar";
import FormButton from "@/components/Button/FormButton";
import s from "./ScheduleDetail.module.scss";
import HeadCountSelector from "./components/HeadCountSelector";
import TotalPrice from "./components/TotalPrice";
import FormInfoModal from "@/components/Modal/ModalComponents/FormInfoModal";
import useModalStore from "@/store/useModalStore";
import toastMessages from "@/lib/toastMessage";

type ScheduleDetailProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

const ScheduleDetail = ({ activityId, schedules, price }: ScheduleDetailProps) => {
  const [isClient, setIsClient] = useState(false);
  const [count, setCount] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { modals, toggleModal } = useModalStore();
  const isTabletOrBelow = useMediaQuery({ query: "(max-width: 1200px)" });
  const isMobileOrBelow = useMediaQuery({ query: "(max-width: 768px)" });
  const { showSuccess, showError } = useToast();

  const calendarModal = "날짜";

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleScheduleSelect = (scheduleId: number, scheduleDate?: string, scheduleTime?: string) => {
    setSelectedScheduleId(scheduleId);
    setSelectedDateTime(`${scheduleDate} ${scheduleTime}`);
  };

  const MIN_COUNT = 1;
  const MAX_COUNT = 100;

  const handleIncrease = () => setCount((prev) => Math.min(prev + 1, MAX_COUNT));
  const handleDecrease = () => setCount((prev) => Math.max(prev - 1, MIN_COUNT));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value)) {
      setCount(MIN_COUNT);
    } else {
      setCount(Math.max(MIN_COUNT, Math.min(value, MAX_COUNT)));
    }
  };

  // 예약하기 핸들러
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

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          showError(toastMessages.error.requestLogin);
          return;
        }
        showError(data.message);
        return;
      }

      showSuccess(toastMessages.success.reservation);
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        {/* 모바일 화면 */}
        {isMobileOrBelow && (
          <>
            <div className={s.total}>
              <TotalPrice price={price} count={count} />
              <button className={s.openButton} onClick={() => toggleModal(calendarModal)}>
                {selectedDateTime ? `${selectedDateTime}` : "날짜 선택하기"}
              </button>
            </div>

            {modals[calendarModal] && (
              <FormInfoModal title={calendarModal} showSubmit={false}>
                <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
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
                  onClick={() => toggleModal(calendarModal)}
                  disabled={!selectedScheduleId || isSubmitting}
                >
                  예약하기
                </FormButton>
              </FormInfoModal>
            )}
          </>
        )}

        {/* 테블릿 이하 화면, 모바일 화면 제외 */}
        {isTabletOrBelow && !isMobileOrBelow && (
          <>
            <button className={s.openButton} onClick={() => toggleModal(calendarModal)}>
              {selectedDateTime ? `${selectedDateTime}` : "날짜 선택하기"}
            </button>
            {modals[calendarModal] && (
              <FormInfoModal title={calendarModal} showSubmit={false}>
                <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
                <FormButton
                  type="submit"
                  size="large"
                  onClick={() => toggleModal(calendarModal)} // 모달 닫기
                  disabled={!selectedScheduleId || isSubmitting}
                >
                  예약하기
                </FormButton>
              </FormInfoModal>
            )}
          </>
        )}

        {/* 데스크탑 화면 */}
        {!isTabletOrBelow && (
          <>
            <h4 className={s["title"]}>날짜</h4>
            <Calendar schedules={schedules} onTimeSelect={handleScheduleSelect} />
          </>
        )}

        {/* 데스크탑과 테블릿 화면의 인원 수 조정 */}
        {!isMobileOrBelow && (
          <HeadCountSelector
            count={count}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChange={handleChange}
            minCount={MIN_COUNT}
            maxCount={MAX_COUNT}
          />
        )}

        {/* 예약 버튼 */}
        <FormButton
          type="submit"
          size="large"
          onClick={handleReservation}
          disabled={!selectedScheduleId || isSubmitting}
        >
          예약하기
        </FormButton>

        {!isMobileOrBelow && <TotalPrice price={price} count={count} />}
      </div>
    </div>
  );
};

export default ScheduleDetail;
