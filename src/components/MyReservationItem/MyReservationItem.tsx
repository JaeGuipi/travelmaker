import classNames from "classnames/bind";
import s from "./MyReservationItem.module.scss";
import { MyReservation } from "@/types/types";
import Image from "next/image";
import FormButton from "@/components/Button/FormButton";

const cx = classNames.bind(s);

const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "예약 신청";
    case "confirmed":
      return "예약 승인";
    case "declinde":
      return "예약 거절";
    case "canceled":
      return "예약 취소";
    case "completed":
      return "체험 완료";
    default:
      return "";
  }
};


const MyReservationItem = ({ reservation, onDelete }: { reservation: MyReservation, onDelete:(id:number) => void; }) => {
  
  const onDeleteItem = (id: number) => {
    onDelete(id);
  };
  
  return (
    <div className={cx("item-container")}>
      <div className={cx("img-container")}>
        <Image src="/images/profile.png" width={204} height={204} alt="체험 이미지" className={s.img} />
      </div>
      <div className={s.info}>
        <p className={s.status}>{getStatusText(reservation.status)}</p>
        <p className={s.title}>{reservation.activity.title}</p>
        <div className={cx("schedule-container")}>
          <p className={s.schedule}>{reservation.date}</p>
          <p className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</p>
          <p className={s.schedule}>{`${reservation.headCount}명`}</p>
        </div>
        <em className={s.price}>{`₩${reservation.totalPrice}`}</em>
        {reservation.status === "체험 완료" && (
          <div className={s.button}>
            <FormButton>후기 작성</FormButton>
          </div>
        )}
        {reservation.status === "예약 승인" && (
          <div className={s.button}>
            <FormButton type="button">예약 취소</FormButton>
          </div>
        )}
        <div className={s.button}>
          <FormButton type="button" variant="emptyButton" onClick={()=> onDeleteItem(reservation.id)}>
            예약 취소
          </FormButton>
        </div>
      </div>
    </div>
  );
};

export default MyReservationItem