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
          initialSlide={0}
          navigation={{
            nextEl: `.${s["swiper-next"]}`,
            prevEl: `.${s["swiper-prev"]}`,
          }}
          autoplay={{ delay: 2500 }}
        >
          <SwiperSlide>
            <SwiperText slideIndex={0} />
            <div className={s.imageWrapper}>
              <Image
                src="/images/main_bnr01.jpg"
                alt="main_bnr01"
                fill
                quality={75}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperText slideIndex={1} />
            <div className={s.imageWrapper}>
              <Image
                src="/images/main_bnr02.jpg"
                alt="main_bnr02"
                fill
                quality={75}
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <SwiperText slideIndex={2} />
            <div className={s.imageWrapper}>
              <Image
                src="/images/main_bnr03.jpg"
                alt="main_bnr03"
                fill
                quality={75}
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={s["swiper-prev"]}>
          <Image src="/icons/arrow_prev.svg" alt="prev" fill quality={100} />
        </div>
        <div className={s["swiper-next"]}>
          <Image src="/icons/arrow_next.svg" alt="next" fill quality={100} />
        </div>
      </section>
    </>
  );
}
