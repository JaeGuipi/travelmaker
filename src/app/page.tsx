import Container from "@/components/Layout/Container";
import MainSwiper from "@/components/Swiper/MainSwiper";

export default async function Home() {
  return (
    <div>
      <MainSwiper />
      <div>인기체험 스와이퍼</div>
      <div>카테고리 스와이퍼</div>
      <Container>상품리스트</Container>
    </div>
  );
}
