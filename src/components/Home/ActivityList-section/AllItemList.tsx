import { GetActivities } from "@/types/activites/activitesTypes";
import s from "./AllItemList.module.scss";
import Link from "next/link";
import Image from "next/image";

const AllItemList: React.FC<GetActivities> = ({ activities = [], totalCount }) => {
  console.log(totalCount);
  return (
    <ul className={s["item-list"]}>
      {activities.map((activity) => (
        <li key={activity.id} className={s["item-box"]}>
          <Link href="/">
            <Image src={activity.bannerImageUrl || `/images/profile.png`} width={283} height={283} alt="체험 이미지" />
            <div className={s.info}>
              <p className={s.rating}>
                <span>Rating icon</span>: {activity.rating} <strong>({activity.reviewCount})</strong>
              </p>
              <h4 className={s.title}>{activity.title}</h4>
              <p className={s.price}>
                ${activity.price}
                <span> / 인</span>
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AllItemList;
