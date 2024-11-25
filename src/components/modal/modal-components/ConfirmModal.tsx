import useModalStore from "@/app/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import s from "./ModalStyle.module.scss";

interface PopupModalProps {
  text: string;
}

export default function ConfirmModal({ text }: PopupModalProps) {
  const { toggleModal } = useModalStore();
  return (
    <>
      <p className={s.text}>{text}</p>
      <div className={s["button-wrap"]}>
        <FormButton size="medium" onClick={() => toggleModal(text)}>
          확인
        </FormButton>
      </div>
    </>
  );
}
