import PopularItemList from "@/components/Home/Popular-section/PopularItemList";
import MainSwiper from "@/components/Home/Visual-section/MainSwiper";
import { getActivity } from "@/lib/api/activities";

export default async function Home() {
  const { activities } = await getActivity();
  return (
    <>
      <MainSwiper />
      <PopularItemList activities={activities} />
      <div>
        <h3>🛼 마음에 드는 장소를 선택해보세요</h3>
      </div>
      <div className="container">상품리스트</div>
    </>
  );
}
