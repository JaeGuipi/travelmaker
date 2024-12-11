"use client";

import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import { FaStar } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Image from "next/image";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "../Dropdown/Dropdown";
import s from "./DetailSubImg.module.scss";
import DetailSubImgSwiper from "./DetailSubImgSwiper";

interface DetailSubImgProps {
  activity: ActivityDetailResponse;
  userId: number;
}

const DetailSubImg = ({ activity, userId }: DetailSubImgProps) => {
  const { subImages } = activity;
  const [isClient, setIsClient] = useState(false);
  const isMobileOrBelow = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{activity.category}</p>
        <div>
          <h2>{activity.title}</h2>
          {userId === activity.id && (
            <Dropdown>
              <DropdownToggle variant="kebab"></DropdownToggle>
              <DropdownMenu>
                <DropdownItem>수정하기</DropdownItem>
                <DropdownItem>삭제하기</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>
        <div className={s["rating-address"]}>
          <p className={s.rating}>
            <span className={s["rating-icon"]}>
              <FaStar />
            </span>
            {activity.rating} ({activity.reviewCount})
          </p>
          <p className={s.address}>
            <span className={s["mark-icon"]}>
              <Image src="/icons/icon_mark.svg" fill alt="평점 아이콘" />
            </span>
            {activity.address}
          </p>
        </div>
      </div>
      {!isMobileOrBelow && (
        <ul className={s["img-wrap"]}>
          <li>
            <Image src={activity.bannerImageUrl} width={595} height={534} alt="상세 이미지" />
          </li>
          <li>
            <ul>
              {subImages.map((subImg) => (
                <li key={subImg.id}>
                  <Image src={subImg.imageUrl} width={294} height={263} alt="상세 서브이미지" />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      )}
      {isMobileOrBelow && <DetailSubImgSwiper activity={activity} />}
    </>
  );
};

export default DetailSubImg;
