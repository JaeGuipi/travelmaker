import useModalStore from "@/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import s from "./ModalStyle.module.scss";
import ModalContainer from "../ModalContainer";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

interface ModalProps {
  modalKey: string;
  text: string;
  onCancel?: (id: number) => void; //콜백 함수 추가
  id: number;
  onClose: () => void;
}

const ConfirmModal = ({ modalKey, text, onCancel, onClose, id }: ModalProps) => {
  const { toggleModal } = useModalStore();
  console.log(id);

  return (
    <>
      <ModalContainer modalKey={modalKey} className={s["confirm-modal"]}>
        <span className={s.icon}>
          <Image src="/icons/btn_check.svg" fill alt={text} />
        </span>
        <p className={s.text}>{text}</p>
        <div className={cx("button-wrap", "flex")}>
          <FormButton size="small" variant="emptyButton" onClick={() => toggleModal(modalKey)}>
            아니오
          </FormButton>
          <FormButton
            size="small"
            onClick={() => {
              toggleModal(modalKey);
              if (onCancel) onCancel(id);
            }}
          >
            취소하기
          </FormButton>
        </div>
      </ModalContainer>
    </>
  );
};

export default ConfirmModal;
