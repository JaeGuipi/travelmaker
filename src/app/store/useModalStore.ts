import { create } from "zustand";

export const ModalType = {
  PopupModal: "PopupModal",
  ConfirmModal: "ConfirmModal",
} as const;

export type ModalKey = keyof typeof ModalType;

interface ModalStore {
  modals: Record<ModalKey, boolean>;
  toggleModal: (modalType: ModalKey) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {
    PopupModal: false,
    ConfirmModal: false,
  },
  toggleModal: (modalType) =>
    set((state) => ({
      modals: { ...state.modals, [modalType]: !state.modals[modalType] },
    })),
}));

export default useModalStore;
