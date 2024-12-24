"use client";
import { ActivityDetailResponse } from "@/types/activites/activitesTypes";
import { FaStar } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from "../Dropdown/Dropdown";
import { useRouter } from "next/navigation";
import { deleteActivity } from "@/actions/activity.action";
import Image from "next/image";
import s from "./DetailSubImg.module.scss";
import DetailSubImgSwiper from "./DetailSubImgSwiper";
import ConfirmModal from "../Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";

interface DetailSubImgProps {
  activity: ActivityDetailResponse;
  userId: number;
  subImages?: { id: number; imageUrl: string }[];
}

const DetailSubImg = ({ activity, userId }: DetailSubImgProps) => {
  const { subImages = [] } = activity;
  const [isClient, setIsClient] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobileOrBelow = useMediaQuery({ query: "(max-width: 768px)" });

  const router = useRouter();

  const { toggleModal } = useModalStore();
  const confirmModal = "delete";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteItem = async () => {
    if (selectedId === null) return;
    try {
      await deleteActivity(selectedId);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const openDeleteModal = (id: number) => {
    setSelectedId(id);
    toggleModal(confirmModal);
  };

  if (!isClient) {
    return null;
  }

  if (!Array.isArray(subImages)) {
    return <p>이미지가 없습니다.</p>;
  }

  return (
    <>
      <div className={s["title-wrap"]}>
        <p className={s.cate}>{activity.category}</p>
        <div>
          <h2>{activity.title}</h2>
          {userId === activity.userId && (
            <Dropdown>
              <DropdownToggle variant="kebab"></DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => router.push(`/my-activities/${activity.id}`)}>수정하기</DropdownItem>
                <DropdownItem onClick={() => openDeleteModal(activity.id)}>삭제하기</DropdownItem>
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
              {Array.isArray(subImages) &&
                subImages.map((subImg) => (
                  <li key={subImg.id}>
                    <Image src={subImg.imageUrl} width={294} height={263} alt="상세 서브이미지" />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      )}
      {isMobileOrBelow && <DetailSubImgSwiper activity={activity} />}
      <ConfirmModal modalKey={confirmModal} text="체험을 삭제하시겠어요?" onCancel={handleDeleteItem} id={selectedId} />
    </>
  );
};

export default DetailSubImg;
