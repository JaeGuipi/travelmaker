import useModalStore from "@/app/store/useModalStore";
import React from "react";
import Modal from "react-modal";
import s from "./ModalContainer.module.scss";

Modal.setAppElement("#modal-root");

interface ModalContainerProps {
  modalKey: string;
  children: React.ReactNode;
}

const ModalContainer = ({ modalKey, children }: ModalContainerProps) => {
  const { modals, toggleModal } = useModalStore();

  return (
    <Modal
      isOpen={modals[modalKey]}
      onRequestClose={() => toggleModal(modalKey)}
      overlayClassName={s.overlay}
      className={s.content}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
