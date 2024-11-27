"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Activity } from "@/app/types/types";
import Image from "next/image";
import SwiperCore from "swiper";
import s from "./PopularItemSwiper.module.scss";
import PopularItem from "./PopularItem";

export interface GetActivities {
  sortedActivities: Activity[];
}

const PopularItemSwiper: React.FC<GetActivities> = ({ sortedActivities }) => {
  SwiperCore.use([Navigation]);

  return (
    <Swiper
      className={s.swiper}
      spaceBetween={24}
      slidesPerView={3}
      navigation={{
        nextEl: `.${s["swiper-next"]}`,
        prevEl: `.${s["swiper-prev"]}`,
      }}
    >
      <div className={s["swiper-ctrl"]}>
        <div className={s["swiper-prev"]}>
          <Image src="/icons/arrow_prev.svg" fill alt="next" />
        </div>
        <div className={s["swiper-next"]}>
          <Image src="/icons/arrow_next.svg" fill alt="prev" />
        </div>
      </div>
      {sortedActivities.map((activity) => (
        <SwiperSlide key={activity.id} className={s["swiper-slide"]}>
          <PopularItem activity={activity} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PopularItemSwiper;
