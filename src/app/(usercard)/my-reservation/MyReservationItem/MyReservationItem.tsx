import s from "./MyReservationItem.module.scss";
import classNames from "classnames/bind";
import { MyReservation } from "@/types/types";
import getStatusText from "@/utils/getStatusText";
import ItemLayout from "@/components/ItemLayout/ItemLayout";
import FormButton from "@/components/Button/FormButton";
import ConfirmModal from "@/components/Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";
import FormInfoModal from "@/components/Modal/ModalComponents/FormInfoModal";

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
        <p className={s.title}>오버플로우히든때문에 드롭다운이 나타나지 않는다. 이걸 어떻게 바꿔야 할지 매우 고민중</p>
        <div className={cx("schedule-container")}>
          <p className={s.schedule}>{reservation.date}</p>
          <p className={s.schedule}>{`${reservation.startTime} - ${reservation.endTime}`}</p>
          <p className={s.schedule}>{`${reservation.headCount}명`}</p>
        </div>
        <em className={s.price}>{`₩${((reservation.totalPrice).toLocaleString())}`}</em>
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
      {/* <ConfirmModal text="canceled" id={reservation.id} onCancel={(id) => handleDeleteItem(id)} />
      <FormInfoModal title="후기 작성">후기</FormInfoModal> */}
    </ItemLayout>
  );
};

export default MyReservationItem;
