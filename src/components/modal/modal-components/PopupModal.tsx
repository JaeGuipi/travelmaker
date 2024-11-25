import useModalStore from "@/app/store/useModalStore";
import FormButton from "@/components/Button/FormButton";
import React from "react";

export default function PopupModal({ text }) {
  const { toggleModal } = useModalStore();
  return (
    <>
      <p>{text}</p>
      {/* 공통 버튼 컴포넌트 사용 예정*/}
      <FormButton size="medium" onClick={() => toggleModal("PopupModal")}>
        확인
      </FormButton>
    </>
  );
}
