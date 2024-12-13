import { cookies } from "next/headers";
import { ActivityDetailResponse, GetReviews } from "@/types/activites/activitesTypes";
import ReviewList from "@/components/Activity/Review/ReviewList";
import ActivityDetail from "@/components/Activity/ActivityDetail/ActivityDetail";
import Schedules from "@/components/Activity/Schedules/Schedules";
import API_URL from "@/constants/config";
import DetailSubImg from "@/components/Activity/DetailSubImg";
import s from "./page.module.scss";

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
  const users = await getUsers();
  const userId = users?.id || null;
  const activity = await getActivityDetail(params.id);

  // 페이지네이션을 위한 초기 값
  const page = 1;
  const size = 3;

  const { reviews, totalCount, averageRating } = await getActivityReview(params.id, page, size);

  return (
    <div className="container">
      <div className={s.detail}>
        <DetailSubImg activity={activity} userId={userId} />
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
