import API_URL from "@/constants/config";
import s from "./ActivityDetail.module.scss";
import Image from "next/image";

async function getActivityDetail(activityId: number) {
  const response = await fetch(`${API_URL}/activities/${activityId}`);
  return response.json();
}

export default async function ActivityDetail({ activityId }: { activityId: number }) {
  const res = await getActivityDetail(activityId);
  const { subImages } = res;

  return (
    <section>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{res.category}</p>
        <div>
          <h2>{res.title}</h2>
          드롭다운
        </div>
        <div className={s["rating-address"]}>
          <p className={s.rating}>
            <span className={s["rating-icon"]}>
              <Image src="/icons/rating_star.svg" fill alt="평점 아이콘" />
            </span>
            {res.rating} ({res.reviewCount})
          </p>
          <p className={s.address}>
            <span className={s["mark-icon"]}>
              <Image src="/icons/icon_mark.svg" fill alt="평점 아이콘" />
            </span>
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
        <div className={s["info-wrap"]}>
          <div>
            <h3 className={s["info-title"]}>체험 설명</h3>
            <p className={s.description}>{res.description}</p>
          </div>
          <div>지도</div>
          <div>
            <h3 className={s["info-title"]}>후기</h3>
            <div></div>
          </div>
        </div>
        <div className={s["calendar-fix"]}>
          {/* <div>{res.schedules}</div> */}
          <div>날짜영역임</div>
        </div>
      </div>
    </section>
  );
}
