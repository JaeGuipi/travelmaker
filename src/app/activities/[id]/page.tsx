import { ActivityDetailResponse, GetReviews } from "@/types/activites/activitesTypes";
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

async function getActivityReview(activityId: number, page: number, size: number): Promise<GetReviews> {
  const response = await fetch(`${API_URL}/activities/${activityId}/reviews?page=${page}&size=${size}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return {
    ...data,
    reviews: data.reviews || [],
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const activity = await getActivityDetail(params.id);

  // 페이지네이션을 위한 초기 값
  const page = 1;
  const size = 3;

  const { reviews, totalCount, averageRating } = await getActivityReview(params.id, page, size);

  return (
    <div className="container">
      <div className={s.detail}>
        <DetailSubImg activity={activity} />
        <div className={s.detailInfo}>
          <div className={s.infoWrap}>
            <ActivityDetail activity={activity} />
            <ReviewList
              activityId={activity.id}
              reviews={reviews}
              totalCount={totalCount}
              averageRating={averageRating}
              page={page}
              size={size}
            />
          </div>
          <Schedules activityId={activity.id} schedules={activity.schedules} price={activity.price} />
        </div>
      </div>
    </div>
  );
}
