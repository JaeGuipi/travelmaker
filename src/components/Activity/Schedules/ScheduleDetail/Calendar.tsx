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
    <>
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
          events={schedules.map((schedule) => ({
            id: schedule.id,
          }))}
          dayCellClassNames={(arg) => {
            // 이벤트 배열에서 날짜와 일치하는 이벤트가 있는지 확인
            const hasActiveEvent = schedules.some((schedule) => {
              const cellDate = new Date(arg.date); // 현재 셀 날짜
              const eventDate = new Date(schedule.date); // 이벤트 날짜

              // 날짜와 ID 조건 확인
              return (
                cellDate.getFullYear() === eventDate.getFullYear() &&
                cellDate.getMonth() === eventDate.getMonth() &&
                cellDate.getDate() === eventDate.getDate() &&
                schedule.id // schedule.id가 존재해야 함
              );
            });

            return hasActiveEvent ? "active" : ""; // 조건에 따라 "active" 클래스 추가
          }}
        />
      </div>
      {/* 예약 가능한 시간 */}
      <div className={s["time-wrap"]}>
        <h4 className={s["sub-title"]}>예약 가능한 시간</h4>
        {schedules.some((schedule) => schedule.date === selectedDate) ? (
          <ul className={s.selectedDate}>
            {schedules
              .filter((schedule) => schedule.date === selectedDate)
              .map((schedule) => (
                <li key={schedule.id}>
                  <button type="button">
                    {schedule.startTime} - {schedule.endTime}
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <p className={s["not-possible"]}>선택한 날짜에 예약 가능한 시간이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default Calendar;
