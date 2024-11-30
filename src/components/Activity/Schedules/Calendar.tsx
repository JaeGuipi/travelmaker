"use client";

import React, { useState } from "react";
import FullCalendar, { CalendarOptions } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import s from "./Calendar.module.scss";

// schedules의 타입을 정의
interface Schedule {
  id: string;
  date: string; // '2024-12-05' 형식의 날짜
  startTime: string; // '13:00' 형식의 시간
  endTime: string; // '14:00' 형식의 시간
}

interface CalendarProps {
  schedules: Schedule[]; // Schedule 배열을 props로 받음
}

// 날짜와 시간을 합쳐서 Date 객체를 반환하는 함수
const createDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const dateTimeString = `${date}T${time}:00`; // "YYYY-MM-DDTHH:mm:ss"
  return new Date(dateTimeString); // Date 객체로 변환
};

const Calendar: React.FC<CalendarProps> = ({ schedules }) => {
  // 클릭한 날짜를 상태로 저장
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (info: any) => {
    // 날짜 클릭 시 selectedDate 상태 업데이트
    setSelectedDate(info.dateStr); // info.dateStr은 클릭된 날짜의 문자열 형식 (예: "2024-12-05")
  };

  // FullCalendar의 옵션을 정확하게 타입으로 지정
  const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, resourceTimelinePlugin],
    headerToolbar: {
      left: "prev",
      center: "title",
      right: "next",
    },
    initialView: "dayGridMonth",
    nowIndicator: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dateClick: handleDateClick, // dateClick 이벤트 처리 함수
    initialEvents: schedules.map((schedule) => ({
      title: `이벤트 ${schedule.id}`, // 각 일정의 제목 (예: '이벤트 12316')
      start: createDateTime(schedule.date, schedule.startTime), // 시작 시간
      end: createDateTime(schedule.date, schedule.endTime), // 종료 시간
      resourceId: schedule.id, // resourceId는 id로 매핑
    })),
    eventContent: (eventInfo) => {
      const startTime = eventInfo.event.start
        ? eventInfo.event.start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "시작 시간 없음"; // start가 없으면 기본값

      const endTime = eventInfo.event.end
        ? eventInfo.event.end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "종료 시간 없음"; // end가 없으면 기본값

      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
          <div>
            {startTime} - {endTime}
          </div>
        </>
      );
    },
  };

  return (
    <div className={s.calendar}>
      <div className={s["calendar-inner"]}>
        <h4>날짜</h4>
        <div className={s.fullcalendar}>
          <S.FullCalendarContainer>
            <FullCalendar {...calendarOptions} viewClassNames={s.calendarview} />
          </S.FullCalendarContainer>
        </div>
        {/* 선택된 날짜를 보여주는 부분 */}
        <h4>예약 가능한 시간</h4>
        {selectedDate && (
          <div className={s.selectedDate}>
            <h3>선택한 날짜: {selectedDate}</h3>
            <ul>
              {/* 선택된 날짜에 해당하는 이벤트들을 표시 */}
              {schedules
                .filter((schedule) => schedule.date === selectedDate)
                .map((schedule) => (
                  <li key={schedule.id}>{`이벤트 ${schedule.id}: ${schedule.startTime} - ${schedule.endTime}`}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
