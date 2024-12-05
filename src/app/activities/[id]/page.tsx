import ReviewList from "@/components/Activity/Review/ReviewList";
import s from "./page.module.scss";
import ActivityDetail from "@/components/Activity/ActivityDetail/ActivityDetail";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="container">
      <div className={s.detail}>
        <ActivityDetail activityId={params.id} />
        <ReviewList activityId={params.id} />
      </div>
    </div>
  );
}
