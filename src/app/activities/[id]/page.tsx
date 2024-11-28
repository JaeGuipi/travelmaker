import { getActivityDetail, getActivityReview } from "@/lib/api/activities";
import s from "./page.module.scss";
import Image from "next/image";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <div className="container">
      <div className={s.detail}>
        <Detail activityId={params.id} />
        <ReviewList activityId={params.id} />
      </div>
    </div>
  );
}

async function Detail({ activityId }: { activityId: number }) {
  const res = await getActivityDetail(activityId);
  const { subImages } = res;

  console.log(subImages);
  return (
    <section>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{res.category}</p>
        <div>
          <h2>{res.title}</h2>
          <div>dropdown</div>
        </div>
        <div className={s["rating-address"]}>
          <p className={s.rating}>
            <span>ratingicon</span>
            {res.rating} ({res.reviewCount})
          </p>
          <p className={s.address}>
            <span>markicon</span>
            {res.address}
          </p>
        </div>
      </div>
      <div className={s["img-wrap"]}>
        <div>
          <Image src={res.bannerImageUrl} width={595} height={534} alt="상세 이미지" />
        </div>
        <ul>
          {subImages.map((subImg) => (
            <li key={subImg.id}>
              <Image src={subImg.imageUrl} fill alt="상세 서브이미지" />
            </li>
          ))}
        </ul>
      </div>
      <div className={s["detail-info"]}>
        <div>
          <div>
            <h3>체험 설명</h3>
            <p>{res.description}</p>
          </div>
          <div>지도</div>
          <div>
            <h3>후기</h3>
            <div></div>
          </div>
        </div>
        {/* <div>{res.schedules}</div> */}
      </div>
    </section>
  );
}

async function ReviewList({ activityId }: { activityId: number }) {
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
