import API_URL from "@/constants/config";
import { GetReviews } from "@/types/activites/activitesTypes";

async function getActivityReview(activityId: number): Promise<GetReviews> {
  const response = await fetch(`${API_URL}/activities/${activityId}/reviews`, { cache: "no-store" });
  return response.json();
}

export default async function ReviewList({ activityId }: { activityId: number }) {
  const { reviews, totalCount, averageRating } = await getActivityReview(activityId);
  console.log("리뷰데이터", reviews);
  console.log("리뷰토탈카운터", totalCount);
  console.log("평균점수", averageRating);

  return (
    <section>
      <div>{averageRating}</div>
      <div>{totalCount}</div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div></div>
          </li>
        ))}
      </ul>
      {/* <div>{reviewData.reviews}</div> */}
    </section>
  );
}
