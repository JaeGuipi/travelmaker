"use client";

import FormButton from "@/components/Button/FormButton";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useEffect, useState, useRef } from "react";
import s from "./ReservationStatusDetail.module.scss";
import { ReservationResponse } from "@/types/myActivitiesTypes/myActivitiesTypes";
import { updateReservationStatus } from "@/actions/reservation.action";
import { useRouter } from "next/navigation";

type Props = {
  scheduleId: string | undefined;
  tapSatus: string;
  activityId: string;
};

const PAGE_SIZE = 10; // 기본 사이즈 10

const ReservationStatusDetail = ({ scheduleId, tapSatus, activityId }: Props) => {
  const [resdata, setResdata] = useState<ReservationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const router = useRouter();

  // 🔥 Intersection Observer를 위한 ref
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // 🔥 이미 승인된 사용자가 있는지 여부
  const confirmedUserExists = resdata?.reservations.some((res) => res.status === "confirmed");

  useEffect(() => {
    // 초기 데이터 로드
    fetchInitialData();
  }, [activityId, scheduleId, tapSatus]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/my-activities/reservations?activityId=${activityId}&scheduleId=${scheduleId}&status=${tapSatus}&size=${PAGE_SIZE}`,
      );
      if (!response.ok) throw new Error("API 요청에 실패했습니다.");
      const data = await response.json();
      setResdata(data);
      // totalCount와 reservations.length 비교하여 다음 페이지 여부 판단
      if (data.totalCount <= data.reservations.length) {
        setHasNext(false);
      }
    } catch (error) {
      setError(`데이터를 불러오는 중 오류가 발생했습니다.${error}`);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!resdata || !hasNext || isFetchingMore) return;
    try {
      setIsFetchingMore(true);
      // cursorId는 현재 로드된 reservations 중 마지막 예약의 id를 기반으로 하거나
      // 백엔드에서 반환하는 cursorId를 활용할 수 있음.
      // 여기서는 응답에 cursorId가 있다고 가정
      const cursorId = resdata.cursorId ?? 0;
      const response = await fetch(
        `/api/my-activities/reservations?activityId=${activityId}&scheduleId=${scheduleId}&status=${tapSatus}&size=${PAGE_SIZE}&cursorId=${cursorId}`,
      );
      if (!response.ok) throw new Error("추가 데이터 로드 실패");
      const data = await response.json();

      setResdata((prev) => {
        if (!prev) return prev;
        // 상태 변경 후 해당 예약의 status 업데이트
        const updatedReservations = prev.reservations.map((res) => (res.id === res.id ? { ...res } : res));

        // 변경된 예약의 status가 현재 tapSatus와 맞지 않는 경우 해당 예약 제거
        const filteredReservations = updatedReservations.filter((res) => res.status === tapSatus);

        return {
          ...prev,
          reservations: filteredReservations,
        };
      });

      // 다음 페이지 여부 판단
      if (
        data.reservations.length < PAGE_SIZE ||
        data.totalCount <= resdata.reservations.length + data.reservations.length
      ) {
        setHasNext(false);
      }
    } catch (error) {
      console.error("추가 데이터 로드 오류:", error);
    } finally {
      setIsFetchingMore(false);
    }
  };

  // Intersection Observer 설정
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNext && !isFetchingMore) {
        loadMore();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => {
      observer.disconnect();
    };
  }, [hasNext, isFetchingMore, resdata]);

  const handleStatusChange = async (reservationId: number, status: "confirmed" | "declined") => {
    try {
      setProcessingId(reservationId);
      await updateReservationStatus(activityId, reservationId, status);

      setResdata((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          reservations: prev.reservations.map((res) => (res.id === reservationId ? { ...res, status } : res)),
        };
      });
      router.refresh();
    } catch (error) {
      console.error("❌ 상태 변경 중 오류 발생:", error);
    } finally {
      setProcessingId(null);
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
                disabled={processingId === res.id || confirmedUserExists}
                onClick={() => handleStatusChange(res.id, "confirmed")}
              >
                {processingId === res.id ? "처리 중..." : "승인하기"}
              </FormButton>
              <FormButton
                size="small"
                variant="emptyButton"
                disabled={processingId === res.id}
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

      {/* 무한 스크롤을 위한 Sentinel 요소 */}
      {hasNext && !isFetchingMore && <div ref={loadMoreRef} style={{ height: "1px" }}></div>}
      {isFetchingMore && <LoadingSpinner />}
    </div>
  );
};

export default ReservationStatusDetail;
