"use client";

import s from "./PopularItemList.module.scss";
import classNames from "classnames/bind";
import PopularItemSwiper from "./PopularItemSwiper";
import { GetActivities } from "@/types/activites/activitesTypes";

export const cx = classNames.bind(s);

const PopularItemList: React.FC<GetActivities> = ({ activities }) => {
  // rating 기준 리스트 나열
  const sortedActivities = activities.sort((a, b) => b.rating - a.rating);

  return (
    <section className={cx("popular-section", "container")}>
      <h3 className={s.title}>🔥 인기 체험</h3>
      <PopularItemSwiper sortedActivities={sortedActivities} />
    </section>
  );
};

export default PopularItemList;
