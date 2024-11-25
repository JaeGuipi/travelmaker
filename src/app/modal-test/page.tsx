"use client";
import React from "react";
import useModalStore from "../store/useModalStore";
import PopupModal from "@/components/Modal/modal-components/PopupModal";
import ConfirmModal from "@/components/Modal/modal-components/ConfirmModal";
import FormInfoModal from "@/components/Modal/modal-components/FormInfoModal";

const Page = () => {
  const { modals, toggleModal } = useModalStore();

  // 텍스트 변수로 관리
  const ModalText = "비밀번호가 일치하지 않습니다.";
  const ModalText1 = "예약을 취소하시겠어요?";
  const ModalTitle = "날짜";
  const ModalTitle1 = "예약 정보";

  return (
    <div>
      <button onClick={() => toggleModal(ModalText)}>팝업 모달</button>
      {modals[ModalText] && <PopupModal text={ModalText} />}
      <br />
      <br />
      <button onClick={() => toggleModal(ModalText1)}>취소/확인 모달</button>
      {modals[ModalText1] && <ConfirmModal text={ModalText1} />}
      <br />
      <br />
      <button onClick={() => toggleModal(ModalTitle)}>폼 제출 모달</button>
      {modals[ModalTitle] && <FormInfoModal title={ModalTitle} showSubmit={true} />}
      <br />
      <br />
      <button onClick={() => toggleModal(ModalTitle1)}>정보 모달</button>
      {modals[ModalTitle1] && <FormInfoModal title={ModalTitle1} showSubmit={false} />}
    </div>
  );
};

export default Page;
