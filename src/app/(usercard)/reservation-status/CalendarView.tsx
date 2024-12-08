"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ResponsReservationMonthData } from "@/types/myActivitiesTypes/myActivitiesTypes";

type Props = {
  activityId?: string;
  defaultYear: number;
  defaultMonth: number;
  data: ResponsReservationMonthData[];
};

const CalendarView = ({ activityId, defaultYear, defaultMonth, data }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(data);

  // FullCalendar에 전달할 이벤트 변환
  const events = data.map((d) => {
    const { completed, confirmed, pending } = d.reservations;
    return {
      start: d.date,
      end: d.date,
      title: `완료: ${completed}, 승인: ${confirmed}, 예약: ${pending}`,
      // 필요하다면 색상이나 다른 스타일 지정 가능
      color: confirmed > 0 ? "blue" : pending > 0 ? "orange" : "green",
    };
  });

  const handleDatesSet = (arg: { view: { currentStart: Date } }) => {
    const newYear = arg.view.currentStart.getFullYear();
    const newMonth = arg.view.currentStart.getMonth() + 1;

    const query = new URLSearchParams(searchParams as unknown as URLSearchParams);
    query.set("year", newYear.toString());
    query.set("month", newMonth.toString());
    if (activityId) {
      query.set("activity", activityId);
    }

    router.push(`?${query.toString()}`);
  };

  return (
    <div>
      <FullCalendar
        key={activityId || "default"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date(defaultYear, defaultMonth - 1, 1)}
        events={events}
        datesSet={handleDatesSet}
      />
    </div>
  );
};

export default CalendarView;
