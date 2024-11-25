import useModalStore, { ModalType } from "@/app/store/useModalStore";
import React from "react";
import Modal from "react-modal";
import s from "./ModalContainer.module.scss";

Modal.setAppElement("#modal-root");

const ModalContainer = ({ modalType, children }: { modalType: keyof typeof ModalType; children: React.ReactNode }) => {
  const { modals, toggleModal } = useModalStore();

  return (
    <Modal
      isOpen={modals[modalType]}
      onRequestClose={() => toggleModal(modalType)}
      overlayClassName={s.overlay}
      className={s.content}
    >
      <div className={`${s["content-box"]}`}>{children}</div>
    </Modal>
  );
};

export default ModalContainer;
