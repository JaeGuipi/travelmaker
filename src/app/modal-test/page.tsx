"use client";
import React from "react";
import useModalStore from "../store/useModalStore";
import PopupModal from "@/components/Modal/modal-components/PopupModal";
import ConfirmModal from "@/components/Modal/modal-components/ConfirmModal";
import SubmitModal from "@/components/Modal/modal-components/SubmitModal";

const Page = () => {
  const { modals, toggleModal } = useModalStore();

  // 텍스트 변수로 관리
  const ModalText = "비밀번호가 일치하지 않습니다.";
  const ModalText1 = "예약을 취소하시겠어요?";
  const ModalTitle = "날짜";

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
      {modals[ModalTitle] && <SubmitModal title={ModalTitle} />}
    </div>
  );
};

export default Page;
