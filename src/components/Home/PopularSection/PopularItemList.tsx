"use client";
import { Activity } from "@/types/activites/activitesTypes";
import s from "./PopularItemList.module.scss";
import classNames from "classnames/bind";
import PopularItemSwiper from "./PopularItemSwiper";

export const cx = classNames.bind(s);

const PopularItemList = ({ activities }: { activities: Activity[] }) => {
  const sortedActivities = (activities || []).sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <section className={cx("popular-section", "container")}>
      <h3 className={s.title}>🔥 인기 체험</h3>
      <PopularItemSwiper sortedActivities={sortedActivities} />
    </section>
  );
};

export default PopularItemList;
