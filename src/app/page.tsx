import { getActivity } from "@/lib/api/activities";
import AllItemList from "@/components/Home/AllItemList-section/AllItemList";
import PopularItemList from "@/components/Home/Popular-section/PopularItemList";
import MainSwiper from "@/components/Home/Visual-section/MainSwiper";

export default async function Home() {
  const { activities } = await getActivity();
  return (
    <>
      <MainSwiper />
      <PopularItemList activities={activities} />
      <AllItemList activities={activities} />
    </>
  );
}
