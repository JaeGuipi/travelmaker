import useModalStore from "@/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import s from "./ModalStyle.module.scss";
import ModalContainer from "../ModalContainer";

interface ModalProps {
  modalKey: string;
  text: string;
}

const PopupModal = ({ modalKey, text }: ModalProps) => {
  const { toggleModal } = useModalStore();

  return (
    <>
      <ModalContainer modalKey={modalKey} className={s["popup-modal"]}>
        <p className={s.text}>{text}</p>
        <div className={s["button-wrap"]}>
          <FormButton size="medium" onClick={() => toggleModal(modalKey)}>
            확인
          </FormButton>
        </div>
      </ModalContainer>
    </>
  );
};

export default PopupModal;
