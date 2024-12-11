import FormButton from "@/components/Button/FormButton";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames/bind";
import { FaStar } from "react-icons/fa";
import { MyReservation } from "@/types/types";
import { postReview } from "@/actions/myReservation";
import { useToast } from "@/hooks/useToast";
import toastMessages from "@/lib/toastMessage";
import s from "./ReviewContent.module.scss";

const cx = classNames.bind(s);

const ReviewContent = ({ reservation }: { reservation: MyReservation }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { showSuccess, showError } = useToast();

  const starArr = [1, 2, 3, 4, 5];

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const formData = new FormData();
      formData.append("reservationId", reservation.id.toString());
      formData.append("rating", rating.toString());
      formData.append("content", review);

      await postReview(formData);
      showSuccess(toastMessages.success.review);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  return (
    <div>
      <div className={s.contents}>
        <div className={s["img-container"]}>
          <Image
            className={s.img}
            src={reservation.activity.bannerImageUrl}
            width={126}
            height={126}
            alt="체험 이미지"
          />
        </div>
        <div className={s["activity-container"]}>
          <p className={s["activity-title"]}>{reservation.activity.title}</p>
          <div className={s["schedule-container"]}>
            <span className={s.schedule}>{reservation.date}</span>
            <span className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</span>
            <span className={s.schedule}>{`${reservation.headCount}명`}</span>
          </div>
          <p className={s.price}>{`₩${reservation.totalPrice.toLocaleString()}`}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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
        <textarea
          className={s.review}
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
    </div>
  );
};

export default ReviewContent;
