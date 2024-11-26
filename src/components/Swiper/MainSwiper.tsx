"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import s from "./MainSwiper.module.scss";

export default function MainSwiper() {
  return (
    <div>
      <div>text다 임마</div>
      <Swiper className={s.swiper} spaceBetween={50} slidesPerView={1} navigation autoplay={{ delay: 1000 }} loop>
        <SwiperSlide>
          <Image
            src="/images/main_bnr01.jpg"
            fill
            style={{
              objectFit: "cover",
            }}
            alt="main_bnr01"
            loading="eager"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/main_bnr02.jpg"
            fill
            style={{
              objectFit: "cover",
            }}
            alt="main_bnr02"
            loading="eager"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/main_bnr03.jpg"
            fill
            style={{
              objectFit: "cover",
            }}
            alt="main_bnr03"
            loading="eager"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
