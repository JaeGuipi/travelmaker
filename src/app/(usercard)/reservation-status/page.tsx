import CalendarView from "./CalendarView";
import { Suspense } from "react";
import { customFetch } from "@/utils/customFetch";
import API_URL from "@/constants/config";
import ReservationTitle from "./ReservationTItle";
import s from "./page.module.scss";
import ItemTitleLayout from "../my-reservation/ItemTitleLayout/ItemTitleLayout";
import NoList from "../my-reservation/MyReservationList/NoList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 예약 현황",
};

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const activityId = searchParams.activity as string | undefined;
  const year = searchParams.year ? parseInt(searchParams.year as string, 10) : new Date().getFullYear();
  const rawMonth = searchParams.month ? parseInt(searchParams.month as string, 10) : new Date().getMonth() + 1;
  const month = rawMonth < 10 ? `0${rawMonth}` : `${rawMonth}`;

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
  console.log(month);

  if (activities.activities.length === 0) {
    return (
      <div className={s.wrapper}>
        <ItemTitleLayout title="예약 현황" />
        <NoList text="아직 등록한 체험이 없어요" />
      </div>
    );
  }
  return (
    <div className={s.wrapper}>
      <ItemTitleLayout title="예약 현황" />
      <ReservationTitle data={activities} />
      <Suspense fallback={<div>로딩 중...</div>}>
        {activityId ? (
          <CalendarView activityId={activityId} defaultYear={year} defaultMonth={month} dashboardData={reservations} />
        ) : (
          <div className={s.selectTitle}>체험을 먼저 선택해주세요.</div>
        )}
      </Suspense>
    </div>
  );
};

export default Page;
