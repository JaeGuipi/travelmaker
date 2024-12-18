import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import { FaMapMarkerAlt } from "react-icons/fa";
import s from "./ActivityDetail.module.scss";
import MapInfo from "./MapInfo";

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
          <div>
            <MapInfo address={activity.address} />
            <p className={s.mapInfo}>
              <span className={s["mark-icon"]}>
                <FaMapMarkerAlt size={18} />
              </span>
              <span>{activity.address}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
