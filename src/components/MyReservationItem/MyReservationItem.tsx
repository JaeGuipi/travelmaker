import s from "./MyReservationItem.module.scss";
import classNames from "classnames/bind";
import { MyReservation } from "@/types/types";
import getStatusText from "@/utils/getStatusText";
import ItemLayout from "../ItemLayout/ItemLayout";
import FormButton from "../Button/FormButton";
import ConfirmModal from "../Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";
import FormInfoModal from "../Modal/ModalComponents/FormInfoModal";

const cx = classNames.bind(s);

const MyReservationItem = ({
  reservation,
  onDelete,
}: {
  reservation: MyReservation;
  onDelete: (id: number) => void;
}) => {
  const { toggleModal } = useModalStore();

  const handleDeleteItem = (id: number) => {
    onDelete(id);
  };

  return (
    <ItemLayout src={"/images/profile.png"} alt={"체험 이미지"}>
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
        <p className={s.title}>{reservation.activity.title}</p>
        <div className={cx("schedule-container")}>
          <p className={s.schedule}>{reservation.date}</p>
          <p className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</p>
          <p className={s.schedule}>{`${reservation.headCount}명`}</p>
        </div>
        <em className={s.price}>{`₩${reservation.totalPrice}`}</em>
        {reservation.status === "completed" && (
          <div className={s.button}>
            <FormButton type="button" onClick={() => toggleModal("후기 작성")}>
              후기 작성
            </FormButton>
          </div>
        )}
        {reservation.status === "pending" && (
          <div className={s.button}>
            <FormButton type="button" variant="emptyButton" onClick={() => toggleModal("canceled")}>
              예약 취소
            </FormButton>
          </div>
        )}
      </div>
      <ConfirmModal text="canceled" id={reservation.id} onCancel={(id) => handleDeleteItem(id)} />
      <FormInfoModal title="후기 작성" reservation={reservation}>후기</FormInfoModal>
    </ItemLayout>
  );
};

export default MyReservationItem;
