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
  const activityId = searchParams.activity as string | undefined;
  const year = searchParams.year ? parseInt(searchParams.year as string, 10) : new Date().getFullYear();
  const month = searchParams.month ? parseInt(searchParams.month as string, 10) : new Date().getMonth() + 1;

  const activities = await customFetch(`${API_URL}/my-activities`).then((res) => res.json());

  let reservations = [];

  try {
    if (activityId) {
      const res = await customFetch(
        `${API_URL}/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
      );
      if (!res.ok) throw new Error(`Failed to fetch reservations: ${res.statusText}`);
      reservations = await res.json();
    }
  } catch (error) {
    console.error("🚨 에러 발생:", error);
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>체험 예약 관리</h1>
      <ReservationStatus data={activities} />
      <Suspense fallback={<div>로딩 중...</div>}>
        {activityId ? (
          <CalendarView activityId={activityId} defaultYear={year} defaultMonth={month} dashboardData={reservations} />
        ) : (
          <div>체험을 먼저 선택해주세요.</div>
        )}
      </Suspense>
    </div>
  );
};

export default ReservationsPage;
