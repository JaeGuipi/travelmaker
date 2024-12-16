import { Activity } from "@/types/activites/activitesTypes";
import s from "./AllItemList.module.scss";
import Link from "next/link";
import Image from "next/image";
import FormButton from "@/components/Button/FormButton";

interface AllItemListProps {
  onLoadMore: () => void;
  activities: Activity[];
}

const AllItemList = ({ activities = [], onLoadMore }: AllItemListProps) => {
  return (
    <>
      <ul className={s["item-list"]}>
        {activities.map((activity) => (
          <li key={activity.id} className={s["item-box"]}>
            <Link href={`/activities/${activity.id}`}>
              <div className={s.img}>
                <Image
                  src={activity.bannerImageUrl || "/images/no_image.png"}
                  width={283}
                  height={283}
                  alt="체험 이미지"
                />
              </div>
              <div className={s.info}>
                <p className={s.rating}>
                  <span className={s["rating-icon"]}>
                    <Image src="/icons/rating_star.svg" fill alt="평점 아이콘" />
                  </span>
                  {activity.rating}&nbsp;({activity.reviewCount})
                </p>
                <h4 className={s.title}>{activity.title}</h4>
                <p className={s.price}>
                  ₩{activity.price}
                  <span> / 인</span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className={s["btn-more"]}>
        <FormButton size="medium" variant="emptyButton" onClick={onLoadMore}>
          상품 더보기
        </FormButton>
      </div>
    </>
  );
};

export default AllItemList;
