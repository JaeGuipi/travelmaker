import { Schedule } from "@/types/types";
import s from "./Schedules.module.scss";
import ScheduleDetail from "./ScheduleDetail/ScheduleDetail";

type SchedulesProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

export default function Schedules({ activityId, schedules, price }: SchedulesProps) {
  return (
    <>
      <div className={s.schedules}>
        <p className={s.price}>
          ₩ {price} <span>/ 인</span>
        </p>
        {/* 클라이언트 컴포넌트 */}
        <ScheduleDetail activityId={activityId} schedules={schedules} price={price} />
      </div>
    </>
  );
}
