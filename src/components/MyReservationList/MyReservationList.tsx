"use client";
import { useState, useEffect, useRef } from "react";
import { MyReservation } from "@/types/types";
import classNames from "classnames/bind";
import s from "./MyReservationList.module.scss";
import MyReservationItem from "../MyReservationItem/MyReservationItem";
import Image from "next/image";
import Dropdown, { DropdownToggle, DropdownMenu, DropdownItem } from "../Dropdown/Dropdown";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import ConfirmModal from "../Modal/ModalComponents/ConfirmModal";
import useModalStore from "@/store/useModalStore";
import FormInfoModal from "../Modal/ModalComponents/FormInfoModal";

const cx = classNames.bind(s);

interface ModalState {
  key: string | null;
  reservation: MyReservation | null;
}

const MyReservationList = ({
  initialReservations,
  cursorId,
}: {
  initialReservations: MyReservation[];
  cursorId: number;
}) => {
  const [reservationList, setReservationList] = useState(initialReservations);
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

  console.log(modalState);
  const dropdownItems = [
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
      console.log("예약취소성공");
    } catch (error) {
      console.error(error);
    }
  };

  const orderedList = async (status: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setReservationStatus(status);
    try {
      const response = await fetch(`/api/my-reservations?size=6&status=${status}`);
      console.log("요청 URL:", response);
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

  if (reservationList.length === 0) {
    return (
      <div className={cx("no-list")}>
        <Image src="/images/no-list.png" width={110} height={149} alt="" />
        <p className={cx("no-list-notice")}>아직 등록한 체험이 없어요</p>
      </div>
    );
  }

  return (
    <>
      <div className={cx("dropdown-container")}>
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
      <div>
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
          <FormInfoModal modalKey={reviewModal} title="후기 작성" reservation={modalState.reservation} />
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
      </div>
    </>
  );
};

export default MyReservationList;
