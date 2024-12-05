import { create } from "zustand";

interface ModalStore {
  modals: { [key: string]: boolean };
  toggleModal: (modalKey: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  toggleModal: (modalKey) =>
    set((state) => ({
      modals: { ...state.modals, [modalKey]: !state.modals[modalKey] },
    })),
}));

export default useModalStore;
