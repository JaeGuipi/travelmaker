import { ScheduleList } from "@/types/activites/activitesTypes";
import { Schedule } from "@/types/types";
import s from "./Schedules.module.scss";
import API_URL from "@/constants/config";
import ScheduleDetail from "./ScheduleDetail/ScheduleDetail";

type SchedulesProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

async function getAvailableSchedule(activityId: number, year: string, month: string): Promise<ScheduleList> {
  const response = await fetch(`${API_URL}/activities/${activityId}/available-schedule?year=${year}&month=${month}`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Schedules({ activityId, schedules, price }: SchedulesProps) {
  const { date, times } = await getAvailableSchedule(activityId);
  console.log("날짜", date);
  console.log("시간", times);

  // 작업 방식
  // 캘린더에 날짜 선택
  // 선택한 날짜 기준으로 schedules 의 date값에서 year, month 를 추출
  // 추출한 값으로 getAvailableSchedule 호출
  // 가져온 데이터
  return (
    <>
      <div className={s.schedules}>
        {date}
        {times}
        {/* <div>{res.schedules}</div> */}
        {/* 날짜 클릭하면 year . month 추출되어 함수 호출 체험 예약 가능일 조회  */}
        {/* response 로 date, times [{endTime, startTime, id}] 응답  */}
        {/* times 클릭하여 예약 신청 버튼 누르면 POST 체험 예약 신청 body에 scheduleId(times에서 조회된 id) , headCount(인원수) 포함  */}
        <p className={s.price}>
          ₩ {price} <span>/ 인</span>
        </p>
        <ScheduleDetail schedules={schedules} price={price} />
      </div>
    </>
  );
}
