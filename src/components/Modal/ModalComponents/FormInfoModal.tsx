"use client";
import ModalContainer from "../ModalContainer";
import FormButton from "@/components/Button/FormButton";
import useModalStore from "@/store/useModalStore";
import s from "./ModalStyle.module.scss";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames/bind";
import { FaStar } from "react-icons/fa";
import { MyReservation } from "@/types/types";

const cx = classNames.bind(s);

interface ModalProps {
  title: string;
  showSubmit?: boolean;
  children: React.ReactNode;
  reservation: MyReservation;
}

const FormInfoModal = ({ title, showSubmit, children, reservation }: ModalProps) => {
  const { toggleModal } = useModalStore();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const starArr = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleClickClose = () => {
    toggleModal(title);
    setRating(0);
    setContent("");
  };

  return (
    <ModalContainer modalKey={title} className={s["forminfo-modal"]} overlayClassName={s["forminfo-overlay"]}>
      <div className={s["title-wrap"]}>
        <h2 className={s.text}>{title}</h2>
        <button onClick={() => handleClickClose()} className={s["btn-close"]}>
          <Image src="/icons/btn_cancel_black.svg" fill alt="close" />
        </button>
      </div>
      {/* 컨텐츠 작업 */}
      <div className={s.contents}>
        <Image className={s.img} src="/images/profile.png" width={126} height={126} alt="체험 이미지" />
        <div className={s["activity-container"]}>
          <p className={s["activity-title"]}>{reservation.activity.title}</p>
          <div className={s["schedule-container"]}>
            <p className={s.schedule}>{reservation.date}</p>
            <p className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</p>
            <p className={s.schedule}>{`${reservation.headCount}명`}</p>
          </div>
          <em className={s.price}>{`₩${reservation.totalPrice.toLocaleString()}`}</em>
        </div>
      </div>
      {/* {showSubmit && ( */}
      <form>
        <div className={s["rating-stars"]}>
          {starArr.map((star) => (
            <FaStar
              key={star}
              size="50"
              onClick={() => handleStarClick(star)}
              className={cx("star", { selected: star <= rating })}
            />
          ))}
        </div>
        <input hidden readOnly name="reservationId" value={reservation.id} />
        <input hidden readOnly name="rating" value={rating} />
        <textarea
          className={s.review}
          name="content"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="후기를 작성해주세요"
        ></textarea>
        <div className={s["button-wrap"]}>
          <FormButton type="submit" size="large" disabled={review === "" || rating === 0}>
            작성하기
          </FormButton>
        </div>
      </form>
      {/* )} */}
    </ModalContainer>
  );
};

export default FormInfoModal;
