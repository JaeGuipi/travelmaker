"use client";

import { useRouter, useSearchParams } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ResponsReservationMonthData } from "@/types/myActivitiesTypes/myActivitiesTypes";
import useModalStore from "@/store/useModalStore";
import ModalContainer from "@/components/Modal/ModalContainer";
import { useState } from "react";
import s from "./CalendarView.module.scss";
import "./Calendar.scss";
import ReservationModal from "@/app/(usercard)/reservation-status/ReservationModal";
import { EventClickArg } from "@fullcalendar/core";

type Props = {
  activityId?: string;
  defaultYear: number;
  defaultMonth: string;
  dashboardData: ResponsReservationMonthData[];
};

const CalendarView = ({ activityId, defaultYear, defaultMonth, dashboardData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toggleModal } = useModalStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // 선택한 날짜

  // 🔥 완료, 승인, 예약 각각의 이벤트 생성
  const events = dashboardData.flatMap((d) => {
    const eventList = [];

    if (d.reservations.completed > 0) {
      eventList.push({
        start: d.date,
        end: d.date,
        title: `완료: ${d.reservations.completed}`,
        color: "#dddddd",
        textColor: "#4B4B4B",
        extendedProps: {
          date: d.date,
          type: "completed",
          count: d.reservations.completed,
          reservations: d.reservations,
        },
      });
    }

    if (d.reservations.confirmed > 0) {
      eventList.push({
        start: d.date,
        end: d.date,
        title: `승인: ${d.reservations.confirmed}`,
        color: "#FFF4E8",
        textColor: "#FF7C1D",
        extendedProps: {
          date: d.date,
          type: "confirmed",
          count: d.reservations.confirmed,
          reservations: d.reservations,
        },
      });
    }

    if (d.reservations.pending > 0) {
      eventList.push({
        start: d.date,
        end: d.date,
        title: `예약: ${d.reservations.pending}`,
        color: "#0085FF",
        textColor: "#ffffff",
        extendedProps: { date: d.date, type: "pending", count: d.reservations.pending, reservations: d.reservations },
      });
    }

    return eventList;
  });

  // 🔥 날짜 클릭 시 모달 열기
  const handleEventClick = (info: EventClickArg) => {
    const { extendedProps } = info.event;
    const clickedDate = extendedProps.date;

    setSelectedDate(clickedDate); // 선택한 날짜 저장
    toggleModal("reservationDetail");
  };

  return (
    <div className={s.calendarContainer}>
      <div className="fcr">
        <FullCalendar
          key={activityId || "default"}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          initialDate={new Date(defaultYear, Number(defaultMonth) - 1, 1)}
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
      </div>

      <ModalContainer modalKey="reservationDetail" className={s.reviewmodal}>
        {selectedDate && activityId && <ReservationModal activityId={activityId} date={selectedDate} />}
      </ModalContainer>
    </div>
  );
};

export default CalendarView;
