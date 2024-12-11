"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import Image from "next/image";
import s from "./DetailSubImgSwiper.module.scss";

SwiperCore.use([Navigation, Autoplay]);

interface DetailSubImgProps {
  activity: ActivityDetailResponse;
  subImages?: { id: number; imageUrl: string }[];
}

const DetailSubImgSwiper = ({ activity }: DetailSubImgProps) => {
  const { subImages = [] } = activity;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Swiper
        className={s.swiper}
        slidesPerView={1}
        navigation={{
          nextEl: `.${s["swiper-next"]}`,
          prevEl: `.${s["swiper-prev"]}`,
        }}
        loop={true}
      >
        <SwiperSlide className={s["swiper-slide"]}>
          <Image src={activity.bannerImageUrl} width={595} height={534} alt="상세 이미지" />
        </SwiperSlide>
        {Array.isArray(subImages) &&
          subImages.map((subImg) => (
            <SwiperSlide key={subImg.id} className={s["swiper-slide"]}>
              <Image src={subImg.imageUrl} width={294} height={263} alt="상세 서브이미지" />
            </SwiperSlide>
          ))}
        <div className={s["swiper-ctrl"]}>
          <div className={s["swiper-prev"]}>
            <Image src="/icons/arrow_prev.svg" fill alt="next" />
          </div>
          <div className={s["swiper-next"]}>
            <Image src="/icons/arrow_next.svg" fill alt="prev" />
          </div>
        </div>
      </Swiper>
    </>
  );
};

export default DetailSubImgSwiper;
