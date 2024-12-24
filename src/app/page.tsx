import { getActivity } from "@/lib/api/activities";
import ActivityList from "@/components/Home/ActivityListSection/ActivityList";
import PopularItemList from "@/components/Home/PopularSection/PopularItemList";
import MainSwiper from "@/components/Home/VisualSection/MainSwiper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트래블 메이커",
};

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
