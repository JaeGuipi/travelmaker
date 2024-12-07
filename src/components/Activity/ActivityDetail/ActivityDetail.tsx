import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import s from "./ActivityDetail.module.scss";
import Image from "next/image";
import Schedules from "../Schedules/Schedules";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "@/components/Dropdown/Dropdown";
import MapInfo from "./MapInfo";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ActivityDetailProps {
  activity: ActivityDetailResponse;
}

export default async function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <section>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{res.category}</p>
        <div>
          <h2>{res.title}</h2>
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
            {res.rating} ({res.reviewCount})
          </p>
          <p className={s.address}>
            <span className={s["mark-icon"]}>
              <FaMapMarkerAlt size={18} />
            </span>
            {res.address}
          </p>
        </div>
      </div>
      <div className={s["img-wrap"]}>
        <div>
          <Image src={res.bannerImageUrl} width={595} height={534} alt="상세 이미지" />
        </div>
        <ul>
          {subImages.map((subImg) => (
            <li key={subImg.id}>
              <Image src={subImg.imageUrl} fill alt="상세 서브이미지" />
            </li>
          ))}
        </ul>
      </div>
      <div className={s["detail-info"]}>
        <div className={s["info-wrap"]}>
          <div>
            <h3 className={s["info-title"]}>체험 설명</h3>
            <p className={s.description}>{res.description}</p>
          </div>
          <div>
            <MapInfo address={res.address} />
            <p className={s.mapInfo}>
              <span className={s["mark-icon"]}>
                <FaMapMarkerAlt size={18} />
              </span>
              <span>{res.address}</span>
            </p>
          </div>
          <div>
            <h3 className={s["info-title"]}>후기</h3>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
