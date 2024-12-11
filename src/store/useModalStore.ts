import { create } from "zustand";

interface ModalStore {
  modals: { [key: string]: boolean };
  toggleModal: (modalKey: string) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  toggleModal: (modalKey: string) =>
    set((state) => {
      const newModals = { ...state.modals };
      newModals[modalKey] = !newModals[modalKey];
      return { modals: newModals };
    }),
}));

export default useModalStore;
