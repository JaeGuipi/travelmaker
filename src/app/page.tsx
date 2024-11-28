import { getActivity } from "@/lib/api/activities";
import ActivityList from "@/components/Home/ActivityList-section/ActivityList";
import PopularItemList from "@/components/Home/Popular-section/PopularItemList";
import MainSwiper from "@/components/Home/Visual-section/MainSwiper";

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
