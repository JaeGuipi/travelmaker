"use client";
import React from "react";
import useModalStore from "../store/useModalStore";
import ModalContainer from "@/components/modal/ModalContainer";
import PopupModal from "@/components/modal/modal-components/PopupModal";
import ConfirmModal from "@/components/modal/modal-components/ConfirmModal";

const Page = () => {
  const { modals, toggleModal } = useModalStore();

  return (
    <div>
      <button onClick={() => toggleModal("PopupModal")}>버튼</button>
      {modals.PopupModal && (
        <ModalContainer modalType="PopupModal">
          <PopupModal text="비밀번호가 일치하지 않습니다." />
        </ModalContainer>
      )}

      <button onClick={() => toggleModal("ConfirmModal")}>버튼</button>
      {modals.ConfirmModal && (
        <ModalContainer modalType="ConfirmModal">
          <ConfirmModal text="이미 사용중인 이메일입니다." />
        </ModalContainer>
      )}
    </div>
  );
};

export default Page;
