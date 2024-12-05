import { ActivityDetailResponse, GetReviews } from "@/types/activites/activitesTypes";
import { timeDiff } from "@/utils/timeDiff";
import API_URL from "@/constants/config";
import Image from "next/image";
import s from "./ReviewList.module.scss";

interface ReviewListProps {
  activity: ActivityDetailResponse;
}

async function getActivityReview(activityId: number): Promise<GetReviews> {
  const response = await fetch(`${API_URL}/activities/${activityId}/reviews`, { cache: "no-store" });
  return response.json();
}

export default async function ReviewList({ activity }: ReviewListProps) {
  const { reviews, totalCount, averageRating } = await getActivityReview(activity.id);

  console.log("리뷰데이터", reviews);
  console.log("리뷰토탈카운터", totalCount);
  console.log("평균점수", averageRating);

  return (
    <section>
      <div>{averageRating}</div>
      <div>{totalCount}</div>
      <ul className={s.reviewList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <div className={s.profileImg}>
              <Image
                src={review.user.profileImageUrl ? `${review.user.profileImageUrl}` : "/images/profile.png"}
                fill
                alt="프로필"
              />
            </div>
            <div>
              <p>
                {review.user.nickname} | <span>{timeDiff(review.createdAt)}</span>
              </p>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
