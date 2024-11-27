import { Activity } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import s from "./PopularItem.module.scss";

export interface PopularItemProps {
  activity: Activity;
}

const PopularItem: React.FC<PopularItemProps> = ({ activity }) => {
  return (
    <Link href="/">
      <Image src={activity.bannerImageUrl} width={384} height={384} priority={true} alt="체험 이미지" />
      <div className={s.info}>
        <p className={s.rating}>
          <span>Rating icon</span>: {activity.rating} ({activity.reviewCount})
        </p>
        <h4 className={s.title}>{activity.title}</h4>
        <p className={s.price}>
          ${activity.price}
          <span> / 인</span>
        </p>
      </div>
    </Link>
  );
};

export default PopularItem;
