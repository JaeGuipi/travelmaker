import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import Image from "next/image";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "../Dropdown/Dropdown";
import s from "./DetailSubImg.module.scss";

interface DetailSubImgProps {
  activity: ActivityDetailResponse;
}

const DetailSubImg = ({ activity }: DetailSubImgProps) => {
  const { subImages } = activity;
  return (
    <>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{activity.category}</p>
        <div>
          <h2>{activity.title}</h2>
          <Dropdown>
            <DropdownToggle>아이콘</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>메뉴</DropdownItem>
              <DropdownItem>메뉴</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={s["rating-address"]}>
          <p className={s.rating}>
            <span className={s["rating-icon"]}>
              <Image src="/icons/rating_star.svg" fill alt="평점 아이콘" />
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
      <div className={s["img-wrap"]}>
        <div>
          <Image src={activity.bannerImageUrl} width={595} height={534} alt="상세 이미지" />
        </div>
        <ul>
          {subImages.map((subImg) => (
            <li key={subImg.id}>
              <Image src={subImg.imageUrl} fill alt="상세 서브이미지" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DetailSubImg;
