import { getActivity } from "@/lib/api/activities";
import ActivityList from "@/components/Home/ActivityListSection/ActivityList";
import PopularItemList from "@/components/Home/PopularSection/PopularItemList";
import MainSwiper from "@/components/Home/VisualSection/MainSwiper";

export default async function Home() {
  const { activities, totalCount } = await getActivity();
  return (
    <>
      <MainSwiper />
      <PopularItemList activities={activities} />
      <ActivityList activities={activities} totalCount={totalCount} />
    </>
  );
}
