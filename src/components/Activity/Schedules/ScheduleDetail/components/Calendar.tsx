"use client";

import React, { useState } from "react";
import { Schedule } from "@/types/activites/activitesTypes";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import s from "./Calendar.module.scss";
import "./CalendarStyle.scss";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface CalendarProps {
  schedules: Schedule[];
  onTimeSelect: (scheduleId: number, scheduleDate: string, scheduleTime: string) => void; // 부모로 일정 전달하는 콜백
}

const Calendar: React.FC<CalendarProps> = ({ schedules, onTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeScheduleId, setActiveScheduleId] = useState<number | null>(null);

  // 일정 데이터 로딩
  if (!Array.isArray(schedules) || schedules.length === 0) {
    return <LoadingSpinner />;
  }

  const handleDateClick = (info: DateClickArg) => {
    setSelectedDate(info.dateStr);
  };

  const handleTimeSelect = (scheduleId: number, scheduleDate: string, scheduleTime: string) => {
    setActiveScheduleId(scheduleId); // 클릭한 일정 ID를 상태에 저장
    onTimeSelect(scheduleId, scheduleDate, scheduleTime); // 부모에게 선택된 일정 전달
  };

  return (
    <>
      <div className={s.fullcalendar}>
        <div className="calendar-wrap">
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
              id: String(schedule.id), // id를 string으로 변환
            }))}
            dayCellClassNames={(arg) => {
              const cellDate = new Date(arg.date).toDateString();
              const isSelected = selectedDate && cellDate === new Date(selectedDate).toDateString();
              const hasEvent = schedules.some((schedule) => new Date(schedule.date).toDateString() === cellDate);
              return `${isSelected ? s.active : ""} ${hasEvent ? s.hasEvent : ""}`;
            }}
          />
        </div>
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
                  <button
                    type="button"
                    onClick={() => handleTimeSelect(schedule.id, schedule.date, schedule.startTime)}
                    className={activeScheduleId === schedule.id ? s.active : ""}
                  >
                    {schedule.startTime} ~ {schedule.endTime}
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
