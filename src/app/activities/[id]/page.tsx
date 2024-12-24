import { cookies } from "next/headers";
import { ActivityDetailResponse, GetReviews } from "@/types/activites/activitesTypes";
import ReviewList from "@/components/Activity/Review/ReviewList";
import ActivityDetail from "@/components/Activity/ActivityDetail/ActivityDetail";
import Schedules from "@/components/Activity/Schedules/Schedules";
import API_URL from "@/constants/config";
import DetailSubImg from "@/components/Activity/DetailSubImg";
import s from "./page.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커 : 체험 상세",
};

const getUsers = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["users"] },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("유저 정보 가져오기 실패", error);
    return null;
  }
};

// 체험 상세 정보 조회
async function getActivityDetail(activityId: number): Promise<ActivityDetailResponse> {
  const response = await fetch(`${API_URL}/activities/${activityId}`, { next: { tags: ["activity"] } });
  return response.json();
}

// 체험에 대한 리뷰 조회
async function getActivityReview(activityId: number): Promise<GetReviews> {
  const response = await fetch(`${API_URL}/activities/${activityId}/reviews?page=1&size=100`, {
    cache: "no-store",
  });
  const data = await response.json();

  return {
    ...data,
    reviews: data.reviews || [],
    totalCount: data.totalCount || 0,
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const users = await getUsers();
  const userId = users?.id || null;
  const activity = await getActivityDetail(params.id);

  const { reviews, totalCount, averageRating } = await getActivityReview(params.id);

  return (
    <div className="container">
      <div className={s.detail}>
        <DetailSubImg activity={activity} userId={userId} />
        <div className={s.detailInfo}>
          <div className={s.infoWrap}>
            <ActivityDetail activity={activity} />
            <ReviewList reviews={reviews} totalCount={totalCount} averageRating={averageRating} />
          </div>
          <Schedules activityId={activity.id} schedules={activity.schedules} price={activity.price} />
        </div>
      </div>
    </div>
  );
}
