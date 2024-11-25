import useModalStore from "@/app/store/useModalStore";
import React from "react";

export default function ConfirmModal({ text }) {
  const toggleModal = useModalStore((state) => state.toggleModal);
  return (
    <>
      <p>{text}</p>
      {/* 공통 버튼 컴포넌트 사용 예정*/}
      <button onClick={() => toggleModal("ConfirmModal")}>확인</button>
    </>
  );
}
