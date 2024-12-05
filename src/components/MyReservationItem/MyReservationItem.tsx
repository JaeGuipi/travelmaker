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
  const { modals, toggleModal } = useModalStore();
  const handleDeleteItem = (id: number) => {
    onDelete(id);
  };

  const canceledKey = `canceled-${reservation.id}`;
  const completedKey = `completed-${reservation.id}`;
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
            <FormButton type="button" onClick={() => toggleModal(completedKey)}>
              후기 작성
            </FormButton>
          </div>
        )}
        {reservation.status === "pending" && (
          <div className={s.button}>
            <FormButton type="button" variant="emptyButton" onClick={() => toggleModal(canceledKey)}>
              예약 취소
            </FormButton>
          </div>
        )}
      </div>
      <ConfirmModal
        modalKey={canceledKey}
        text="canceled"
        id={reservation.id}
        onCancel={(id) => handleDeleteItem(id)}
      />
      {modals[completedKey] && (
        <FormInfoModal modalKey={completedKey} title="후기 작성">
          hello
        </FormInfoModal>
      )}
    </ItemLayout>
  );
};

export default MyReservationItem;
