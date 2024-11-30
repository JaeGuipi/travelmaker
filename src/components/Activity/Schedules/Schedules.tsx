import { ScheduleList } from "@/types/activites/activitesTypes";
import { Schedule } from "@/types/types";
import s from "./Schedules.module.scss";
import API_URL from "@/constants/config";

type SchedulesProps = {
  activityId: number;
  schedules: Schedule[];
};

async function getAvailableSchedule(activityId: number, year: string, month: string): Promise<ScheduleList> {
  const response = await fetch(`${API_URL}/activities/${activityId}/available-schedule?year=${year}&month=${month}`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function Schedules({ activityId, schedules }: SchedulesProps) {
  console.log("스케줄", schedules);

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
        <div>날짜영역임</div>
      </div>
    </>
  );
}
