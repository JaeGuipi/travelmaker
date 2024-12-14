"use client";
import { useState, useEffect, useRef } from "react";
import { MyReservation } from "@/types/myReservationsTypes/myReservationsTypes";
import s from "./MyReservationList.module.scss";
import MyReservationItem from "../MyReservationItem/MyReservationItem";
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from "@/components/Dropdown/Dropdown";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import ConfirmModal from "@/components/Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";
import FormInfoModal from "@/components/Modal/ModalComponents/FormInfoModal";
import ItemTitleLayout from "@/app/(usercard)/my-reservation/ItemTitleLayout/ItemTitleLayout";
import NoList from "./NoList";
import ReviewContent from "./ReviewContent";

interface ModalState {
  key: string | null;
  reservation: MyReservation | null;
}

const MyReservationList = ({
  initialReservationList,
  cursorId,
}: {
  initialReservationList: MyReservation[];
  cursorId: number;
}) => {
  const [reservationList, setReservationList] = useState(initialReservationList);
  const [currentCursorId, setCurrentCursorId] = useState(cursorId);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("예약 상태");
  const [reservationStatus, setReservationStatus] = useState("");
  const [modalState, setModalState] = useState<ModalState>({
    key: null,
    reservation: null,
  });
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { toggleModal } = useModalStore();
  const confirmModal = "confirm";
  const reviewModal = "review";

  const handleOpenModal = (key: string, reservation: MyReservation) => {
    setModalState({ key, reservation });
    toggleModal(key);
  };

  const handleCloseModal = () => {
    setModalState({ key: null, reservation: null });
  };

  const handleReviewSuccess = (id: number) => {
    setReservationList((prev) =>
      prev.map((reservation) => (reservation.id === id ? { ...reservation, reviewSubmitted: true } : reservation)),
    );
  };

  const dropdownItems = [
    { key: "total", label: "전체 예약" },
    { key: "pending", label: "예약 완료" },
    { key: "canceled", label: "예약 취소" },
    { key: "confirmed", label: "예약 승인" },
    { key: "declined", label: "예약 거절" },
    { key: "completed", label: "체험 완료" },
  ];

  //서버액션으로 바꿔보기...
  const handleDeleteItem = async (id: number) => {
    try {
      const response = await fetch(`/api/my-reservations/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "canceled" }),
      });
      if (response.ok) {
        setReservationList((prev) =>
          prev.map((reservation) => (reservation.id === id ? { ...reservation, status: "canceled" } : reservation)),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const orderedList = async (status: string) => {
    if (isLoading) return;
    setIsLoading(true);
    
    if (status === "total") {
      setReservationList(initialReservationList)
      setCurrentCursorId(cursorId)
      setReservationStatus("")
      setIsLoading(false)
      return
    }
    setReservationStatus(status);
    try {
      const response = await fetch(`/api/my-reservations?size=6&status=${status}`);
      const { reservations: newReservations, cursorId: nextCursorId } = await response.json();
      setReservationList([...newReservations]);
      setCurrentCursorId(nextCursorId || null);
    } catch (error) {
      console.error(`${status}내역 리스트 불러오기 실패`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (reservationList.length === 0) return;

    const loadMoreList = async () => {
      if (isLoading || currentCursorId === null) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/my-reservations?size=6&cursorId=${currentCursorId}${
            reservationStatus ? `&status=${reservationStatus}` : ""
          }`,
        );
        const { reservations: newReservations, cursorId: nextCursorId } = await response.json();

        setReservationList((prev) => [...prev, ...newReservations]);
        setCurrentCursorId(nextCursorId || null);
      } catch (error) {
        console.error("예약내역 리스트 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading) loadMoreList();
    });
    const refValue = observerRef.current;

    if (refValue) observer.observe(refValue);

    return () => {
      if (refValue) observer.unobserve(refValue);
    };
  }, [isLoading, currentCursorId, reservationList, reservationStatus]);

  return (
    <div className={s["content-container"]}>
      <ItemTitleLayout title="예약 내역">
        <div className={s["dropdown-container"]}>
          <Dropdown>
            <DropdownToggle>{selectedStatus}</DropdownToggle>
            <DropdownMenu>
              {dropdownItems.map(({ key, label }) => (
                <DropdownItem
                  key={key}
                  onClick={() => {
                    orderedList(key);
                    setSelectedStatus(label);
                  }}
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </ItemTitleLayout>
      {reservationList.length === 0 ? (
        <NoList text="아직 등록한 체험이 없어요" />
      ) : (
        <>
          {reservationList.map((reservation) => (
            <MyReservationItem
              key={reservation?.id}
              reservation={reservation}
              onDelete={handleDeleteItem}
              onOpenModal={handleOpenModal}
            />
          ))}
          {currentCursorId !== null && <div ref={observerRef}>{isLoading && <LoadingSpinner />}</div>}
          {modalState.key === reviewModal && modalState.reservation && (
            <FormInfoModal modalKey={reviewModal} title="후기작성" showSubmit={false}>
              <ReviewContent
                reservation={modalState.reservation}
                onSuccess={() => {
                  handleReviewSuccess(modalState.reservation!.id);
                  handleCloseModal();
                }}
              />
            </FormInfoModal>
          )}
          {modalState.key === confirmModal && modalState.reservation && (
            <ConfirmModal
              modalKey={confirmModal}
              text="예약을 취소하시겠어요?"
              id={modalState.reservation.id}
              onClose={handleCloseModal}
              onCancel={handleDeleteItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyReservationList;
