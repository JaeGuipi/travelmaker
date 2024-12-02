import { Schedule } from "@/types/types";
import s from "./Schedules.module.scss";
import ScheduleDetail from "./ScheduleDetail/ScheduleDetail";

type SchedulesProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

export default async function Schedules({ schedules, price }: SchedulesProps) {
  return (
    <>
      <div className={s.schedules}>
        <p className={s.price}>
          ₩ {price} <span>/ 인</span>
        </p>
        <ScheduleDetail schedules={schedules} price={price} />
      </div>
    </>
  );
}
