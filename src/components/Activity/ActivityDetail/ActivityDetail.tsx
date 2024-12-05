import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import s from "./ActivityDetail.module.scss";

interface ActivityDetailProps {
  activity: ActivityDetailResponse;
}

export default async function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <section>
      <div className={s["detail-info"]}>
        <div className={s["info-wrap"]}>
          <div>
            <h3 className={s["info-title"]}>체험 설명</h3>
            <p className={s.description}>{activity.description}</p>
          </div>
          <div>지도</div>
          <div>
            <h3 className={s["info-title"]}>후기</h3>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
