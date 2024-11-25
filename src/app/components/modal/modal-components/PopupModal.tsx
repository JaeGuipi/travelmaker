import useModalStore from "@/app/store/useModalStore";
import React from "react";

export default function PopupModal({ text }) {
  const { toggleModal } = useModalStore();
  return (
    <>
      <p>{text}</p>
      {/* 공통 버튼 컴포넌트 사용 예정*/}
      <button onClick={() => toggleModal("PopupModal")}>확인</button>
    </>
  );
}
