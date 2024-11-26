import { GetActivities } from "@/app/types/activites/activitesTypes";
import Image from "next/image";
import React from "react";
import s from "./PopularList.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";

export const cx = classNames.bind(s);

const PopularList: React.FC<GetActivities> = ({ activities }) => {
  const sortedActivities = activities.sort((a, b) => b.rating - a.rating);
  return (
    <section className={cx("popular-section", "container")}>
      <h3 className={s.title}>🔥 인기 체험</h3>
      <ul className={s["popular-list"]}>
        {/* PopularListitems */}
        {sortedActivities.map((activity) => (
          <li key={activity.id}>
            <Link href="/">
              <div>
                <Image
                  src={activity.bannerImageUrl}
                  width={384}
                  height={384}
                  style={{ width: "auto", height: "100%" }}
                  alt="체험 이미지"
                />
              </div>
              <h4>{activity.title}</h4>
              <p>{activity.description}</p>
              <span>${activity.price}</span>
              <p>Rating: {activity.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularList;
