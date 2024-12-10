"use client";

import FormButton from "@/components/Button/FormButton";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";
import s from "./ReservationStatusDetail.module.scss";
import { ReservationResponse } from "@/types/myActivitiesTypes/myActivitiesTypes";
import { updateReservationStatus } from "@/actions/reservation.action";

type Props = {
  scheduleId: string | undefined;
  tapSatus: string;
  activityId: string;
};

const ReservationStatusDetail = ({ scheduleId, tapSatus, activityId }: Props) => {
  const [resdata, setResdata] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null); // 🔥 처리 중인 예약 ID

  // 🔥 이미 승인된 사용자가 있는지 여부를 추적
  const confirmedUserExists = resdata?.reservations.some((res) => res.status === "confirmed");

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/my-activities/reservations?activityId=${activityId}&scheduleId=${scheduleId}&status=${tapSatus}`,
        );
        if (!response.ok) throw new Error("API 요청에 실패했습니다.");
        const data = await response.json();
        setResdata(data);
      } catch (error) {
        setError(`데이터를 불러오는 중 오류가 발생했습니다.${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [activityId, scheduleId, tapSatus]);

  const handleStatusChange = async (reservationId: number, status: "confirmed" | "declined") => {
    try {
      setProcessingId(reservationId); // 🔥 현재 요청 중인 예약 ID 설정
      await updateReservationStatus(activityId, reservationId, status); // 🔥 서버 액션 호출

      // 🔥 상태 업데이트 (불변성 유지)
      setResdata((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          reservations: prev.reservations.map(
            (res) => (res.id === reservationId ? { ...res, status } : res), // 🔥 해당 예약의 상태만 변경
          ),
        };
      });
    } catch (error) {
      console.error("❌ 상태 변경 중 오류 발생:", error);
    } finally {
      setProcessingId(null); // 🔥 처리 완료 후 초기화
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className={s.container}>
      {resdata?.reservations?.map((res) => (
        <div key={res.id} className={s.card}>
          <h1 className={s.discrption}>
            <span>닉네임</span>
            {res.nickname}
          </h1>
          <h1 className={s.discrption}>
            <span>인원</span>
            {res.headCount}명
          </h1>

          {tapSatus === "pending" && res.status === "pending" && (
            <div className={s.button}>
              <FormButton
                size="small"
                disabled={processingId === res.id || confirmedUserExists} // 🔥 이미 승인된 사용자가 있거나 처리 중이면 비활성화
                onClick={() => handleStatusChange(res.id, "confirmed")}
              >
                {processingId === res.id ? "처리 중..." : "승인하기"}
              </FormButton>
              <FormButton
                size="small"
                variant="emptyButton"
                disabled={processingId === res.id} // 🔥 거절 버튼은 수동으로만 활성화
                onClick={() => handleStatusChange(res.id, "declined")}
              >
                {processingId === res.id ? "처리 중..." : "거절하기"}
              </FormButton>
            </div>
          )}

          {res.status === "confirmed" && (
            <div className={s.button}>
              <span className={s.confirmed}>예약 승인</span>
            </div>
          )}

          {res.status === "declined" && (
            <div className={s.button}>
              <span className={s.declined}>예약 거절</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReservationStatusDetail;
