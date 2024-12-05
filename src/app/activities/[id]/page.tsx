import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import ReviewList from "@/components/Activity/Review/ReviewList";
import ActivityDetail from "@/components/Activity/ActivityDetail/ActivityDetail";
import Schedules from "@/components/Activity/Schedules/Schedules";
import API_URL from "@/constants/config";
import DetailSubImg from "@/components/Activity/DetailSubImg";
import s from "./page.module.scss";

async function getActivityDetail(activityId: number): Promise<ActivityDetailResponse> {
  const response = await fetch(`${API_URL}/activities/${activityId}`, { cache: "no-store" });
  return response.json();
}

export default async function Page({ params }: { params: { id: number } }) {
  const activity = await getActivityDetail(params.id);

  return (
    <div className="container">
      <div className={s.detail}>
        <DetailSubImg activity={activity} />
        <div className={s.detailInfo}>
          <div className={s.infoWrap}>
            <ActivityDetail activity={activity} />
            <ReviewList activity={activity} />
          </div>
          <Schedules activityId={activity.id} schedules={activity.schedules} price={activity.price} />
        </div>
      </div>
    </div>
  );
}
