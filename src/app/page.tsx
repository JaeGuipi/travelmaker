import { getActivity } from "@/lib/api/activities";
import s from "./page.module.scss";

export default async function Home() {
  const activities = await getActivity();
  return (
    <div className={s.page}>
      <div>{JSON.stringify(activities, null, 2)}</div>HOME 페이지
    </div>
  );
}
