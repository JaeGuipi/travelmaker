import useModalStore from "@/app/store/useModalStore";
import React from "react";
import Modal from "react-modal";
import s from "./ModalContainer.module.scss";

Modal.setAppElement("#modal-root");

interface ModalContainerProps {
  modalKey: string;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const ModalContainer = ({ modalKey, children, className, overlayClassName }: ModalContainerProps) => {
  const { modals, toggleModal } = useModalStore();

  return (
    <Modal
      isOpen={modals[modalKey]}
      onRequestClose={() => toggleModal(modalKey)}
      overlayClassName={`${s.overlay} ${overlayClassName}`}
      className={`${s.content} ${className}`}
    >
      <div>{children}</div>
    </Modal>
  );
};

export default ModalContainer;
