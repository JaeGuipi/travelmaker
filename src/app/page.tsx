import { FetchActivitiesParams, getActivities } from "./lib/api/Activities";
import s from "./page.module.scss";

export default async function Home() {
  const params: FetchActivitiesParams = {
    method: "offset",
    page: 1,
    size: 20,
  };

  const activities = await getActivities(params);
  console.log(activities);
  return (
    <div className={s.page}>
      HOME 페이지
    </div>
  );
}
