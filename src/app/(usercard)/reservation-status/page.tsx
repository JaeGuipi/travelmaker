import ReservationStatus from "./ReservationStatus";
import CalendarView from "./CalendarView";
import { Suspense } from "react";
import { customFetch } from "@/utils/customFetch";
import API_URL from "@/constants/config";

const ReservationsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activities = await customFetch(`${API_URL}/my-activities`).then((res) => res.json());

  const activityId = searchParams.activity as string | undefined;
  const year = searchParams.year ? parseInt(searchParams.year as string, 10) : new Date().getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month as string, 10) : new Date().getMonth() + 1;

  let reservations = [];

  // activityId가 없으면 예약 데이터 fetch를 하지 않음
  if (activityId) {
    try {
      const res = await customFetch(
        `${API_URL}/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
      );
      // 응답이 200 범위가 아니면 예외 던지기
      if (!res.ok) {
        throw new Error(`Failed to fetch reservations: ${res.statusText}`);
      }
      reservations = await res.json();
    } catch (error) {
      console.error("예약 데이터 로드 에러:", error);
      // 에러 발생 시 빈 배열로 처리하거나, fallback UI를 표시할 수 있음
      reservations = [];
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>체험 예약 관리</h1>
      <ReservationStatus data={activities} />
      <Suspense fallback={<div>로딩 중...</div>}>
        {activityId ? (
          // 예약 데이터가 정상적으로 로딩된 경우 달력 표시
          <CalendarView activityId={activityId} defaultYear={year} defaultMonth={month} data={reservations} />
        ) : (
          // activityId가 없는 경우 안내 메시지
          <div>체험을 먼저 선택해주세요.</div>
        )}
      </Suspense>
    </div>
  );
};

export default ReservationsPage;
