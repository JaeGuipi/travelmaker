import useModalStore from "@/app/store/useModalStore";
import React from "react";

export default function ConfirmModal({ text }) {
  const toggleModal = useModalStore((state) => state.toggleModal);
  return (
    <div>
      {text}
      <button onClick={() => toggleModal("ConfirmModal")}>확인</button>
    </div>
  );
}
