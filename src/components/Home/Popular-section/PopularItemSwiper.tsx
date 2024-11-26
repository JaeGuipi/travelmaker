"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import SwiperCore from "swiper";
import Link from "next/link";
import s from "./PopularItemSwiper.module.scss";
import { Activity } from "@/app/types/types";

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
      loop={true}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PopularItemSwiper;
