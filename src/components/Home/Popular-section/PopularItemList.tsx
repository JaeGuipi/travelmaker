"use client";
import { GetActivities } from "@/types/activites/activitesTypes";
import s from "./PopularItemList.module.scss";
import classNames from "classnames/bind";
import PopularItemSwiper from "./PopularItemSwiper";

export const cx = classNames.bind(s);

const PopularItemList: React.FC<GetActivities> = ({ activities }) => {
  // activities가 undefined나 null인 경우 기본값으로 빈 배열 사용
  const sortedActivities = (activities || []).sort((a, b) => b.rating - a.rating);

  return (
    <section className={cx("popular-section", "container")}>
      <h3 className={s.title}>🔥 인기 체험</h3>
      <PopularItemSwiper sortedActivities={sortedActivities} />
    </section>
  );
};

export default PopularItemList;
