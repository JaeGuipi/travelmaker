import { create } from "zustand";

interface ModalStore {
  modals: { [key: string]: boolean }; // 고유한 텍스트(또는 타이틀)로 관리
  toggleModal: (modalKey: string) => void; // 텍스트 또는 타이틀로 모달을 토글
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  toggleModal: (modalKey) =>
    set((state) => {
      const newModals = { ...state.modals };
      newModals[modalKey] = !newModals[modalKey];
      return { modals: newModals };
    }),
}));

export default useModalStore;
