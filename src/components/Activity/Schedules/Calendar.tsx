"use client";

import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import s from "./Calendar.module.scss";
import "./CalendarStyle.scss";

interface Schedule {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface CalendarProps {
  schedules: Schedule[];
}

const Calendar: React.FC<CalendarProps> = ({ schedules }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (info: any) => {
    setSelectedDate(info.dateStr);
  };

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        <h4>날짜</h4>
        <div className={s.fullcalendar}>
          <FullCalendar
            plugins={[dayGridPlugin, resourceTimelinePlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            initialView="dayGridMonth"
            nowIndicator={true}
            editable={true}
            selectable={true}
            dateClick={handleDateClick}
            fixedWeekCount={false}
          />
        </div>
        {schedules.some((schedule) => schedule.date === selectedDate) ? (
          <div>
            <h4>예약 가능한 시간</h4>
            <ul className={s.selectedDate}>
              {schedules
                .filter((schedule) => schedule.date === selectedDate)
                .map((schedule) => (
                  <li key={schedule.id}>
                    <button>
                      {schedule.startTime} - {schedule.endTime}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <p>선택한 날짜에 예약 가능한 시간이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
