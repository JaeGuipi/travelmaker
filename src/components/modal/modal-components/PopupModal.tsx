import useModalStore from "@/app/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import s from "./ModalStyle.module.scss";
import ModalContainer from "../ModalContainer";

interface ModalProps {
  text: string;
}

const PopupModal = ({ text }: ModalProps) => {
  const { toggleModal } = useModalStore();

  return (
    <>
      <ModalContainer modalKey={text} className={s["popup-modal"]}>
        <p className={s.text}>{text}</p>
        <div className={s["button-wrap"]}>
          <FormButton size="medium" onClick={() => toggleModal(text)}>
            확인
          </FormButton>
        </div>
      </ModalContainer>
    </>
  );
};

export default PopupModal;
