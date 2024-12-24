"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import SwiperCore from "swiper";
import SwiperText from "./SwiperText";
import s from "./MainSwiper.module.scss";

export default function MainSwiper() {
  SwiperCore.use([Navigation, Autoplay]);

  return (
    <>
      <section className={s.visual}>
        <Swiper
          className={s.swiper}
          slidesPerView={1}
          navigation={{
            nextEl: `.${s["swiper-next"]}`,
            prevEl: `.${s["swiper-prev"]}`,
          }}
          autoplay={{ delay: 2500 }}
          loop={true}
        >
          <SwiperSlide>
            <SwiperText slideIndex={0} />
            <picture>
              <source media="(max-width: 1200px)" srcSet="/images/tb_main_bnr01.jpg" />
              <Image src="/images/main_bnr01.jpg" fill alt="main_bnr01" loading="eager" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperText slideIndex={1} />

            <picture>
              <source media="(max-width: 1200px)" srcSet="/images/tb_main_bnr02.jpg" />
              <Image src="/images/main_bnr02.jpg" fill alt="main_bnr02" loading="eager" />
            </picture>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperText slideIndex={2} />
            <picture>
              <source media="(max-width: 1200px)" srcSet="/images/tb_main_bnr03.jpg" />
              <Image src="/images/main_bnr03.jpg" fill alt="main_bnr03" loading="eager" />
            </picture>
          </SwiperSlide>
          <div className={s["swiper-prev"]}>
            <Image src="/icons/arrow_prev.svg" fill alt="next" />
          </div>
          <div className={s["swiper-next"]}>
            <Image src="/icons/arrow_next.svg" fill alt="prev" />
          </div>
        </Swiper>
      </section>
    </>
  );
}
