import s from "./MyReservationItem.module.scss";
import classNames from "classnames/bind";
import { MyReservation } from "@/types/myReservationsTypes/myReservationsTypes";
import getStatusText from "@/utils/getStatusText";
import ItemLayout from "@/app/(usercard)/my-reservation/ItemLayout/ItemLayout";
import FormButton from "@/components/Button/FormButton";

const cx = classNames.bind(s);

const MyReservationItem = ({
  reservation,
  onOpenModal,
}: {
  reservation: MyReservation;
  onDelete: (id: number) => void;
  onOpenModal: (key: string, reservation: MyReservation) => void;
}) => {
  return (
    <ItemLayout src={reservation.activity.bannerImageUrl} alt="체험 이미지">
      <div className={s.info}>
        <p
          className={cx("status", {
            pending: reservation.status === "pending",
            confirmed: reservation.status === "confirmed",
            declinde: reservation.status === "declined",
            canceled: reservation.status === "canceled",
            completed: reservation.status === "completed",
          })}
        >
          {getStatusText(reservation.status)}
        </p>
        {/* <p className={s.title}>{reservation.activity.title}</p> */}
        <div className={s.title}>
          오버플로우 히든 없이 말 줄버플로우 히든 없이 임표를 어떻게 적용해야 할 지 너무 어려운데 도대체 어떻게 해
        </div>
        <div className={s["schedule-container"]}>
          <span className={s.schedule}>{reservation.date}</span>
          <span className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</span>
          <span className={s.schedule}>{`${reservation.headCount}명`}</span>
        </div>
        <em className={s.price}>{`₩${reservation.totalPrice.toLocaleString()}`}</em>
        {reservation.status === "completed" && (
          <div className={s.button}>
            <FormButton
              type="button"
              onClick={() => onOpenModal("review", reservation)}
              disabled={reservation.reviewSubmitted}
            >
              후기 작성
            </FormButton>
          </div>
        )}
        {reservation.status === "pending" && (
          <div className={s.button}>
            <FormButton type="button" variant="emptyButton" onClick={() => onOpenModal("confirm", reservation)}>
              예약 취소
            </FormButton>
          </div>
        )}
      </div>
    </ItemLayout>
  );
};

export default MyReservationItem;
