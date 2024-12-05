import ModalContainer from "../ModalContainer";
import FormButton from "@/components/Button/FormButton";
import useModalStore from "@/store/useModalStore";
import s from "./ModalStyle.module.scss";
import Image from "next/image";

interface ModalProps {
  title: string;
  showSubmit?: boolean;
  children: React.ReactNode;
}

const FormInfoModal = ({ title, showSubmit, children }: ModalProps) => {
  const { toggleModal } = useModalStore();

  return (
    <ModalContainer modalKey={title} className={s["forminfo-modal"]} overlayClassName={s["forminfo-overlay"]}>
      <div className={s["title-wrap"]}>
        <h2 className={s.text}>{title}</h2>
        <button onClick={() => toggleModal(title)} className={s["btn-close"]}>
          <Image src="/icons/btn_cancel_black.svg" fill alt="close" />
        </button>
      </div>
      <div className={s.contents}>{children}</div>
      {showSubmit && (
        <div className={s["button-wrap"]}>
          <FormButton size="large" disabled={true}>
            작성하기
          </FormButton>
        </div>
      )}
    </ModalContainer>
  );
};

export default FormInfoModal;
