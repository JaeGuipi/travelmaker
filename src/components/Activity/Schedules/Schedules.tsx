import s from "./Schedules.module.scss";
import ScheduleDetail from "./ScheduleDetail/ScheduleDetail";
import { Schedule } from "@/types/activites/activitesTypes";

type SchedulesProps = {
  activityId: number;
  schedules: Schedule[];
  price: number;
};

export default function Schedules({ activityId, schedules, price }: SchedulesProps) {
  const formattedPrice = new Intl.NumberFormat("ko-KR").format(price);

  return (
    <>
      <div className={s.schedules}>
        <p className={s.price}>
          ₩ {formattedPrice} <span>/ 인</span>
        </p>
        <ScheduleDetail activityId={activityId} schedules={schedules} price={price} />
      </div>
    </>
  );
}
