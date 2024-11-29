import useModalStore from "@/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import s from "./ModalStyle.module.scss";
import ModalContainer from "../ModalContainer";
import Image from "next/image";
import classNames from "classnames/bind";

const cx = classNames.bind(s);

interface ModalProps {
  text: string;
}

const ConfirmModal = ({ text }: ModalProps) => {
  const { toggleModal } = useModalStore();

  return (
    <>
      <ModalContainer modalKey={text} className={s["confirm-modal"]}>
        <span className={s.icon}>
          <Image src="/icons/btn_check.svg" fill alt={text} />
        </span>
        <p className={s.text}>{text}</p>
        <div className={cx("button-wrap", "flex")}>
          <FormButton size="small" variant="emptyButton" onClick={() => toggleModal(text)}>
            아니오
          </FormButton>
          <FormButton size="small">취소하기</FormButton>
        </div>
      </ModalContainer>
    </>
  );
};

export default ConfirmModal;
