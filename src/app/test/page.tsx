'use client'

import FormInfoModal from "@/components/Modal/ModalComponents/FormInfoModal";
import useModalStore from "@/store/useModalStore";

const Page = () => {
  const { toggleModal } = useModalStore();
  return (
    <>
      <button onClick={() => toggleModal("후기작성")}>모달 열자!</button>
      <FormInfoModal title="후기작성" />
    </>
  );
};

export default Page