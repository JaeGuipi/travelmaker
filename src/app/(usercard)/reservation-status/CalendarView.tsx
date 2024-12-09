"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ResponsReservationMonthData } from "@/types/myActivitiesTypes/myActivitiesTypes";
import useModalStore from "@/store/useModalStore";
import ModalContainer from "@/components/Modal/ModalContainer";
import ReservationDetailModalContent from "@/components/Modal/ModalComponents/ReservationDetailModalContent";
import { useEffect, useState } from "react";

type Props = {
  activityId?: string;
  defaultYear: number;
  defaultMonth: number;
  dashboardData: ResponsReservationMonthData[];
};

const CalendarView = ({ activityId, defaultYear, defaultMonth, dashboardData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleModal } = useModalStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택한 날짜

  const events = dashboardData.map((d) => ({
    start: d.date,
    end: d.date,
    title: `완료: ${d.reservations.completed}, 승인: ${d.reservations.confirmed}, 예약: ${d.reservations.pending}`,
    color: d.reservations.confirmed > 0 ? "blue" : d.reservations.pending > 0 ? "orange" : "green",
    extendedProps: { date: d.date, reservations: d.reservations },
  }));

  // 🔥 날짜 클릭 시 모달 열기
  const handleEventClick = (info: any) => {
    const { extendedProps } = info.event;
    const clickedDate = extendedProps.date;

    setSelectedDate(clickedDate); // 선택한 날짜 저장
    toggleModal("reservationDetail");
  };

  return (
    <div>
      <FullCalendar
        key={activityId || "default"}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={new Date(defaultYear, defaultMonth - 1, 1)}
        events={events}
        datesSet={(arg) => {
          const newYear = arg.view.currentStart.getFullYear();
          const newMonth = arg.view.currentStart.getMonth() + 1;
          const query = new URLSearchParams(searchParams as unknown as URLSearchParams);
          query.set("year", newYear.toString());
          query.set("month", newMonth.toString());
          if (activityId) query.set("activity", activityId);
          router.push(`?${query.toString()}`);
        }}
        eventClick={handleEventClick}
      />

      <ModalContainer modalKey="reservationDetail">
        {selectedDate && activityId && <ReservationDetailModalContent activityId={activityId} date={selectedDate} />}
      </ModalContainer>
    </div>
  );
};

export default CalendarView;
