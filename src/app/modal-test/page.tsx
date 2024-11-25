"use client";
import React from "react";
import useModalStore from "../store/useModalStore";
import ModalContainer from "@/components/Modal/ModalContainer";
import PopupModal from "@/components/Modal/modal-components/PopupModal";
import ConfirmModal from "@/components/Modal/modal-components/ConfirmModal";

const Page = () => {
  const { modals, toggleModal } = useModalStore();

  // 텍스트 변수로 관리
  const ModalText = "비밀번호가 일치하지 않습니다.";
  const ModalText2 = "가입이 완료되었습니다.";
  const ModalText3 = "이미 사용중인 이메일입니다.";
  const ModalText4 = "우와ㅏㅏ";

  return (
    <div>
      <button onClick={() => toggleModal(ModalText)}>팝업 버튼</button>
      {modals[ModalText] && (
        <ModalContainer modalKey={ModalText}>
          <PopupModal text={ModalText} />
        </ModalContainer>
      )}
      <br />

      <button onClick={() => toggleModal(ModalText2)}>팝업 버튼</button>
      {modals[ModalText2] && (
        <ModalContainer modalKey={ModalText2}>
          <PopupModal text={ModalText2} />
        </ModalContainer>
      )}
      <br />
      <button onClick={() => toggleModal(ModalText3)}>버튼</button>
      {modals[ModalText3] && (
        <ModalContainer modalKey={ModalText3}>
          <ConfirmModal text={ModalText3} />
        </ModalContainer>
      )}

      <button onClick={() => toggleModal(ModalText4)}>버튼</button>
      {modals[ModalText4] && (
        <ModalContainer modalKey={ModalText4}>
          <ConfirmModal text={ModalText4} />
        </ModalContainer>
      )}
    </div>
  );
};

export default Page;
