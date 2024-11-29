import API_URL from "@/constants/config";

async function getActivityReview(activityId: number) {
  const response = await fetch(`${API_URL}/activities/${activityId}`);
  return response.json();
}

export default async function ReviewList({ activityId }: { activityId: number }) {
  const reviewData = await getActivityReview(activityId);
  console.log(reviewData);

  return (
    <section>
      <div>{reviewData.averageRating}</div>
      <div>{reviewData.totalCount}</div>
      {/* <div>{reviewData.reviews}</div> */}
    </section>
  );
}
